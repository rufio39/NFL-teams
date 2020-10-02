import React, { useState } from 'react' 
import { Card } from 'react-bootstrap';
import UpdateTeam from './UpdateTeam';

const API_URL = process.env.REACT_APP_API_URL;

const Team = ({ team, refresh }) => {
    const [open, setOpen] = useState(false)

    const deleteTeam = () => {
        fetch(`${API_URL}/teams/${team._id}`, {
            method: "DELETE"
        }).then(refresh)
    }
    const toggleOpen = () => setOpen(!open);
    const displayUpdate = open ?
        <fieldset>
            <UpdateTeam team={team} refresh={refresh} close={toggleOpen} />
        </fieldset> :
        '';
    return (
        <div>
            <Card style={{ width: '10rem' }}>
            <Card.Img variant="top" src="https://rb.gy/ofwvfw" />
            <span className="team-name">
                {team.name}

            </span>
            <button className="edit" onClick={toggleOpen}>edit</button>
            <button className="del-btn" onClick={deleteTeam}>Delete</button>          
            </Card>
            <div className="update">
            {displayUpdate}
            </div>
        </div>
    )
}
export default Team