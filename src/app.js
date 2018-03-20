import React from "react";
import ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { render } from 'redux'
import ldClient from 'eze-feature-toggle-js'
import btoa from 'btoa';
import CONST from './util/constants'
import auth from './component/auth'
import featureToggle from './component/featureToggle'

let authStatus = {}
let featureToggleStatus = {}

const Auth = connect(
    mapAuthStateToProps,
    mapAuthDispatchToProps,
    null, {
        pure: false
    }
)(auth);

const FeatureToggle = connect(
    mapFeatureToggleStateToProps,
    mapFeatureToggleDispatchToProps,
    null, {
        pure: false
    }
)(featureToggle);


function mapAuthStateToProps(state) {
    authStatus.userName = state.user.userName;
    authStatus.firmAuthToken = state.user.firmAuthToken;
    authStatus.authenticated = state.authenticated;
    authStatus.authorized = state.authorized;
    authStatus.light = state.authColor;
    return {
        authStatus
    }
}

function mapAuthDispatchToProps(dispatch) {
    return {
        onCheckAuth: (evt) => {

            getResultFromIdP(authStatus.user, authStatus.pw, authStatus.firm)
                .then(response => {
                    let authCheckResult;
                    let user = {
                        UserSession: {
                            UserName: authStatus.user,
                            FirmAuthToken: response.firmAuthToken
                        }
                    }
                    if (response.firmAuthToken) {
                        ezeFeatureToggle.identify(user);
                        authCheckResult = CONST.AUTH_AUTHENTICATED;
                    } else {
                        authCheckResult = CONST.AUTH_FAILED;
                    }
                    dispatch({
                        type: authCheckResult,
                        user: {
                            userName: authStatus.user,
                            firmAuthToken: response.firmAuthToken
                        }
                    })
                })
        }
    }
}

function mapFeatureToggleStateToProps(state) {
    featureToggleStatus.light = state.featureToggleColor;
    return {
        featureToggleStatus
    }
}

function mapFeatureToggleDispatchToProps(dispatch) {
    return {
        onCheckFeatureToggle: (evt) => {
            let featureAvailStatus;
            let user = null;
            if (authStatus.firmAuthToken) {
                user = {
                    UserSession: {
                        UserName: authStatus.userName,
                        FirmAuthToken: authStatus.firmAuthToken
                    }
                }
            };
            if (ezeFeatureToggle.checkBooleanFeatureToggle(featureToggleStatus.featureToggle, user, false)) {
                console.log(`this feature IS available to this user`);
                featureAvailStatus = CONST.FEATURE_AVAILABLE;
            } else {
                console.log(`this feature is not available to this user`);
                featureAvailStatus = CONST.FEATURE_UNAVAILABLE;
            }
            dispatch({
                type: featureAvailStatus
            })
        }
    }
}

function getResultFromIdP(user, pw, firm) {
    return new Promise((resolve, reject) => {

        console.log('inside getResultFromIdP');

        let xhr = new XMLHttpRequest();
        xhr.addEventListener("progress", updateProgress);
        xhr.addEventListener("load", transferComplete);
        xhr.addEventListener("error", transferFailed);
        xhr.addEventListener("abort", transferCanceled);

        // xhr.open('POST', `http://ykim9020a:3000/login`, true);
        xhr.open('POST', `http://localhost:3000/login`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("xsrfHeaderName", "X-CSRF-Token");
        xhr.setRequestHeader("xsrfCookieName", "XSRF-TOKEN");
        xhr.onreadystatechange = () => {
            let response = {}
            if (xhr.readyState > 3) {
                if (xhr.status == 200) {
                    console.log(`response received: ${xhr.responseText}`);
                    response.firmAuthToken = JSON.parse(xhr.responseText).UserSession.FirmAuthToken;
                    resolve(response);
                } else {
                    console.log(`response received: ${xhr.responseText}`);
                    resolve(response);
                }
            }
        };
        xhr.send(JSON.stringify({
            "username": user,
            "password": pw,
            "firm": firm
        }));

    });

}


// progress on transfers from the server to the client (downloads)
function updateProgress(oEvent) {
    if (oEvent.lengthComputable) {
        var percentComplete = (oEvent.loaded / oEvent.total) * 100;
        console.log(`percentComplete:${percentComplete}%`);
        // ...
    } else {
        // Unable to compute progress information since the total size is unknown
    }
}

function transferComplete(evt) {
    console.log("The transfer is complete.");
}

function transferFailed(evt) {
    console.log("An error occurred while transferring the file.");
}

function transferCanceled(evt) {
    console.log("The transfer has been canceled by the user.");
}


// export default App

module.exports = {
    Auth,
    FeatureToggle
}