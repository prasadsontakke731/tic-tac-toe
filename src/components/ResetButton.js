import React from 'react';

import "./ResetButton.css";

export const ResetButton = ({ resetBoard, resetResult }) => {
    return (
        <>
            <button className="reset-board-btn" onClick={resetBoard}>Reset Board</button>
            <button className="reset-result-btn" onClick={resetResult}>Reset Result</button>
        </>
    )
}