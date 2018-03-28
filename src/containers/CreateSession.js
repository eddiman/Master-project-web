import React from 'react'
import {CardOuter, TitleBar} from '../components/Card.js';
import {Column} from '../components/Column';
import {Row} from '../components/Row';
import styled from 'styled-components';
import theme from '../theme/theme';
import Button from '../components/Button'

const InputField = styled.input`
    border-bottom: 1px solid;
    border-bottom-color: #fbb033;
    border-top: none;
    border-left: none;
    border-right: none;
    margin: 16px;
    color: #2f2f2f;
    height: 32px;
    font-size: 1.1em;
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
    width:90%;
    transition: border-bottom-color .3s,  border-bottom .3s;
        ${InputField}:focus {
        outline:none;
        border-bottom: 1px solid;
        border-bottom-color: ${props => props.color};
          }
    `;
class CreateSession extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            sessionName : '',
            sessionUser : ''
        }

    }

    updateSessionName(evt)  {
        this.setState({
            sessionName: evt.target.value
        });
    }

    updateSessionUser(evt) {
        this.setState({
            sessionUser: evt.target.value
        });

    }

    createSession(){
        console.log("trying to create a session...");
    }
    render(){
        return(
            <Column offsetLg="4"  xs ="12"  lg="4">


                <CardOuter>
                    <TitleBar><h2>Create a session - Add name and user</h2> </TitleBar>
                    <Row>
                        <Column xs ="12"  lg="12">
                            <h3>Session Name</h3>
                            <InputField color={theme.colorAccent} placeholder="Name of the session" value={this.state.sessionName} onChange={evt => this.updateSessionName(evt)} />
                            <h3>Session User</h3>
                            <InputField color={theme.colorAccent} placeholder="The session user" value={this.state.sessionUser} onChange={evt => this.updateSessionUser(evt)} />
                        </Column>
                        <Column offsetLg="0"  xs ="12"  lg="4">
                        </Column>

                    </Row>

                </CardOuter>

                <CardOuter>
                    <TitleBar><h2>Create a session - Add beacons</h2> </TitleBar>


                </CardOuter>

                <CardOuter>
                    <TitleBar><h2>Create a session - Configure map</h2> </TitleBar>
                    <Row>

                        <Column offsetLg="8"  xs ="12"  lg="4">
                            <Button color={theme.appRed} fontColor={theme.appWhite} text="Back" link="/"/>

                            <Button color={theme.appGreen} fontColor={theme.appWhite} text="Create session" link="/create-session" onClick={this.createSession()}/>
                        </Column>
                    </Row>
                </CardOuter>
            </Column>




        )
    }
}

export default CreateSession;