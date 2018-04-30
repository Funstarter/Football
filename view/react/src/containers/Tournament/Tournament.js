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
            ],
            newGame: {
                homeTeam: 0,
                awayTeam: 0
            }
        };
        this.onSelectNewHomeTeam = this.onSelectNewHomeTeam.bind(this);
        this.onSelectNewAwayTeam = this.onSelectNewAwayTeam.bind(this);
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

    onAddGame(homeTeamId, awayTeamId) {

        //TODO Add Error handling in modal Alert

        /* Require home and away team selected */
        if (!this.getTeam(homeTeamId) || !this.getTeam(awayTeamId)) {
            console.log('Home and away team are required');
            return;
        }

        /* Exit if home and away team are same */
        if (homeTeamId === awayTeamId) {
            console.log('Home and away team are same');
            return;
        }

        /* Exit if game with same home and away teams already exist */
        const notUnique = this.state.games.some(function (game) {
            return (game.homeTeamId === homeTeamId) && (game.awayTeamId === awayTeamId);
        });
        if (notUnique) {
            console.log('Same home and away teams already exist');
            return;
        }

        const games = [...this.state.games];
        games.push({
            id: games.length + 1,
            homeTeamId: homeTeamId,
            awayTeamId: awayTeamId,
            result: []
        });
        this.setState({games: games});
        return true;
    }

    onSelectNewHomeTeam(e) {
        const newGame = Object.assign({}, this.state.newGame);
        newGame.homeTeam = Number(e.target.value);
        this.setState({newGame: newGame});
    }

    onSelectNewAwayTeam(e) {
        const newGame = Object.assign({}, this.state.newGame);
        newGame.awayTeam = Number(e.target.value);
        this.setState({newGame: newGame});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <MatchCenter games={this.getGames()} teams={this.state.teams}
                                     onAddGame={() => this.onAddGame(this.state.newGame.homeTeam, this.state.newGame.awayTeam)}
                                     onSelectNewHomeTeam={this.onSelectNewHomeTeam}
                                     onSelectNewAwayTeam={this.onSelectNewAwayTeam}
                        />
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