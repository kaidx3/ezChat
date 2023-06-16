import express from 'express';
import { createChat, getChatsUid, getChatNameChatID, leaveChat } from '../services/chatServices.js';
import { checkQueriesValid } from '../utility.js'

let router = express.Router();

router.post('/createChat', async (req, res) => {
    if (!checkQueriesValid([{value: req.body.members, num: false}, {value: req.body.usernames, num: false}])) {
        res.json([]);
        return;
    }
    let pool = req.app.get("db");
    await createChat(pool, req.body.members, req.body.name, req.body.usernames);
    const io = req.app.get('socketio');
    req.body.members.forEach(member => {
        io.to(member.uid).emit('chatUpdate', { message: 'A chat has been updated' });
    })
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

router.get('/leaveChat', async (req, res) => {
    if (!checkQueriesValid([{value: req.query.chatID, num: true}, {value: req.query.uid, num: false}])) {
        res.json([]);
        return;
    }
    let pool = req.app.get('db');
    await leaveChat(pool, req.query.uid, req.query.chatID);
    res.json({success: true});
})

export {router};