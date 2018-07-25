import React from 'react'
import MobileDeviceFrame from "./MobileDeviceFrame";
import Img1 from "../res/img/manual-mobile-1.png";
import Img2 from "../res/img/manual-mobile-2.png";
import Img3 from "../res/img/manual-mobile-3.png";
import Img4 from "../res/img/manual-mobile-4.png";
import {Link} from "react-router-dom";


class HelpButton extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            toUrl : props.toUrl,
            fromUrl : props.fromUrl
        }


    }

    render(){
        return (
            <Link to={this.state.toUrl + this.state.fromUrl}>
                <div className="manual-blue-fixed-button flex-align-self-end margin24px">
                    <i className="material-icons md-36">help_outline</i>
                </div>
            </Link>
        )
    }

}

export default HelpButton;



