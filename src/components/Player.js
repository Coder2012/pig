import React from 'react'

const Player = ({ id, name, score, active }) => {
    return (
        <section className={active ? 'player active' : 'player'}>
            <h2>{ name }: <span className={`player-${id}`}>{ score }</span></h2>
        </section>
    )
}

export default Player