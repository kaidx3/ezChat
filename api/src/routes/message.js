import express from 'express';
import { getLatestMessage } from '../services/messageServices.js';
let router = express.Router();

router.get('/getLatestMessage', async (req, res) => {
    let pool = req.app.get("db");
    let data = await getLatestMessage(pool, req.query.chatID);
    res.json(data.recordset);
})

export {router};