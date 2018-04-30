import React from 'react';
import Game from './Game/Game';

const Games = (props) => {
    return (
        <ul className="list-group list-group-flush">
            {props.games.map(game => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={game.id}>
                    <Game id={game.id}
                          homeTeam={game.homeTeam}
                          awayTeam={game.awayTeam}
                          result={game.result}
                    />
                    <button className="btn btn-sm btn-danger" type="button">X</button>
                </li>
            ))}
        </ul>
    );
};

export default Games;