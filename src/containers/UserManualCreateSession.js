import React from 'react'
import IpadDeviceFrame from "../components/IpadDeviceFrame";
import {Link} from "react-router-dom";
import ManualCreateSession from "../components/ManualCreateSession";

class UserManualCreateSession extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            maxPages : 3
        }
    }



    generateForwardLink(){
        let currentPage = parseInt(this.props.match.params.Id, 10);
        if(currentPage === this.state.maxPages) {
            return ("/manual")
        } else {
            return ('/manual/web/create/' + (currentPage +1))

        }
    }

    generateLastLink(){
        let currentPage = parseInt(this.props.match.params.Id, 10);

        if(currentPage === 1) {
            return ("/manual")
        } else {
            return ('/manual/web/create/' + (currentPage - 1))

        }


    }

    defineIcon() {
        let currentPage = parseInt(this.props.match.params.Id, 10);
        if(currentPage === this.state.maxPages) {
            return ("close")
        } else {
            return ("keyboard_arrow_right")

        }}

    generateDots() {
        let dots = [];
        const grayDot = <div className="gray-dot"/>;
        const whiteDot = <div className="white-dot"/>;

        const currentPage = (parseInt(this.props.match.params.Id, 10) -1);
        for (let i = 0; i < (this.state.maxPages); i++) {

            if(i === currentPage) {
                dots.push(whiteDot)
            } else {
                dots.push(grayDot)

            }
        }
               return dots;
    }

    render(){

        const LinkBtnForward = () => (
            <Link to={this.generateForwardLink()}>
                <div className="manual-button flex-align-self-end margin24px">
                    <i className="material-icons">{this.defineIcon()}</i>
                </div>
            </Link>
        );

        const LinkBtnBack = () => (
            <Link to={this.generateLastLink()}>
                <div className="manual-button flex-align-self-end margin24px">
                    <i className="material-icons">keyboard_arrow_left</i>
                </div>
            </Link>
        );

        const CurrentPageDots = () => (
            <div className="container flex-container-center flex-2" >
                {this.generateDots()}


            </div>
        );


        return(


            <div className="container min-height-maxview flex-container-column-direction">
                <div className="container fade-in">
                    <h1 className="margin24px roboto-black ">Opprettelse av en session</h1>
                </div>
                <div>
                    <ManualCreateSession id ={parseInt(this.props.match.params.Id, 10)}/>
                </div>

                <div className="container flex-container-center" >
                    <LinkBtnBack/>
                    <CurrentPageDots/>
                    <LinkBtnForward/>

                </div>


                <div className="rounded-container bg-color-accent-dark rounded-container-position-correction-25px min-height-50px">

                </div>
            </div>


        )
    }

}


export default UserManualCreateSession;