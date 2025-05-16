
import React from 'react';

const ProgressBar = ({ value }) => {
    const percentage = Math.min(Math.max(value, 0), 10) * 10;

    const containerStyle = {
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: '8px',
        overflow: 'hidden',
        height: '30px',
        margin: '10px 0'
    };

    const barStyle = {
        height: '100%',
        width: `${percentage}%`,
        backgroundColor: '#4caf50',
        color: 'white',
        textAlign: 'center',
        lineHeight: '30px',
        transition: 'width 0.3s ease-in-out'
    };

    return (
        <div style={containerStyle}>
            <div style={barStyle}>
                {value}/10
            </div>
        </div>
    );
};

export default ProgressBar;
