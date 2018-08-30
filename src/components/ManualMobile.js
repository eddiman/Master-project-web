import React from 'react'
import MobileDeviceFrame from "./MobileDeviceFrame";
import Img1 from "../res/img/manual-mobile-1.png";
import Img2 from "../res/img/manual-mobile-2.png";
import Img3 from "../res/img/manual-mobile-3.png";
import Img4 from "../res/img/manual-mobile-4.png";


class ManualCreateSession extends React.Component {


    constructor(props) {
        super(props);
    }

    render(){

        switch (this.props.id) {

            case 1:
                return (
                    <div className="container flex-container-center fade-in">

                        <div className="container flex-container-center flex-container-column-direction  padding8px">
                            <MobileDeviceFrame img={Img1}/>
                            <h1>Velg en session</h1>
                            <p className="max-width-600px">
                                Etter å ha opprettet en session, så vil den dukke opp i mobilappen.
                                For å velge en session, trykk på på «Åpne».
                            </p>
                        </div>

                    </div>);

                case 2:
                return (
                    <div className="container flex-container-center fade-in">

                        <div className="container flex-container-center flex-container-column-direction  padding8px">
                            <MobileDeviceFrame img={Img2}/>
                            <h1>Start tracking av session</h1>
                            <p className="max-width-600px">
                                For å starte tracking av session, trykk på  det blå «Play»-ikonet. Man vil da få opp en boks, trykk på «Start session».
                                Trackingen har da startet og man vil se at ikonet i midten av skjermen har blitt blå, dette betyr da at den aktivt tracker.
                            </p>
                        </div>

                    </div>);
                case 3:
                return (
                    <div className="container flex-container-center fade-in">

                        <div className="container flex-container-center flex-container-column-direction  padding8px">
                            <MobileDeviceFrame img={Img3}/>
                            <h1>Avslutt tracking av session</h1>
                            <p className="max-width-600px">
                                For å avslutte trykker man på «Stopp»-ikonet, samme sted som «Play»ikonet var. Man får da en advarsel at man er i ferd med å avslutte session.

                                Hvis dette er tilfellet trykk på den røde knappen der det står «Avslutt».
                            </p>
                        </div>

                    </div>);
                case 4:
                return (
                    <div className="container flex-container-center fade-in">

                        <div className="container flex-container-center flex-container-column-direction  padding8px">
                            <MobileDeviceFrame img={Img4}/>
                            <h1>Opplasting av session</h1>
                            <p className="max-width-600px">
                                Sessionen vil da begynne opplastingen av sessionen, dette kan ta 1-3 minutter.
                                Når opplastingen er ferdig vil man se et grønt hakeikon, når denne vises kan man trygt trykke på "Fullfør".
                            </p>
                        </div>

                    </div>);

            default: return null;
        }
    }
}

export default ManualCreateSession;



