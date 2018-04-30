import React from 'react';

const Game = (props) => (
    <div className="d-flex align-items-center">
        <div className="mr-3">#{props.id}</div>
        <div className="mr-3 d-flex">
            <span>{props.homeTeam.name}</span>
            <span className="mr-1 ml-1">&ndash;</span>
            <span>{props.awayTeam.name}</span>
        </div>
        <div className="mr-3">
            <button className="btn btn-success btn-sm" type="button">
                Play
            </button>
        </div>
        <div data-game-result>{props.result.join(':')}</div>
    </div>
);

export default Game;