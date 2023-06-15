import { checkQueriesValid } from '../utility.js';
import express from 'express';
import { getLatestMessage, sendMessage, getAllMessagesChatID } from '../services/messageServices.js';
let router = express.Router();

router.get('/getLatestMessage', async (req, res) => {
    if (!checkQueriesValid([{value: req.query.chatID, num: true}])) {
        res.json([]);
        return;
    }
    let pool = req.app.get("db");
    let data = await getLatestMessage(pool, req.query.chatID);
    res.json(data.recordset);
})

router.post('/sendMessage', async (req, res) => {
    if (!checkQueriesValid([{value: req.body.content, num: false}, {value: req.body.sentBy, num: false}, 
        {value: req.body.chatID, num: true}, {value: req.body.username, num: false}])) {
        res.json([]);
        return;
    }
    let pool = req.app.get("db");
    await sendMessage(pool, req.body.content, req.body.sentBy, req.body.chatID, req.body.username);
    const io = req.app.get('socketio');
    io.to(req.body.chatID).emit('newMessage', { message: 'A new message has been added!' });
    res.json({ submitted: true });
})

router.get('/getAllMessagesChatID', async (req, res) => {
    if (!checkQueriesValid([{value: req.query.chatID, num: true}])) {
        res.json([]);
        return;
    }
    let pool = req.app.get("db");
    let data = await getAllMessagesChatID(pool, req.query.chatID);
    res.json(data.recordset)
})

export {router};