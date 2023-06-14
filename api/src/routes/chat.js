import express from 'express';
import { createChat, getChatsUid } from '../services/chatServices.js';
let router = express.Router();

router.post('/createChat', async (req, res) => {
    let pool = req.app.get("db");
    await createChat(pool, req.body.members, req.body.name);
    res.json({ submitted: true });
})

router.get('/getChatsUid', async (req, res) => {
    let pool = req.app.get('db');
    let data = await getChatsUid(pool, req.query.uid);
    res.json(data);
})

export {router};