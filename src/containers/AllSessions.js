import React from 'react'
import SessionList from "../components/AllSessionsList";
import HelpButton from "../components/HelpButton";
import {Link} from "react-router-dom";


class AllSessions extends React.Component {

    render(){

        return(
            <div className="rounded-container">
                <div className="container fade-in">
                    <h1 className="margin24px roboto-black ">Velg en økt</h1>
                </div>
                <SessionList/>
                <div className="fixed-footer-menu flex-container-align-start">

                    <Link to={"/"}>
                        <div className="arrow-back-btn ">
                            <i className="material-icons md-36">keyboard_arrow_left</i>
                        </div>
                    </Link>

                </div>
                <HelpButton toUrl={'/manual/open/1'} fromUrl={this.props.location.pathname}/>

            </div>



        )
    }
}

export default AllSessions;