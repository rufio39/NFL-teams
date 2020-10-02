import React from 'react';

const API_URL = process.env.REACT_APP_API_URL;

class CreateTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            wins: 0,
            loses: 0
        }
    }

    handleChange = ({ target }) => {
        console.log(target.value);
        let value = target.type === 'checkbox' ? target.checked : target.value;
        value = target.type === 'number' ? parseInt(value) : value;
        this.setState({ [target.name]: value });
    }    
    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${API_URL}/teams`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        }).then(this.props.refresh)
            .then(() => this.setState({
                name: "",
                wins:0,
                loses:0
            }))
        }

    render() {
        return (
            <div>
                <form id="create" onSubmit={this.handleSubmit} className="createTeam">
                    ADD TEAM TO LIST
                    <div>
                        <input name="name"
                            type="text"
                            placeholder="enter team name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="wins">wins:</label>
                        <input name="wins"
                            type="number"
                            placeholder="Number of wins"
                            value={this.state.wins}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="loses">loses:</label>
                        <input name="loses"
                            type="number"
                            placeholder="Number of loses"
                            value={this.state.loses}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button>Add Team</button>
                </form>
            </div>
        );
    }
}

export default CreateTeam;