import React from 'react'


class iPadDeviceFrame extends React.Component {
    constructor(props) {
        super(props);

    }
    render(){

        return(
            <div className="ipad-wrapper">
                <div className="ipad-frame">
                    <div className="ipad-image-wrapper">
                        <img src={this.props.img} />
                    </div>
                </div>
            </div>
        )
    }
}

export default iPadDeviceFrame;