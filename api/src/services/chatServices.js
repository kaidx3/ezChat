import sql from 'mssql'

const createChat = async (pool, members, name) => {
    try {
        let connection = pool.request();
        let id = await connection.query`
        INSERT INTO Chat (ChatName, DateCreated)
        VALUES (${name}, GETDATE())
        SELECT Scope_Identity()
        `
        const table = new sql.Table('ChatAccount');
        table.columns.add('AccountID', sql.VarChar(200), {nullable: false});
        table.columns.add('ChatID', sql.Int, {nullable: false});

        members.forEach(member => table.rows.add(member.uid, id.recordset[0]['']));
        await connection.bulk(table)
    } catch (err) {
    }
}

const getChatsUid = async (pool, uid) => {
    try {
        let chats = []

        let connection = pool.request();
        let chatIds = await connection.query`
        SELECT ChatID
        FROM ChatAccount
        WHERE AccountID = ${uid}
        `
        if (chatIds.length < 1) {
            return []
        }


        let whereclause = ""
        chatIds.recordset.forEach(record => {
            whereclause += `ChatID = ${record.ChatID} OR `
        })
        whereclause = whereclause.slice(0, whereclause.length - 4)
        let query = `
        SELECT AccountID, ChatID
        FROM ChatAccount
        WHERE ${whereclause}
        `
        let members = await connection.query(query)

        query = `
        SELECT ChatID, ChatName, DateCreated, LastMessageSentDate
        FROM Chat
        WHERE ${whereclause}
        `
        let extraChatInfo = await connection.query(query)

        chatIds.recordset.forEach((chatId) => {
            let chat = {
              chatID: chatId.ChatID,
              extraChatInfo,
              members,
            };
            let mems = members.recordset
              .filter((member) => member.ChatID === chatId.ChatID)
              .map((member) => member.AccountID);
            chat.members = mems;

            let info = extraChatInfo.recordset.filter(chat => chat.ChatID === chatId.ChatID)
            chat.extraChatInfo = info

            chats.push(chat);
          });
        return chats
    } catch (err) {
    }
}

export {createChat, getChatsUid}