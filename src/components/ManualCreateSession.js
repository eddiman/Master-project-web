import React from 'react'
import IpadDeviceFrame from "./IpadDeviceFrame";
import Img1 from "../res/img/manual-create-session-1.png"
import Img2 from "../res/img/manual-create-session-2.png"
import Img3 from "../res/img/manual-create-session-3.png"
import Img4 from "../res/img/manual-create-session-4.png"
import Img5 from "../res/img/manual-create-session-5.png"
import Img6 from "../res/img/manual-create-session-6.png"


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
                            <h1>Navngivning av økt</h1>
                            <p className="max-width-600px">
                                For å opprette en økt må man først skrive inn et navn for økten, dette burde være noe
                                som er lett gjenkjennelig. Navnet må ha minst 5 bokstaver.

                                Skriv deretter inn navn på personen som skal bruke systemet i feltet under. Dette må også ha minst 5 bokstaver.

                                Når begge feltene er fylt ut, trykk "Neste".
                            </p>
                        </div>

                    </div>);

            case 2:
                return (
                    <div className="container flex-container-center fade-in">

                        <div className="container flex-container-center flex-container-column-direction  padding8px">
                            <IpadDeviceFrame img={Img2}/>
                            <h1>Valg av beacons</h1>
                            <p className="max-width-600px">
                                For å legge til beaconer i økten, trykker man på hele feltet, alternativt kan man trykke på "Legg til"-knappen på
                                høyresiden av beaconen. Ønsker man å se den tekniske infoen som tilhører beaconen, kan man trykke på "Tek. Info".
                                Man må ha minst tre beaconer for å opprette en økt. Når tre beaconer er valgt, kan man trykke på "Neste" for å gå videre.
                            </p>
                        </div>

                    </div>);
            case 3:
                return (
                    <div className="container flex-container-center fade-in">

                        <div className="container flex-container-center flex-container-column-direction  padding8px">
                            <IpadDeviceFrame img={Img3}/>
                            <h1>Opplasting av kart</h1>
                            <p className="max-width-600px">
                                Her må man laste opp en kartfil. Hvis man bruker en PC, Mac eller tilsvarende, så kan man laste opp en bildefil fra en mappe på
                                datamaskinen. Hvis man bruker iPad eller et annet type nettbrett har man også mulighet for å laste opp bilde direkte fra kamera.
                                <br/>
                                <br/>
                                På iPad så vil det dukke opp en dialogboks som gir deg mulighet til å velge fra iPadens bildebibliotek, eller så kan man ta bilde
                                med iPadens innebygde kamera.
                                Når filen har blitt valgt, eller tatt bilde av med kamera, vil bildet lastes opp, og du vil automatisk bli tatt til neste steg.
                            </p>
                        </div>

                    </div>);

            case 4:
                return (
                    <div className="container flex-container-center fade-in">

                        <div className="container flex-container-center flex-container-column-direction  padding8px">
                            <IpadDeviceFrame img={Img4}/>
                            <h1>Plassering av beacons</h1>
                            <p className="max-width-600px">
                                På denne skjermen er det to elementer: En liste med de valgte beaconene til venstre, og
                                kartet som beaconene skal plasseres på til høyre.
                                <br/>
                                <br/>
                                For å plassere en beacon trykker man først på ønsket beacon i listen, og trykker deretter
                                på ønsket sted på kartet. Når beaconen er plassert vil man se at beaconen lyser opp i grønt
                                og at teksten sier at beaconen har blitt plassert.
                                <br/>
                                <br/>
                                Det er ikke helt nødvendig å ha beaconen helt nøyaktig plassert på kartet da det er området som er viktigst.
                                <br/>
                                <br/>
                                Hvis man derimot har plassert beaconene helt feil, så kan man trykke på
                                "Fjern alle plasserte beaconer"-knappen. Da vil alle plasserte beaconer fjernes fra kartet, og du får muligheten til
                                å plassere de på nytt.
                                <br/>
                                <br/>
                                Når alle beaconene er plassert kan du trykke på "Opprett", da vil man få en oppsummering av økten.
                            </p>
                        </div>

                    </div>);
            case 5:
                return (
                    <div className="container flex-container-center fade-in">

                        <div className="container flex-container-center flex-container-column-direction  padding8px">
                            <IpadDeviceFrame img={Img5}/>
                            <h1>Oppsummering av økten</h1>
                            <p className="max-width-600px">
                                Her ser man en meldingsboks som oppsummerer informasjonen man har skrevet inn i økten.
                                <br/>
                                Hvis man mangler noen plasserte beaconer vil dette vises her. Man kan da trykke på "Lukk"-knappen og
                                meldingsboksen vil lukke seg uten at man taper informasjonen som man har tastet inn. Det samme gjelder
                                hvis man ser en feil i oppsummeringen.
                                <br/>

                                Hvis alt stemmer så kan man trykke på "Opprett"-knappen. Da vil økten bli opprettet.
                            </p>
                        </div>

                    </div>);
            case 6:
                return (
                    <div className="container flex-container-center fade-in">

                        <div className="container flex-container-center flex-container-column-direction  padding8px">
                            <IpadDeviceFrame img={Img6}/>
                            <h1>Neste steg etter opplasting</h1>
                            <p className="max-width-600px">
                                Når økten blir opprettet får man en ny meldingsboks. Her blir man rådgitt å åpne Android-appen.
                                Andre valg i denne meldingsboksen er at man kan lage en lik økt. Trykker man på denne så vil
                                meldingsboksen lukkes og man blir tatt opp til navngvingsdelen av øktopprettelsen. All informasjon
                                som ble tastet inn forblir, og man kan gjøre mindre justeringer i navn for å lett lage tilsvarende
                                økter for annet personell.
                                <br/>
                                Det siste alternativet er å bli tatt tilbake til hovedsiden.

                            </p>
                        </div>

                    </div>);


            default: return null;
        }
    }
}

export default ManualCreateSession;



