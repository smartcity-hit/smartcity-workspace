import React from 'react';

import './index.scss';

class Chiller extends React.Component {
    state = {
        // HARDCODED
        status: 'idle',
        alarmState: 'idle',
    };

    startChiller() {}

    stopChiller() {}

    render() {
        return <div></div>;
    }
}

export default Chiller;
