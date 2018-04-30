import React, {Component} from 'react';
import Card from '../UI/Card/Card';
import Games from './Games/Games';
import AddGame from './AddGame/AddGame';

class MatchCenter extends Component {
    render() {
        return (
            <Card title="Match Center">
                <Games games={this.props.games} />
                <div className="card-body">
                    <AddGame teams={this.props.teams}
                             onAddGame={this.props.onAddGame}
                             onSelectNewHomeTeam={this.props.onSelectNewHomeTeam}
                             onSelectNewAwayTeam={this.props.onSelectNewAwayTeam}
                    />
                </div>
            </Card>
        );
    }
}

export default MatchCenter;