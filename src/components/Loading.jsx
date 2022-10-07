import React from 'react';
import '../styles/loading.css'

const Loading = () => {
    return (
        <div className='overlay'>
            <div className="lds-hourglass"></div>
        </div>
    );
};

export default Loading;