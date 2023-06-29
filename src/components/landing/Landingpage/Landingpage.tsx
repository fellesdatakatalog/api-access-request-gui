import React from 'react';
import {Accordion, Heading, Ingress, Label, Paragraph} from "@digdir/design-system-react";
import {Link} from "react-router-dom";
import {Button} from '@digdir/design-system-react';
import {ReactComponent as MpSvg} from '../../../assets/ikoner/SVG/Maskinporten.svg';
import styles from './styles.module.scss';
import {loginEksternTjenester, loginHovedaministrator} from "../../auth/login";

function Landingpage() {
    return (
        <div className={styles.container}>
            <Heading size={"xlarge"} className={styles.heading}>
                Velkommen til Forenklet Onboarding
            </Heading>
            <Ingress>
                Her kan du enkelt ta i bruk API-tilgangene din virksomhet har fått. Du kan se alle dine
                tilganger, opprette klienter og ta disse i bruk.
            </Ingress>
            <Ingress>
                Vi bruker Ansattporten,
                som er en nasjonal løsning fra Digdir, for å bekrefte at du har de nødvendige rettighetene fra din
                virksomhet til å gjøre dette.
            </Ingress>
            <div className={styles.loginRow}>
                <MpSvg className={styles.svg}/>
                <Button className={styles.loginButton} onClick={loginHovedaministrator}>
                    <Label size={"large"}>
                        Logg inn med rolle Hovedadministrator
                    </Label>
                </Button>
                <Button className={styles.loginButton} onClick={loginEksternTjenester}>
                    <Label size={"large"}>
                        Logg inn med rolle Eksplisitt tjenestedelegering
                    </Label>
                </Button>
            </div>

            <Accordion className={styles.faq}>
                <Accordion.Item>
                    <Accordion.Header>
                        <Label size={"large"}>Hva hvis jeg ikke får logget inn?</Label>
                    </Accordion.Header>
                    <Accordion.Content>
                        <Paragraph>
                            Da kan det være at du ikke har riktig rolle i Altinn for å kunne se og administrere
                            API-tilganger gitt din
                            virksomhet. Enkelte roller i Enhetsregisteret har forhåndsdefinert tilgang, se listen over
                            roller under
                            <Link
                                to={"https://www.altinn.no/hjelp/skjema/alle-altinn-roller/"}> Hovedadministrator</Link>.
                        </Paragraph><Paragraph>
                        Rollen "Eksplisitt tjenestedelegering" vil også gi deg tilgang til å administrere API-tilganger.
                    </Paragraph>
                        <Link
                            to={"https://tt02.altinn.no/api/metadata/rolerequirements?serviceCode=5613&serviceEditionCode=1"}>
                            Les mer her
                        </Link>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>
                        <Label size={"large"}>Hvem kan jeg kontakte for tilgang?</Label>
                    </Accordion.Header>
                    <Accordion.Content>
                        <Paragraph>
                            Daglig leder eller andre som har rollen <Link
                            to={"https://www.altinn.no/hjelp/skjema/alle-altinn-roller/"}>hovedadministrator</Link> i
                            din virksomhet vil ha høyest rettighet til dele ut tilganger.
                            Virksomheten din kan også ha satt opp rollen
                            <Link
                                to={"https://www.altinn.no/hjelp/skjema/alle-altinn-roller/"}> Tilgangsstyrer</Link> som
                            også kan bistå med dette gitt at personen også innehar "Eksplisitt
                            tjenestedelegering"-rollen.

                        </Paragraph>
                        <Paragraph>Av personvernsmessige årsaker kan
                            vi ikke si noe spesifikt om hvem i din bedrift som har disse rollene og kan gi deg
                            tilgang.</Paragraph>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default Landingpage;