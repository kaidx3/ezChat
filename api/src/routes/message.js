
import express from 'express';
import { getLatestMessage, sendMessage, getAllMessagesChatID } from '../services/messageServices.js';
let router = express.Router();

router.get('/getLatestMessage', async (req, res) => {
    let pool = req.app.get("db");
    let data = await getLatestMessage(pool, req.query.chatID);
    res.json(data.recordset);
})

router.post('/sendMessage', async (req, res) => {
    let pool = req.app.get("db");
    await sendMessage(pool, req.body.content, req.body.sentBy, req.body.chatID, req.body.username);
    const io = req.app.get('socketio');
    io.to(req.body.chatID).emit('newMessage', { message: 'A new message has been added!' });
    res.json({ submitted: true });
})

router.get('/getAllMessagesChatID', async (req, res) => {
    let pool = req.app.get("db");
    let id
    if (isNaN(parseInt(req.query.chatID))) {
        id = -1
    }
    else {
        id = req.query.chatID
    }
    let data = await getAllMessagesChatID(pool, id);
    res.json(data.recordset)
})

export {router};