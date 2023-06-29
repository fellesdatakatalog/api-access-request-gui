
import React, {ComponentType, FC} from 'react';
import {Navigate} from 'react-router-dom';
import {useUser} from "../../hooks/auth";
import {IdToken} from "../../types/tokens";
import {Spinner} from "@digdir/design-system-react";

export interface AuthProps {
    id: IdToken;
}

const withAuth = <P extends object>(
    Component: ComponentType<P & AuthProps>,
): FC<P> => (props) => {
    const { data, isLoading } = useUser();

    if (isLoading) {
        return <Spinner title={"Laster inn..."} />;
    }

    if (!data!!.isAuthenticated) {
        return <Navigate to={"/"} />;
    }

    return <Component {...(props as P)} id={data!!.user!!} />;
};

export default withAuth;