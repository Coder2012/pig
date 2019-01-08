import React from "react";
import { ReactComponent as One } from "../icons/1.svg";
import { ReactComponent as Two } from "../icons/2.svg";
import { ReactComponent as Three } from "../icons/3.svg";
import { ReactComponent as Four } from "../icons/4.svg";
import { ReactComponent as Five } from "../icons/5.svg";
import { ReactComponent as Six } from "../icons/6.svg";

class Dice extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <React.Fragment>
        {this.props.value === 1 && <One className="warning" />}
        {this.props.value === 2 && <Two />}
        {this.props.value === 3 && <Three />}
        {this.props.value === 4 && <Four />}
        {this.props.value === 5 && <Five />}
        {this.props.value === 6 && <Six />}
      </React.Fragment>
    );
  }
}

export default Dice;
