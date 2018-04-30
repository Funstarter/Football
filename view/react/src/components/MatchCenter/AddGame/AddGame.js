import React from 'react';

const AddGame = (props) => {
    return (
        <div className="row">
            <div className="col-sm-6">
                <label htmlFor="home-team-select">Home team</label>
                <select className="form-control" id="home-team-select" onChange={props.onSelectNewHomeTeam}>
                    <option value="0">Home team</option>
                    {props.teams.map(team => (<option value={team.id} key={team.id}>{team.name}</option>))}
                </select>
            </div>
            <div className="col-sm-6">
                <label htmlFor="away-team-select">Away team</label>
                <select className="form-control" id="away-team-select" onChange={props.onSelectNewAwayTeam}>
                    <option value="0">Away team</option>
                    {props.teams.map(team => (<option value={team.id} key={team.id}>{team.name}</option>))}
                </select>
            </div>
            <div className="col-sm-12 mt-3">
                <button className="btn btn-primary" type="submit"
                        onClick={props.onAddGame}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default AddGame;