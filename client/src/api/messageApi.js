import { apiLink } from "./apiLink";

const getLatestMessage = async (chatID) => {
    let results = await fetch(`${apiLink}/message/getLatestMessage/?chatID=${chatID}`);
    let data = results.json();
    return data;
}

const sendMessage = async (message) => {
    let results = await fetch(`${apiLink}/message/sendMessage`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    });
    let data = results.json();
    return data;
}

const getAllMessagesChatID = async (chatID) => {
    let results = await fetch(`${apiLink}/message/getAllMessagesChatID/?chatID=${chatID}`);
    let data = results.json();
    return data;
}

export { getLatestMessage, sendMessage, getAllMessagesChatID }