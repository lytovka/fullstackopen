import React from 'react'

const Notification = ({message, colortype}) => {
    if(message === null) return null;
    const notificationStatus = {
        color: colortype
    }
    return(
        <div style={notificationStatus} className="new-item">
            <p>{message}</p>
        </div>
    );

};

export default Notification