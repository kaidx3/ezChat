const getLatestMessage = async (pool, chatID) => {
    try {
        let connection = pool.request();
        let data = await connection.query`
        SELECT TOP 1 MessageContent, TimeSent
        FROM Message
        WHERE ChatID = ${chatID}
        ORDER BY TimeSent DESC;`;
        return data;
    } catch (err) {
    }
}

const sendMessage = async (pool, content, sentBy, chatID, username) => {
    try {
        let connection = pool.request();
        let data = await connection.query`
        INSERT INTO Message (AccountID, MessageContent, ChatID, TimeSent, AccountUsername)
        VALUES (${sentBy}, ${content}, ${chatID}, GETDATE(), ${username});

        UPDATE Chat
        SET LatestEventDate = GETDATE(), LatestMessage = ${content}
        WHERE ChatID = ${chatID};
        `;
        return data;
    } catch (err) {
        console.log(err)
    }
}

const getAllMessagesChatID = async (pool, chatID) => {
    try {
        let connection = pool.request();
        let data = await connection.query`
        SELECT * FROM Message
        WHERE ChatID = ${chatID}`;
        return data;
    } catch (err) {
        console.log(err)
    }
}

export {getLatestMessage, sendMessage, getAllMessagesChatID};