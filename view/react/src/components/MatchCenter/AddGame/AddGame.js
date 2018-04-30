import React, {Component} from 'react';

class AddGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homeTeam: 0,
            awayTeam: 0
        };
        this.selectHomeTeam = this.selectHomeTeam.bind(this);
        this.selectAwayTeam = this.selectAwayTeam.bind(this);
    }

    selectHomeTeam(e) {
        this.setState({homeTeam: Number(e.target.value)});
    }

    selectAwayTeam(e) {
        this.setState({awayTeam: Number(e.target.value)});
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-6">
                    <label htmlFor="home-team-select">Home team</label>
                    <select className="form-control" id="home-team-select" onChange={this.selectHomeTeam}>
                        <option value="0">Home team</option>
                        {this.props.teams.map(team => (<option value={team.id} key={team.id}>{team.name}</option>))}
                    </select>
                </div>
                <div className="col-sm-6">
                    <label htmlFor="away-team-select">Away team</label>
                    <select className="form-control" id="away-team-select" onChange={this.selectAwayTeam}>
                        <option value="0">Away team</option>
                        {this.props.teams.map(team => (<option value={team.id} key={team.id}>{team.name}</option>))}
                    </select>
                </div>
                <div className="col-sm-12 mt-3">
                    <button className="btn btn-primary" type="submit"
                            onClick={() => this.props.addGameHandler(this.state.homeTeam, this.state.awayTeam)}
                    >
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}

export default AddGame;