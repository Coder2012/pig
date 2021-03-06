import React, { Component } from "react";
import { cloneDeep } from "lodash";
import "./styles/App.css";
import Dice from "./components/Dice";
import Player from "./components/Player";

class App extends Component {
  constructor() {
    super();

    this.initialState = {
      dice: [6, 6],
      players: [
        { id: 0, name: "Player One", score: 0 },
        { id: 1, name: "Player Two", score: 0 }
      ],
      turn: 0,
      currentScore: 0,
      gameOver: false,
      hideUI: false
    };

    this.state = this.initialState;

    this.rollButtonHandler = this.rollButtonHandler.bind(this);
    this.passButtonHandler = this.passButtonHandler.bind(this);
    this.resetButtonHandler = this.resetButtonHandler.bind(this);
  }

  getInitialState() {
    return cloneDeep(this.initialState);
  }

  resetButtonHandler() {
    this.setState(this.getInitialState());
  }

  rollButtonHandler(event) {
    this.setState(
      prevState => ({
        dice: this.getDiceValues()
      }),
      () => {
        this.updateScores();
      }
    );
  }

  passButtonHandler(event) {
    this.updatePlayerScore(this.state.turn, this.state.currentScore)
  }

  async updateScores() {
    // console.log('now update the scores for player', this.state.players[this.state.turn].name)
    switch (true) {
      case this.hasThrownMultipleOnes(): {
        // console.log('has thrown both ones', this.hasThrownMultipleOnes())
        this.resetCurrentScore();
        await this.disableUI();
        this.resetPlayerScore(this.state.turn, 0);
        break;
      }

      case this.hasThrownOne(): {
        // console.log('has thrown a one', this.hasThrownOne())
        this.resetCurrentScore();
        await this.disableUI();
        this.changePlayers();
        break;
      }

      default: {
        // console.log('keep adding up for player', this.state.players[this.state.turn].name)
        this.updateCurrentScore(this.state.dice.reduce((a, b) => a + b, 0));
      }
    }
  }

  resetCurrentScore() {
    this.setState({ currentScore: 0 });
  }

  disableUI() {
    return new Promise(resolve => {
      this.setState(
        prevState => {
          return { hideUI: true };
        },
        () => {
          setTimeout(() => {
            this.setState({ hideUI: false });
            resolve("resolve");
          }, 1000);
        }
      );
    });
  }

  updateCurrentScore(value) {
    this.setState(prevState => {
      return { currentScore: prevState.currentScore + value };
    });
  }

  hasThrownOne() {
    return this.state.dice.some(die => die === 1);
  }

  hasThrownMultipleOnes() {
    return this.state.dice.every(die => die === 1);
  }

  resetPlayerScore(index) {
    const players = [...this.state.players];
    players[index] = { ...players[index], score: 0 };

    this.setState(
      {
        players
      },
      () => {
        this.changePlayers();
      }
    );
  }

  updatePlayerScore(index, value) {
    const players = [...this.state.players];
    players[index] = { ...players[index], score: players[index].score + value };

    this.setState(
      {
        players,
        currentScore: 0
      },
      () => {
        if (players[index].score >= 100) {
          this.setState({ gameOver: true });
        } else {
          this.changePlayers();
        }
      }
    );
  }

  changePlayers() {
    this.setState(
      prevState => {
        return { turn: prevState.turn === 0 ? 1 : 0 };
      },
      () => {
        // console.log(this.state.turn)
      }
    );
  }

  getDiceValues() {
    return this.state.dice.map(die => Math.round(Math.random() * 5) + 1);
  }

  render() {
    return (
      <div className="App">
        <header>
          <div className="players">
            {this.state.players.map(player => (
              <Player
                key={player.id}
                id={player.id}
                name={player.name}
                score={player.score}
                active={this.state.turn === player.id}
              />
            ))}
          </div>
          <h3 className="score">SCORE - {this.state.currentScore}</h3>
        </header>
        <section>
          {!this.state.gameOver && !this.state.hideUI && (
            <section className="panel">
              <button
                data-test="test-roll-button"
                className="button"
                type="button"
                onClick={this.rollButtonHandler}
              >
                Roll
              </button>
              <button
                data-test="test-pass-button"
                className="button"
                type="button"
                onClick={this.passButtonHandler}
              >
                Pass
              </button>
            </section>
          )}
          {!this.state.gameOver && this.state.hideUI && (
            <section className="panel">
              <p className="status">
                UNLUCKY {this.state.players[this.state.turn].name}
              </p>
            </section>
          )}
          {this.state.gameOver && (
            <section>
              <p className="status">
                The winner is {this.state.players[this.state.turn].name}
              </p>
              <button
                data-test="test-reset-button"
                className="button"
                type="button"
                onClick={this.resetButtonHandler}
              >
                START GAME
              </button>
            </section>
          )}
          <section className="dice">
            {this.state.dice.map((die, i) => (
              <Dice value={die} key={i} />
            ))}
          </section>
        </section>
      </div>
    );
  }
}

export default App;
