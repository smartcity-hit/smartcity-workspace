import React, { Component } from 'react';
import Alert from '../Alert';

import './index.scss';

export default class Compressor extends Component {
    status = { on: 'Running', off: 'Off' };
    // alert = { type: 'error', description: 'An error occurred while trying to activate the compressor', code: 1111, source: 'Compressor-1'};
    isAlert = false;

    constructor(props) {
        super(props);
        this.state = {
            status: this.props.status,
            alert: this.props.alert,
        };
    }

    compressorOff() {
        this.setState((prevState) => ({ ...prevState, status: this.status.off }));
    }
    compressorOn() {
        this.setState((prevState) => ({ ...prevState, status: this.status.on }));
    }

    alertRender() {
        /*
         *alert is an object with the values: { type: string, description: string, code:number, source:string }
         */
        if (this.state.alert) {
            return (
                <div>
                    <Alert
                        type={this.state.alert.type}
                        description={this.state.alert.description}
                        code={this.state.alert.code}
                        source={this.state.alert.source}
                    />
                </div>
            );
        } else {
            return <h3>There is no alert right now</h3>;
        }
    }

    render() {
        return (
            <div className="compressor-wrapper">
                <h1 className="status-wrapper">
                    Compressor is:{' '}
                    <label className={`status ${this.state.status === 'Running' ? 'green' : 'red'}`}>
                        {this.state.status}
                    </label>
                </h1>
                <div className="alert">{this.alertRender()}</div>
            </div>
        );
    }
}
