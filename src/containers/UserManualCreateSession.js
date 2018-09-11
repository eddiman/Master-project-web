import React from 'react'
import IpadDeviceFrame from "../components/IpadDeviceFrame";
import {Link} from "react-router-dom";
import ManualCreateSession from "../components/ManualCreateSession";

class UserManualCreateSession extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            maxPages : 6,
            urlStub : "create/",
            fromUrl : "",
            redirectExists : false
        };
    }

    componentDidMount(){
        console.log(this.props.match.params.Redirect)
        console.log(this.props.match.params.SubRedirect)
        this.checkIfRedirectExists();

    }

    checkIfRedirectExists() {
        const redirect = this.props.match.params.Redirect;
        const subRedirect = this.props.match.params.SubRedirect;
        let fromUrl = "";

        if(String(redirect) !== 'undefined') {
            fromUrl = "/" + fromUrl + redirect;
            if(String(subRedirect) !== 'undefined') {
                fromUrl = fromUrl + "/" + subRedirect;
            }
            this.setState({
                fromUrl : fromUrl,
                redirectExists : true
            })

        }

    }

    generateForwardLink(){
        let currentPage = parseInt(this.props.match.params.Id, 10);
        if(currentPage === this.state.maxPages && this.state.redirectExists) {
            return (this.state.fromUrl);
        } else if(currentPage === this.state.maxPages && !this.state.redirectExists) {
            return ("/manual");

        }

        else {
            return ('/manual/' + this.state.urlStub + (currentPage +1))

        }
    }

    generateLastLink(){
        let currentPage = parseInt(this.props.match.params.Id, 10);

        if(currentPage === 1 && this.state.redirectExists) {
            return (this.state.fromUrl);
        } else if(currentPage === 1 && !this.state.redirectExists) {
            return ("/manual");

        } else {
            return ('/manual/' + this.state.urlStub + (currentPage - 1))

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
                <div className="manual-fab-button flex-align-self-end margin24px">
                    <i className="material-icons">{this.defineIcon()}</i>
                </div>
            </Link>
        );

        const LinkBtnBack = () => (
            <Link to={this.generateLastLink()}>
                <div className="manual-fab-button flex-align-self-end margin24px">
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
                <div className= "manual-element">
                    <ManualCreateSession id ={parseInt(this.props.match.params.Id, 10)}/>
                </div>




                <div className="rounded-container bg-color-accent-dark bottom-fixed min-height-50px">
                    <div className="container flex-container-center" >
                        <LinkBtnBack/>
                        <CurrentPageDots/>
                        <LinkBtnForward/>

                    </div>

                </div>
            </div>


        )
    }

}


export default UserManualCreateSession;