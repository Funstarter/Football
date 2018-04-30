import React from 'react';
import Placeholder from '../../../../hoc/Placeholder/Placeholder';

const AddGameControl = (props) => {
    return (
        <Placeholder>
            <label htmlFor="home-team-select">{props.label}</label>
            <select className="form-control" id="home-team-select" onChange={(e) => props.onSelectNewTeam(e, props.side)}>
                <option value="0">{props.label}</option>
                {props.teams.map(team => (<option value={team.id} key={team.id}>{team.name}</option>))}
            </select>
        </Placeholder>
    );
};

export default AddGameControl;