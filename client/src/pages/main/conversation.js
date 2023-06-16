import { useRef, useEffect, useState } from 'react'
import { getAllMessagesChatID, sendMessage as sendDBMessage } from '../../api/messageApi';
import { searchUid } from '../../api/userApi';
import { getChatNameChatID } from '../../api/chatApi.js'
import { io } from 'socket.io-client';
import { socketLink } from '../../data/socketLink.js'

const socket = io(socketLink);

const Conversation = ({ auth }) => {
    const bottomRef = useRef(null);
    let params = new URLSearchParams(window.location.search);
    let chatID = params.get("chatId");

    const options = {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    const [authLoaded, setAuthLoaded] = useState(false);
    const [messages, setMessages] = useState([]);
    const [chatName, setChatName] = useState("");
    const [uid, setUid] = useState("");

    const sendMessage = async () => {
        let messageContent = document.querySelector("#send-message-content").innerText;
        let currentUserId = await auth.currentUser.uid;
        let username = await searchUid(currentUserId)
        username = username[0].Username
        if (messageContent.length < 0) {
            return;
        }

        await sendDBMessage({ content: messageContent, sentBy: currentUserId, chatID: chatID, username: username });
        document.querySelector("#send-message-content").innerText = "";
    }

    const getMessagesData = async () => {
        let chat = await getChatNameChatID(chatID);
        chat = chat[0]
        if (chat.ChatName == "") {
            setChatName(chat.ChatUsernames);
        }
        else {
            setChatName(chat.ChatName);
        }

        if (auth.currentUser) {
            const currentUid = await auth.currentUser.uid;
            const messages = await getAllMessagesChatID(chatID);
            setUid(currentUid);
            setMessages(messages);
        }
    };

    useEffect(() => {
        const checkAuthState = async () => {
            await auth.onAuthStateChanged((user) => {
                if (user) {
                    setAuthLoaded(true);
                }
            });
        };

        checkAuthState();
    }, []);

    useEffect(() => {
        if (authLoaded && chatID != "undefined") {
            socket.emit('joinChat', chatID);
            getMessagesData();
        }
    }, [authLoaded]);

    
    useEffect(() => {
        socket.on('newMessage', () => {
          getMessagesData();
        });
    
        return () => {
          socket.off('newMessage');
        };
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div id="message-page" className="centered-mw-40rem">
            <h1 className="text-center">{chatName}</h1>

            <div id="messages">
                {
                    messages.map((message, index) => {
                        const date = new Date(Date.parse(message.TimeSent)).toLocaleString(undefined, options);
                        if (message.AccountID === uid) {
                            return (
                                <div className="message-card current-user" key={index}>
                                    <h3>{message.AccountUsername}</h3>
                                    <p className="m-0 date-text">{date}</p>
                                    <p className="message-content">{message.MessageContent}</p>
                                </div>
                            )
                        } else {
                            return(
                                <div className="message-card other-user" key={index}>
                                    <h3>{message.AccountUsername}</h3>
                                    <p className="m-0 date-text">{date}</p>
                                    <p className="message-content">{message.MessageContent}</p>
                                </div>
                            )
                        }
                    })
                }
            </div>

            <div ref={bottomRef} />

            <div id="messageInput" className="flex centered bottom">
                <span 
                id="send-message-content"
                className="message-input" 
                role="textbox" 
                contentEditable="true">
                </span>
                <button className="small-button primary-button ms-1rem" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Conversation;