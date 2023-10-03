import React from 'react';

import "./ResetButton.css";

function ResetButton({ resetBoard, resetResult }) {
    return (
        <>
            <button className="reset-board-btn" onClick={resetBoard}>Reset Board</button>
            <button className="reset-result-btn" onClick={resetResult}>Reset Result</button>
        </>
    )
}
export default ResetButton;