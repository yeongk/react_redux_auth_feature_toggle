import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle } from 'react-shapes';


export default class Auth extends Component {
    componentWillMount() {
        const { authStatus, onCheckAuth } = this.props;
        console.log(`authStatus:${JSON.stringify(authStatus)}`)
    }

    // shouldComponentUpdate() {
    //     const { authStatus, onCheckAuth } = this.props;
    //     console.log(`authStatus:${authStatus}`)
    // }

    render() {
        const { authStatus, onCheckAuth } = this.props;
        return (
            <div className="auth">
                <div>Authentication Status</div>
                <Circle r={50} fill={{ color: authStatus.light }} stroke={{ color: '#000000' }} strokeWidth={1} />
                <div>
                    User Name <input type="text" onChange={this.onEnterUserName.bind(this)} /> <br />
                    Password <input type="password" onChange={this.onEnterPW.bind(this)} /> <br />
                    Firm <input type="text" onChange={this.onEnterFirm.bind(this)} /> <br /> <br />
                    <button onClick={onCheckAuth}><strong>Check Authentication</strong></button>
                </div>
            </div>
        )
    }

    onEnterUserName(evt) {
        this.props.authStatus.user = evt.target.value;
    }

    onEnterPW(evt) {
        this.props.authStatus.pw = evt.target.value;
    }

    onEnterFirm(evt) {
        this.props.authStatus.firm = evt.target.value;
    }

}

Auth.propTypes = {
    authStatus: PropTypes.object.isRequired,
    onCheckAuth: PropTypes.func.isRequired
}


