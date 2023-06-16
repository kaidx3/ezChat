import { apiLink } from "./apiLink";

const createChat = async (members, name, usernames) => {
    let results = await fetch(`${apiLink}/chat/createChat`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ members: members, name: name, usernames: usernames })
    });
    let data = results.json();
    return data;
}

const getChatsUid = async (uid) => {
    let results = await fetch(`${apiLink}/chat/getChatsUid/?uid=${uid}`);
    let data = results.json();
    return data;
}

const getChatNameChatID = async (chatID) => {
    let results = await fetch(`${apiLink}/chat/getChatNameChatID/?chatID=${chatID}`);
    let data = results.json();
    return data;
}

const leaveChat = async (uid, chatID) => {
    let results = await fetch(`${apiLink}/chat/leaveChat/?uid=${uid}&chatID=${chatID}`);
    let data = results.json();
    return data;
}

export {createChat, getChatsUid, getChatNameChatID, leaveChat}