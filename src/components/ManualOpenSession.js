import React from 'react'
import Img1 from "../res/img/manual-open-1.png";
import Img2 from "../res/img/manual-open-2.png";
import IpadDeviceFrame from "./IpadDeviceFrame";


class ManualOpenSession extends React.Component {


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
                            <h1>Velg en session</h1>
                            <p className="max-width-600">
                                Velg ønsket session. Session’en kan velges ved å enten trykke på «Åpne»-knappen, eller på selve bildet til session’en.
                            </p>
                        </div>

                    </div>);

                case 2:
                return (
                    <div className="container flex-container-center fade-in">

                        <div className="container flex-container-center flex-container-column-direction  padding8px">
                            <IpadDeviceFrame img={Img2}/>
                            <h1>Informasjon om session</h1>
                            <p className="max-width-600">
                                Her ser man kart over øvelsesområde. De svarte punktene er posisjoner hvor sessionbrukeren har oppholdt seg, jo større de er, jo mer tid brukt på de punktene. De blå er punktene hvor beaconsene har blitt plassert. Det røde punktet er nåværende valgte posisjon i listen, mens den lyse blå som er koblet til den er forrige posisisjon.
                            <br/>
                                Listen ved siden av kartet gir mulighet til å hoppe frem å tilbake for å vise stedene sessionbrukeren har vært. De gule knappene med piler hopper et steg frem eller tilbake, mens den grønne «Play»-knappen viser alle i èn sekvens.

                            </p>
                        </div>

                    </div>);


            default: return null;
        }
    }
}

export default ManualOpenSession;



