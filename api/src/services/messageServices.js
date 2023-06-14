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

export {getLatestMessage};