import { apiLink } from "./apiLink";

const getLatestMessage = async (chatID) => {
    let results = await fetch(`${apiLink}/message/getLatestMessage/?chatID=${chatID}`);
    let data = results.json();
    return data;
}

export { getLatestMessage }