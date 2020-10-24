import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export default function Alert(props) {
    const { type, description, code, source } = props;

    const getAlertClass = (type) => {
        switch(type.toLowerCase()) {
            case 'error':
                return 'error';
            case 'warning':
                return 'warning';
            case 'info':
                return 'info';
            default:
                return 'no-type';
        }
    }

    return (
        <div className={getAlertClass(type) + ' alert-content'}>
            { 
            type !== 'info' ? // Displays the correct icon based on type prop
                <i className="fas fa-exclamation-triangle" /> 
                :
                <i className="fas fa-info-circle" />    
            }
            <div className="type first">{type.toUpperCase()} : </div>
            <div className="description">
                <span className="bold">Description:</span> {description}
            </div>
            <div className="code">
                <span className="bold">Code:</span> {code}
            </div>
            <div className="source last">
                <span className="bold">Source:</span> {source}
            </div>
        </div>
    );
}

Alert.propTypes = {
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    code: PropTypes.number.isRequired,
    source: PropTypes.string.isRequired,
};

Alert.defaultProps = {
    type: 'warning',
    description: 'An error may occurred, please check details deeper',
    code: 999,
    source: 'N/A',
};
