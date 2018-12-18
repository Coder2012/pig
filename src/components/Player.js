import React from 'react'

const Player = ({ name, score, active }) => {
    return (
        <section className={active ? 'player active' : 'player'}>
            <h2>{ name }: <span>{ score }</span></h2>
        </section>
    )
}

export default Player