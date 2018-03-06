import React from 'react'
import SessionTestAPI from "../SessionTestData";
import { Link } from 'react-router-dom'

class SessionList extends React.Component {

    render(){
        return(

            <ul>
                {
                    SessionTestAPI.all().map(p => (
                        <li key={p.Id}>
                            <Link to={`/session/${p.Id}`}>{p.Name}</Link>
                        </li>
                    ))
                }
            </ul>


        )
    }
}

export default SessionList;