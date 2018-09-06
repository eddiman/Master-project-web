import React from 'react'
import { Link } from 'react-router-dom'
import ManualCreateSession from "./ManualCreateSession";
import Header from "./Header";


class UserManualCreateSessionComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            maxPages : 3,
            urlStub : "create/",
            fromUrl : "",
            redirectExists : false,
            currentPage : 1,
            isManualShowing: false
        };
    }


    componentDidMount(){

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

    gotNextPage(evt){
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {

            let currentPage = this.state.currentPage;

            if(currentPage === this.state.maxPages) {
                this.props.callback();

            }

            else {
                this.setState({
                    currentPage : currentPage + 1
                })

            }
        }
    }

    goToPreviousPage(evt){
        if (evt.type === 'click' && evt.clientX !== 0 && evt.clientY !== 0) {

            let currentPage = this.state.currentPage;

            if(currentPage === 1) {
                this.props.callback();

            } else {
                this.setState({
                    currentPage : currentPage -1
                })

            }
        }


    }

    defineIcon() {
        let currentPage =this.state.currentPage;
        if(currentPage === this.state.maxPages) {
            return ("close")
        } else {
            return ("keyboard_arrow_right")

        }}

    generateDots() {
        let dots = [];
        const grayDot = <div className="gray-dot"/>;
        const whiteDot = <div className="white-dot"/>;

        const currentPage = this.state.currentPage -1;
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

            <div className="manual-fab-button flex-align-self-end margin24px " onClick={(evt) => {this.gotNextPage(evt)}} >
                <i className="material-icons">{this.defineIcon()}</i>
            </div>
        );

        const LinkBtnBack = () => (
            <div className="manual-fab-button flex-align-self-end margin24px" onClick={(evt) => {this.goToPreviousPage(evt)}}>
                <i className="material-icons">keyboard_arrow_left</i>
            </div>
        );

        const CurrentPageDots = () => (
            <div className="container flex-container-center flex-2" >
                {this.generateDots()}


            </div>
        );


        return(
            <div className="local-manual-create-session fade-in">
                <Header/>
                <div className="rounded-container bg-color-accent  ">
                    <div className="container min-height-maxview flex-container-column-direction">
                        <div className="container fade-in">
                            <h1 className="margin24px roboto-black ">Opprettelse av en session</h1>
                        </div>
                        <div className= "manual-element">
                            <ManualCreateSession id ={this.state.currentPage }/>

                        </div>
                    </div>



                    <div className="rounded-container bg-color-accent-dark bottom-fixed min-height-50px">
                        <div className="container flex-container-center" >
                            <LinkBtnBack/>
                            <CurrentPageDots/>
                            <LinkBtnForward/>

                        </div>

                    </div>
                </div>
            </div>


        )
    }
}

export default UserManualCreateSessionComponent;