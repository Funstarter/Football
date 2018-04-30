import React from 'react';
import AddGameControl from './AddGameControl/AddGameControl';

const AddGame = (props) => (
    <div className="row">
        <div className="col-sm-6">
            <AddGameControl label="Home team"
                            side="homeTeam"
                            teams={props.teams}
                            onSelectNewTeam={props.onSelectNewTeam}
            />
        </div>
        <div className="col-sm-6">
            <AddGameControl label="Away team"
                            side="awayTeam"
                            teams={props.teams}
                            onSelectNewTeam={props.onSelectNewTeam}
            />
        </div>
        <div className="col-sm-12 mt-3">
            <button className="btn btn-primary" type="submit" onClick={props.onAddGame}>
                Submit
            </button>
        </div>
    </div>
);

export default AddGame;