import React from 'react';
import Card from '../UI/Card/Card';
import Games from './Games/Games';
import AddGame from './AddGame/AddGame';

const MatchCenter = (props) => (
    <Card title="Match Center">
        <Games games={props.games}/>
        <div className="card-body">
            <AddGame teams={props.teams}
                     onAddGame={props.onAddGame}
                     onSelectNewTeam={props.onSelectNewTeam}
            />
        </div>
    </Card>
);

export default MatchCenter;