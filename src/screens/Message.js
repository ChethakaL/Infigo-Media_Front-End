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
                const response = await fetch(`https://infigomedia.xyz/backend/api/whatsapp/conversations`);
                const data = await response.json();
                console.log(data);
                const formattedConversations = data.map(conv => ({
                    _id: conv.number, // Using 'number' as the unique identifier since '_id' is not present
                    name: conv.conversationId.replace('whatsapp:', '').replace('whatsapp:', ''), // Removing 'whatsapp:' prefix twice due to the format
                    snippet: conv.lastMessage,
                    time: new Date(conv.lastMessageTime).toLocaleTimeString(),
                    profilePic: '/default-profile.png' // Placeholder path for profile pictures
                }));
                setWhatsappConversations(formattedConversations);
            } catch (error) {
                console.error('Error fetching WhatsApp conversations:', error);
            }
        };
        // Fetch Facebook Conversations
        const fetchFacebookConversations = async () => {
            try {
                const response = await fetch(`https://infigomedia.xyz/backend/api/facebook/threads`);
                const data = await response.json();
                const formattedConversations = data.map(conv => ({
                    _id: conv.senderId, // Assuming 'senderId' is the unique identifier
                    name: `User ${conv.senderId}`, // Placeholder for user name. Update according to your data structure
                    snippet: 'Last message snippet', // Placeholder. You might need to adjust this based on your actual data
                    time: 'Time', // Placeholder for the last message time
                    profilePic: '/default-profile.png' // Placeholder path for profile pictures
                }));
                setFacebookConversations(formattedConversations);
            } catch (error) {
                console.error('Error fetching Facebook conversations:', error);
            }
        };

        fetchWhatsappConversations();
        fetchFacebookConversations();
    }, []);


    const handleSelectConversation = (conversation, service) => {
        console.log('Selected conversation:', conversation); // Debug log to see the selected conversation object

        // Changed from conversation.id to conversation._id
        if (!conversation || !conversation._id) {
            console.error('Invalid conversation object:', conversation);
            return; // Exit the function if conversation or conversation._id is undefined
        }

        // Changed from conversation.id to conversation._id
        const phoneNumber = conversation.name.replace('whatsapp:', '');
        setPhone(phoneNumber);

        const endpoint = service === 'whatsapp'
            ? `https://infigomedia.xyz/backend/api/whatsapp/conversations/${phoneNumber}`
            : `https://infigomedia.xyz/backend/api/facebook/messages/${conversation.senderId}`;

        axios.get(endpoint)
            .then(response => {
                const { data } = response;
                if (data && data.conversation) { // Changed from data.messages to data.conversation
                    setMessages(data.conversation); // Adjusted to the correct path based on your backend response
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
            const { data } = await axios.post(`https://infigomedia.xyz/backend/api/whatsapp/send-whatsapp`, {
                to: phone,
                body: sendMessage
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
                        isOutgoing={msg.senderType !== 'client'} // Assuming 'client' indicates an incoming message
                    />
                ))}
            </div>
        </div>
    );
}

export default Message;