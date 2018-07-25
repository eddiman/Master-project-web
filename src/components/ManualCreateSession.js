import React from 'react'
import IpadDeviceFrame from "./IpadDeviceFrame";
import Img1 from "../res/img/manual-create-session-1.png"
import Img2 from "../res/img/manual-create-session-2.png"
import Img3 from "../res/img/manual-create-session-3.png"


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
                            <IpadDeviceFrame img={Img1}/>
                            <h1>Navngivning av session</h1>
                            <p className="max-width-600">
                                For å opprette en session må man først skrive inn et navn for sessionet, dette burde inneholdet noe
                                som man kjenne den igjen lett med.

                                Deretter skriv inn navn på personen som skal bruke systemet i «Session User»
                            </p>
                        </div>

                    </div>);

                case 2:
                return (
                    <div className="container flex-container-center fade-in">

                        <div className="container flex-container-center flex-container-column-direction  padding8px">
                            <IpadDeviceFrame img={Img2}/>
                            <h1>Valg av beacons</h1>
                            <p className="max-width-600">
                                Velg beacons som skal brukes i sessionen ved å trykke på det røde feltet. Når valgt vil den bli grønn.

                                Når ønskede beacons er valgt, trykk deretter på «Last opp kartbilde». Du vil da få mulighet til å laste opp en bildefil for å bruke som kart.
                            </p>
                        </div>

                    </div>);
                case 3:
                return (
                    <div className="container flex-container-center fade-in">

                        <div className="container flex-container-center flex-container-column-direction  padding8px">
                            <IpadDeviceFrame img={Img3}/>
                            <h1>Plassering av beacons</h1>
                            <p className="max-width-600">
                                På denne skjermen er det to elementer: En liste med de valgte beacons til venstre, og kartet som beaconsene skal plasseres på til venstre.

                                For å plassere beacon trykker man først på ønsket beacon i listen, og trykker deretter på ønsket sted på kartet. Når beacons er plassert vil men se et rundt punkt på kart og koordinatene lyse grønt i beacons, dette kan sees i bilde.
                            </p>
                        </div>

                    </div>);

            default: return null;
        }
    }
}

export default ManualCreateSession;



