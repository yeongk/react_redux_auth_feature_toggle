import React from "react";
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { Auth } from './app'
import { FeatureToggle } from './app'
import CONST from './util/constants'

const userStatus = {
    user: {
        userName: null,
        firmAuthToken: null
    },
    authenticated: false,
    authorized: false,
    authColor: CONST.COLOR_BLACK,
    featureToggleColor: CONST.COLOR_BLACK,
};

const stateControl = (state = userStatus, action) => {
    switch (action.type) {
        case CONST.AUTH_AUTHENTICATED:
            return Object.assign({}, state, { user: action.user, authenticated: true, authorized: true, authColor: CONST.COLOR_GREEN, featureToggleColor: state.featureToggleColor });
        case CONST.AUTH_SERVER_ERROR:
            return Object.assign({}, state, { user: action.user, authenticated: true, authorized: false, authColor: CONST.COLOR_YELLOW, featureToggleColor: state.featureToggleColor });
        case CONST.AUTH_FAILED:
            return Object.assign({}, state, { user: action.user, authenticated: false, authorized: false, authColor: CONST.COLOR_RED, featureToggleColor: state.featureToggleColor });
        case CONST.FEATURE_AVAILABLE:
            return Object.assign({}, state, { user: state.user, authenticated: state.authenticated, authorized: state.authorized, authColor: state.authColor, featureToggleColor: CONST.COLOR_GREEN });
        case CONST.FEATURE_UNAVAILABLE:
            return Object.assign({}, state, { user: state.user, authenticated: state.authenticated, authorized: state.authorized, authColor: state.authColor, featureToggleColor: CONST.COLOR_RED });
        default:
            return state
    }
}

const store = createStore(stateControl)

ReactDOM.render(
    <Provider store={store}>
        <div id="gallery">
            <div>
                <Auth />
            </div>
            <div>
                <FeatureToggle />
            </div>
        </div>
    </Provider>,
    document.getElementById('container')
)