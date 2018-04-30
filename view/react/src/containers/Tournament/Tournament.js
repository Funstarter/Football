import React, {Component} from 'react';
import MatchCenter from '../../components/MatchCenter/MatchCenter';
import GameBoard from '../../components/GameBoard/GameBoard';

class Tournament extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [
                {
                    id: 1,
                    homeTeamId: 3,
                    awayTeamId: 1,
                    result: []
                },
                {
                    id: 2,
                    homeTeamId: 5,
                    awayTeamId: 14,
                    result: [1, 1]
                }
            ],
            teams: [
                {
                    id: 3,
                    name: 'Arsenal',
                    level: 60,
                    stats: {
                        wins: 14
                    }
                },
                {
                    id: 5,
                    name: 'MC',
                    level: 90,
                    stats: {
                        wins: 24
                    }
                },
                {
                    id: 1,
                    name: 'Chelsea',
                    level: 75,
                    stats: {
                        wins: 6
                    }
                },
                {
                    id: 14,
                    name: 'MU',
                    level: 80,
                    stats: {
                        wins: 16
                    }
                }
            ]
        }
    }

    getGames() {
        return this.state.games.map(game => Object.assign({}, game,
            {
                homeTeam: this.getTeam(game.homeTeamId),
                awayTeam: this.getTeam(game.awayTeamId)
            }
        ));
    }

    getTeam(teamId) {
        return this.state.teams.find(team => team.id === teamId);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <MatchCenter games={this.getGames()}/>
                    </div>
                    <div className="col-sm-6">
                        <GameBoard/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tournament;