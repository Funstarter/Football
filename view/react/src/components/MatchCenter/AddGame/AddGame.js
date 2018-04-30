import React from 'react';

const AddGame = (props) => {
    return (
        <div className="row">
            <div className="col-sm-6">
                <label htmlFor="home-team-select">Home team</label>
                <select className="form-control" id="home-team-select">
                    <option value="0">Home team</option>
                </select>
            </div>
            <div className="col-sm-6">
                <label htmlFor="away-team-select">Away team</label>
                <select className="form-control" id="away-team-select">
                    <option value="0">Away team</option>
                </select>
            </div>
            <div className="col-sm-12 mt-3">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </div>
    );
};

export default AddGame;