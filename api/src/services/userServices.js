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

export {searchUsername, createAccount};