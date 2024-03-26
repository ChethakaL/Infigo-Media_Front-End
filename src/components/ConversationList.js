import React from 'react';
import {FaPerson} from "react-icons/fa6";

function ConversationList({ title, conversations, onSelectConversation }) {
    return (
        <div>
            <h2>{title}</h2>
            <div className="conversation-list">
                {conversations.map((conv) => (
                    <div
                        key={conv._id}
                        className="conversation-item"
                        onClick={() => onSelectConversation(conv)}
                    >
                        <div className="conversation-photo"><FaPerson size={24}/></div>
                        <div className="conversation-info">
                            <h1 className="conversation-title">{conv.name}</h1>
                            <p className="conversation-snippet">{conv.lastMessage}</p>
                            <p className="conversation-time">{conv.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ConversationList;
