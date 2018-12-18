import React from 'react'

const Dice = ({value}) => {
    return (
        <React.Fragment>
            <img src={require(`../icons/${value}.svg`)} alt="dice face"/>
        </React.Fragment>
    );
}

export default Dice;