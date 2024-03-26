import React from 'react';

// MessageItem component
function MessageItem({ message, isOutgoing }) {
    const messageClass = isOutgoing ? 'message-outgoing' : 'message-incoming';

    return (
        <div className={`message ${messageClass}`}>
            <div className="message-content">{message.body}</div>
            <div className="message-timestamp">{new Date(message.dateCreated).toLocaleTimeString()}</div>
        </div>
    );
}

export default MessageItem;
