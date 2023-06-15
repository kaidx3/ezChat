import express from 'express';
import { createChat, getChatsUid, getChatNameChatID } from '../services/chatServices.js';
import { checkQueriesValid } from '../utility.js'

let router = express.Router();

router.post('/createChat', async (req, res) => {
    if (!checkQueriesValid([{value: req.body.members, num: false}, {value: req.body.usernames, num: false}])) {
        res.json([]);
        return;
    }
    let pool = req.app.get("db");
    await createChat(pool, req.body.members, req.body.name, req.body.usernames);
    res.json({ submitted: true });
})

router.get('/getChatsUid', async (req, res) => {
    if (!checkQueriesValid([{value: req.query.uid, num: false}])) {
        res.json([]);
        return;
    }
    let pool = req.app.get('db');
    let data = await getChatsUid(pool, req.query.uid);
    res.json(data);
})

router.get('/getChatNameChatID', async (req, res) => {
    if (!checkQueriesValid([{value: req.query.chatID, num: true}])) {
        res.json([]);
        return;
    }
    let pool = req.app.get('db');
    let data = await getChatNameChatID(pool, req.query.chatID);
    res.json(data.recordset);
})

export {router};