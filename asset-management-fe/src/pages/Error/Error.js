import React from 'react';

const Error = ({message}) => {
    return (
        <div className="app-error">
            {message}
        </div>
    );
};

export default Error;