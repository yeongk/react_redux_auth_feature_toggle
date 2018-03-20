import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Rectangle, Circle, Ellipse, Line, Polyline, CornerBox, Triangle } from 'react-shapes';


export default class FeatureToggle extends Component {
    componentWillMount() {
        const { featureToggleStatus, onCheckFeatureToggle } = this.props;
        console.log(`featureToggleStatus:${JSON.stringify(featureToggleStatus)}`)
    }

    render() {
        const { featureToggleStatus, onCheckFeatureToggle } = this.props;
        return (
            <div className="toggle">
                <div>Feature Availability</div>
                <Circle r={50} fill={{ color: featureToggleStatus.light }} stroke={{ color: '#000000' }} strokeWidth={1} />
                <div>
                    Feature Toggle <input type="text" size="40" onChange={this.onEnterFeatureToggle.bind(this)} /> <br /> <br />
                    <button onClick={onCheckFeatureToggle}><strong>Check Feature Availability</strong></button>
                </div>
            </div>
        )
    }

    onEnterFeatureToggle(evt) {
        this.props.featureToggleStatus.featureToggle = evt.target.value;
    }


}

FeatureToggle.propTypes = {
    featureToggleStatus: PropTypes.object.isRequired,
    onCheckFeatureToggle: PropTypes.func.isRequired
}


