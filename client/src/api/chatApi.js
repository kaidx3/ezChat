import { apiLink } from "./apiLink";

const createChat = async (members, name) => {
    let results = await fetch(`${apiLink}/chat/createChat`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ members: members, name: name })
    });
    let data = results.json();
    return data;
}

const getChatsUid = async (uid) => {
    let results = await fetch(`${apiLink}/chat/getChatsUid/?uid=${uid}`);
    let data = results.json();
    return data;
}

export {createChat, getChatsUid}