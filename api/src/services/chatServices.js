import sql from 'mssql'

const createChat = async (pool, members, name, usernames) => {
    try {
        let connection = pool.request();
        let id = await connection.query`
        INSERT INTO Chat (ChatName, DateCreated, ChatUsernames, LatestEventDate, LatestMessage)
        VALUES (${name}, GETDATE(), ${usernames}, GETDATE(), ${""})
        SELECT Scope_Identity()
        `
        const table = new sql.Table('ChatAccount');
        table.columns.add('AccountID', sql.VarChar(200), {nullable: false});
        table.columns.add('ChatID', sql.Int, {nullable: false});

        members.forEach(member => table.rows.add(member.uid, id.recordset[0]['']));
        await connection.bulk(table)
    } catch (err) {
        console.log(err)
    }
}

const getChatsUid = async (pool, uid) => {
    try {
        let connection = pool.request();
        let chatIds = await connection.query`
        SELECT ChatID
        FROM ChatAccount
        WHERE AccountID = ${uid}
        `
        if (chatIds.recordset.length < 1) {
            return []
        }


        let whereclause = ""
        chatIds.recordset.forEach(record => {
            whereclause += `ChatID = ${record.ChatID} OR `
        })

        whereclause = whereclause.slice(0, -4)

        let query = `
        SELECT ChatID, ChatName, DateCreated, LatestEventDate, LatestMessage, LastMessageSentDate, ChatUsernames
        FROM Chat
        WHERE ${whereclause}
        `

        let chats = await connection.query(query)

        return chats.recordset
    } catch (err) {
    }
}

const getChatNameChatID = async (pool, chatID) => {
    try {
        let connection = pool.request();
        let data = await connection.query`
        SELECT ChatName, ChatUsernames
        FROM Chat
        WHERE ChatID = ${chatID}
        `
        return data  
    } catch (err) {
    }
}

const leaveChat = async (pool, uid, chatID) => {
    try {
        let connection = pool.request();
        let data = await connection.query`
        DELETE FROM ChatAccount
        WHERE AccountID = ${uid} AND ChatID = ${chatID}
        `
        return data  
    } catch (err) {
    }
}

export {createChat, getChatsUid, getChatNameChatID, leaveChat}