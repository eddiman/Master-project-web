import React from 'react'
import { Link } from 'react-router-dom'


class UserManualSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        window.scrollTo(0,0);
    }


    render(){

        return(

            <div>
                <div className="container fade-in">
                    <h1 className="margin24px roboto-black ">Hvordan bruke FireTracker</h1>
                </div>

                <div className="container fade-in min-height-70vh flex-container-vertical-center flex-container-column-direction">
                    <div className="container margin24px flex-container-column-direction">
                        <Link to='/manual/create/1'>
                            <div className="container flex-container-vertical-center">
                                <i className="material-icons md-48 manual-icon list-icon margin24px">add_to_queue</i>

                                <h3 className="margin24px flex-2"> Opprettelse av en session</h3>
                                <div className="manual-fab-button margin24px">
                                    <i className="material-icons">keyboard_arrow_right</i>

                                </div>
                                <hr/>

                            </div>
                        </Link>
                        <Link to='/manual/mobile/1'>
                            <div className="container flex-container-vertical-center">
                                <i className="material-icons md-48 list-icon manual-icon margin24px">speaker_phone</i>

                                <h3 className="margin24px flex-2">Bruk av mobilappen</h3>
                                <div className="manual-fab-button margin24px">
                                    <i className="material-icons">keyboard_arrow_right</i>

                                </div>
                            <hr/>
                            </div>
                        </Link>
                        <Link to='/manual/open/1
                       '>
                            <div className="container flex-container-vertical-center">
                                <i className="material-icons md-48 list-icon manua-icon margin24px">web</i>

                                <h3 className="margin24px flex-2">Visning av en session</h3>
                                <div className="manual-fab-button margin24px">
                                    <i className="material-icons">keyboard_arrow_right</i>

                                </div>
                            </div>
                        </Link>

                    </div>

                <i id="manual-select-arrow-down" className="material-icons md-60 manual-icon">keyboard_arrow_down</i>
                </div>
                <div className="rounded-container bg-color-accent-dark rounded-container-position-correction-25px add-padd">
                    <div className="container fade-in">
                        <h1 className="margin24px roboto-black ">Om FireTracker</h1>
                        <p className="margin24px ">FireTracker er et prosjekt …
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pharetra vel dolor consectetur lacinia. Aliquam eu ante pulvinar, pulvinar tortor finibus, eleifend lacus. Morbi et erat massa. Duis molestie sit amet urna et molestie. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec mauris nibh, faucibus et orci vel, varius eleifend enim. Aenean blandit, ex dapibus ornare commodo, felis nulla varius sapien, vehicula hendrerit erat ante vel lectus. Pellentesque euismod ullamcorper ullamcorper. Pellentesque in nulla a urna iaculis tincidunt viverra sed ipsum. Duis sagittis nunc consequat justo tincidunt vulputate. Nullam semper mollis pretium. Curabitur vitae nibh magna.</p>
                    </div>
                </div>
                <div className="rounded-container bg-color-accent-dark bottom-fixed min-height-50px">
                    <div className="container flex-container-align-start " >
                        <Link to={'/'}>
                            <div className="manual-fab-button margin24px">
                                <i className="material-icons">keyboard_arrow_left</i>
                            </div>
                        </Link>

                    </div>

                </div>
            </div>
        )
    }
}

export default UserManualSelect;