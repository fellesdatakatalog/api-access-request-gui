import React from "react";
import { Heading, Paragraph } from "@digdir/design-system-react";
import InfoBox from "../InfoBox/InfoBox";
import { bold, link } from "../../util/textTransforms";
import styles from "./styles.module.scss";
import CodeExample from "../CodeExample/CodeExample";
import CodeLanguage from "../CodeExample/CodeLanguage";
import keyCode from "../CodeExample/keyCode.json";
import ConfigBox from "./ConfigBox";

function KeySection() {
  return (
    <>
      <Heading size={"large"} spacing>
        Med manuelt opplastet nøkkel
      </Heading>
      <Paragraph spacing>
        Her lager du ditt eget asymmentriske nøkkelpar. Når du oppretter en ny
        integrasjon, legger du ved public-nøkkelen du ønsker å bruke. Du får en
        key id (kid) som du kan referer til som en del av JWT-grant og bruker
        privatnøkkelen til å signere hele JWT-tokenet
      </Paragraph>

      <InfoBox>
        {bold("Forutsetninger:")}
        <ol className={`${styles.bottomSpacing} ${styles.orderedList}`}>
          <li>
            API-tilgangen er gitt til din virksomhet av organisasjonen som
            tilbyr API'et. Når dette er gjort vil du se tilgangen i{" "}
            {link("/dashboard", "oversikten")}.
          </li>
          <li>
            Du har opprettet et asymmentrisk nøkkelpar av typen RSA256 og har
            public-delen av nøkkelen tilgjengelig. Om du ikke har et
            eksisterende nøkkelpar kan du opprette et med kommandoene. Om du
            ikke trenger en keystore, kan du hoppe over punkt to.
            <ol>
              <li>
                <code>
                  openssl req -newkey rsa:2048 -x509 -keyout key.pem -out
                  cert.pem -days 365
                </code> oppretter en ny nøkkel og selvsignert sertifikat
              </li>
              <li>
                <code>
                  openssl pkcs12 -export -in cert.pem -inkey key.pem -out
                  certificate.p12 -name "certificate"
                </code>
                lager en keystore som passer java-eksempelet under med navn
                "certificate". Denne er ikke nøvendig om du ikke trenger en
                keystore.
              </li>
              <li>
                <code>
                  openssl rsa -in key.pem -pubout -out maskinporten.pem.pub
                </code>
                henter ut public-delen til fila maskinporten.pem.pub .
              </li>
            </ol>
          </li>
          <li>
            Det er opprett en {link("/dashboard", "ny integrasjon ")} eller en
            eksisterende integrasjon som du ønsker å gjenbruke et eksisterende
            nøkkelsett. Dersom du oppretter ny integrasjon, last opp
            public-delen av nøkkelen du ønsker å bruke ved opprettelse.
          </li>
        </ol>
        <Heading size={"medium"}>Fremgangsmåte</Heading>
        <ol className={styles.orderedList}>
          <li>
            Lag JWT-grant i henhold til{" "}
            {link(
              "https://docs.digdir.no/docs/Maskinporten/maskinporten_protocol_jwtgrant",
              "standarden",
            )}
            . Følgende felter er påkrevd
          </li>
          <ol>
            <li>
              Headerfeltet <code>alg</code>: RS256, RS384 eller RS512 er mulige
              verdier støttet av Maskinporten
            </li>
            <li>
              Headerfeltet <code>kid</code>: key-id (kid) fra integrasjonen du
              ønsker å bruke
            </li>
            <li>
              Bodyfeltet <code>aud</code>: Maskinporten sin issuer-url, se
              miljøspesifikke url under Konfigurasjonsfelter
            </li>
            <li>
              Bodyfeltet <code>iss</code>: client-id for integrasjonen du ønsker
              å bruke
            </li>
            <li>
              Bodyfeltet <code>scope</code>: scopet knyttet til apiet du vil
              aksessere
            </li>
            <li>
              Bodyfeltet <code>ita</code>: Timestamp i UTC-tid
            </li>
            <li>
              Bodyfeltet <code>exp</code>: Timestamp for utgått tilgang i
              UTC-tid
            </li>
          </ol>
          Anbefalt eller knyttet til APIet som skal benyttes
          <ol>
            <li>
              Bodyfeltet <code>jti</code>: unik uuid
            </li>
            <li>
              Bodyfeltet <code>resource</code>: Dersom API-tilbyder har
              spesifisert en audience-begrensning på sitt API må den settes her.
              Gyldige verdier må beskrives av API-tilbyder. Se mer om{" "}
              {link(
                "https://docs.digdir.no/docs/Maskinporten/maskinporten_func_audience_restricted_tokens",
                "audience-begrensning",
                true,
              )}
            </li>
          </ol>
          <li>Signer JWT-grant med privatnøkkelen du har opprettet</li>
          <li>
            POST med content-type <code>application/x-www-form-urlencoded</code>{" "}
            til Maskinporten sitt token-endepunkt* og følgende parametre i body
            <ol>
              <li>
                <code>grant</code> med verdi{" "}
                <code>urn:ietf:params:oauth:grant-type:jwt-bearer</code>
              </li>
              <li>
                <code>assertion</code> med serialisert JWT-grant som verdi
              </li>
            </ol>
          </li>
          <li>
            I POST-responsen vil du motta et JSON. Feltet{" "}
            <code>access_token</code> vil være autentisering som trengs mot
            tjenestetilbyder. <code>expiresIn</code> vil beskrive hvor lenge
            tokenet er gyldig, vanligvis 2 minutter.
          </li>
          <li>
            Gjør en kall til API-tjenesten med innholdet i{" "}
            <code>access_token</code> som en del av http-headeren:{" "}
            <code>Authentication: Bearer accesstoken-verdi</code>{" "}
          </li>
        </ol>
      </InfoBox>

      <ConfigBox />

      <CodeExample
        title={"Se kode-eksempel JWT-grant"}
        filter={(client) => !!client.keys}
        filterText={"nøkler"}
      >
        <CodeLanguage title={"Java"} language={"java"} code={keyCode.java} />
      </CodeExample>
    </>
  );
}

export default KeySection;
