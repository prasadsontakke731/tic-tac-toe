import React from 'react'

import "./ScoreBoard.css"

function ScoreBoard({ xPlaying }) {

    let scoreX = JSON.parse(localStorage.getItem("XWin"))
    let scoreO = JSON.parse(localStorage.getItem("OWin"))


    return (
        <div className="scoreboard">
            <span className={`score x-score ${!xPlaying && "inactive"}`}>X - {scoreX}</span>
            <span className={`score o-score ${xPlaying && "inactive"}`}>O - {scoreO}</span>
        </div>
    )
}
export default ScoreBoard