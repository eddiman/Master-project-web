import React from 'react'


class MobileDeviceFrame extends React.Component {
    constructor(props) {
        super(props);

    }
    render(){

        return(
            <div className="mobile-wrapper">
                <div className="mobile-frame">
                    <div className="mobile-image-wrapper">
                        <img src={this.props.img} />
                    </div>
                </div>
            </div>
        )
    }
}

export default MobileDeviceFrame;