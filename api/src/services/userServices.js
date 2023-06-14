const searchUsername = async (pool, username) => {
    try {
        let connection = pool.request();
        let data = await connection.query`
        SELECT AccountID FROM Account
        WHERE Username = ${username}`;
        return data;
    } catch (err) {
    }
}

const createAccount = async (pool, uid, username) => {
    try {
        let connection = pool.request();
        let data = await connection.query`
        INSERT INTO Account (AccountID, Username)
        VALUES (${uid}, ${username})
        `;
        return data;
    } catch (err) {
    }
}

const searchUid = async (pool, uid) => {
    try {
        let connection = pool.request();
        let data = await connection.query`
        SELECT Username FROM Account
        WHERE AccountID = ${uid}`;
        return data;
    } catch (err) {
    }
}

export {searchUsername, createAccount, searchUid};