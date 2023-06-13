import React, {useEffect, useState} from 'react';
import {useUser} from "../../../hooks/auth";
import styles from './styles.module.scss';
import Logo from '../../../assets/logo.svg';
import {Link} from "react-router-dom";
import {ReactComponent as BedriftSvg} from '../../../assets/ikoner/SVG/Næringsliv.svg';
import {getCookie} from "typescript-cookie";
import jwt_decode from "jwt-decode";
import {IdToken} from "../../../types/tokens";
import {isAuthenticated} from "../../auth/tokenRefresh";
import {Label} from "@digdir/design-system-react";

function Header() {
    const authenticated = isAuthenticated();
    const [user, setUser] = useState<IdToken>();

    const idToken = getCookie('token.id');

    /*fetch("/user").then(res => {
        return res.json();
    }).then(res => {
        console.log(res)
    });*/

    //const {authenticated, user} = useUser();

    useEffect(() => {
        if (idToken) {
            setUser(jwt_decode<IdToken>(idToken));
        }
    }, []);

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <img src={Logo} alt={"Logo"} className={styles.logo} />
                {user ?
                    <div className={styles.userInfo}>
                        <BedriftSvg />
                        <Label>
                            {user!!.name} for {user!!.authorization_details[0].reportees[0].Name}
                        </Label>
                    </div>
                    :
                    <Link to={"/logginn"}>
                        <Label size={"medium"}>
                            LOGG INN
                        </Label>
                    </Link>
                }
            </div>
        </header>
    )
}

export default Header;