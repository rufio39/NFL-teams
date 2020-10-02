import React, { Component } from 'react';
import CreateTeam from './CreateTeam';
import Team from './team';
import Layout from '../config/Layout'
const API_URL = process.env.REACT_APP_API_URL;


class teams extends Component {
    state = { teams: [] }

    getTeams = () => {

        fetch(`${API_URL}/teams`)
            .then(response => response.json())
            .then(teams => this.setState({ teams }))
    }
    componentDidMount() {
        this.getTeams();
    }
    render() {
        const displayTeams = this.state.teams.map(team =>
            <Team key={team._id} team={team} refresh={this.getTeams} />
        )
        return (
            <div>
            <Layout>
                <h1>NFL Teams</h1>
                <CreateTeam />
                <div className="cards">
                    {displayTeams}
                </div>
            </Layout>
            </div>
        );
    }
}

export default teams;