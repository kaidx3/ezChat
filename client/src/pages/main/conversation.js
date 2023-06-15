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

    const [authLoaded, setAuthLoaded] = useState(false);
    const [messagesHTML, setMessagesHTML] = useState("");
    const [chatName, setChatName] = useState("");

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messagesHTML]);

    const sendMessage = async () => {
        let messageContent = document.querySelector("#send-message-content").value;
        let currentUserId = await auth.currentUser.uid;
        let username = await searchUid(currentUserId)
        username = username[0].Username
        if (messageContent.length < 0) {
            return;
        }

        await sendDBMessage({ content: messageContent, sentBy: currentUserId, chatID: chatID, username: username });
        document.querySelector("#send-message-content").value = "";
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
        console.log(chatName);
        if (auth.currentUser) {
            const currentUid = await auth.currentUser.uid;
            const messages = await getAllMessagesChatID(chatID);

            const options = {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            };

            let html = ""

            messages.map(async (message) => {
                const date = new Date(Date.parse(message.TimeSent)).toLocaleString(undefined, options);
                if (message.AccountID === currentUid) {
                    html += `
                    <div class="message-card current-user">
                        <h3>${message.AccountUsername}</h3>
                        <p class="m-0 date-text">${date}</p>
                        <p class="message-content">${message.MessageContent}</p>
                    </div>
                    `;
                } else {
                    html += `
                    <div class="message-card other-user">
                        <h3>${message.AccountUsername}</h3>
                        <p class="m-0 date-text">${date}</p>
                        <p class="message-content">${message.MessageContent}</p>
                    </div>
                    `;
                }
            });
            setMessagesHTML(html);
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

    return (
        <div id="message-page" class="centered-mw-40rem">
            <h1 class="text-center">{chatName}</h1>

            <div id="messages">
                {
                    <div dangerouslySetInnerHTML={{ __html: messagesHTML }}></div>
                }
            </div>

            <div ref={bottomRef} />

            <div id="messageInput" class="flex centered">
                <textarea type="text" class="large-input" placeholder="Message" id="send-message-content"></textarea>
                <button class="small-button primary-button ms-1rem" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Conversation;