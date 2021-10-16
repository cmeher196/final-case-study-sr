import React from 'react';
import { Redirect, Route } from 'react-router';

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={(routeprops) => {
            return sessionStorage.getItem('isAuthenticated') === 'true' ?
                <Component {...rest} />
                :
                <Redirect to='/login' />
        }} />
    );
}

export default PrivateRoute;