import React, { useState, useEffect } from 'react';
import ConversationList from '../components/ConversationList';
import MessageItem from '../components/MessageItem';
import axios from "axios";

function Message() {
    // State for both WhatsApp and Facebook conversations
    const [whatsappConversations, setWhatsappConversations] = useState([]);
    const [facebookConversations, setFacebookConversations] = useState([]);
    const [sendMessage, setSendMessage] = useState("");
    const [phone, setPhone] = useState("");
    const [messages, setMessages] = useState([]);
    const userNumber = 'whatsapp:+14155238886';

    useEffect(() => {
        const fetchWhatsappConversations = async () => {
            try {
                // const response = await fetch('https://infigomedia.xyz/backend/api/message/conversations');
                const response = await fetch(`http://localhost:4001/backend/api/message/conversations`);
                const data = await response.json();
                console.log(data);
                const formattedConversations = data.map(conv => ({
                    id: conv._id,
                    name: conv._id.replace('whatsapp:', ''),
                    snippet: conv.lastMessage,
                    time: new Date(conv.lastMessageTime).toLocaleTimeString(),
                    profilePic: '/default-profile.png' // Placeholder path for profile pictures
                }));
                setWhatsappConversations(formattedConversations);
            } catch (error) {
                console.error('Error fetching WhatsApp conversations:', error);
            }
        };

        fetchWhatsappConversations();
    }, []);


    const handleSelectConversation = (conversation, service) => {
        const phoneNumber = conversation.id.replace('whatsapp:', '');
        setPhone(phoneNumber);
        const endpoint = service === 'whatsapp'
            ? `http://localhost:4001/backend/api/message/conversations/${phoneNumber}`
            : `https://infigomedia.xyz/backend/api/facebook/messages/${conversation.senderId}`;
        axios.get(endpoint)
            .then(response => {
                const { data } = response;
                if (data && data.messages) {
                    setMessages(data.messages);
                } else {
                    console.error('No messages found');
                }
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    };

    const handleSend = async () => {
        if (!sendMessage.trim()) return;

        try {
            const { data } = await axios.post(`http://localhost:4001/backend/api/message/send-whatsapp`, {
                body: sendMessage,
                to: phone
            });

            if (data.success) {
                const newMessage = {
                    sender: userNumber,
                    body: sendMessage,
                    dateCreated: new Date()
                };

                setMessages(messages.concat(newMessage));
                setSendMessage('');
            } else {
                console.error('Failed to send message:', data.error);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };


    return (
        <div className="messaging-container">
            <div className="sidebar">
                <ConversationList
                    title="WhatsApp"
                    conversations={whatsappConversations}
                    onSelectConversation={(conv) => handleSelectConversation(conv, 'whatsapp')}
                />
                <ConversationList
                    title="Facebook"
                    conversations={facebookConversations}
                    onSelectConversation={(conv) => handleSelectConversation(conv, 'facebook')}
                />
            </div>
            <div className="messages-list">
                <div className='send-msg-container row'>
                    <input
                        type='text'
                        placeholder='Send a message'
                        value={sendMessage}
                        onChange={(e) => setSendMessage(e.target.value)}
                    />
                    <button className='ui primary button' onClick={handleSend}>Send</button>
                </div>
                {messages.map((msg, index) => (
                    <MessageItem
                        key={index}
                        message={msg}
                        isOutgoing={msg.from === userNumber}
                    />
                ))}
            </div>
        </div>
    );
}

export default Message;