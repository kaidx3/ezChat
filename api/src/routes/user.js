import express from 'express';
import { searchUsername, createAccount, searchUid, resetEmail } from '../services/userServices.js';
import { checkQueriesValid } from '../utility.js';
let router = express.Router();

router.get('/searchUsername', async (req, res) => {
    if (!checkQueriesValid([{value: req.query.username, num: false}])) {
        res.json([]);
        return;
    }
    let pool = req.app.get("db");
    let data = await searchUsername(pool, req.query.username);
    res.json(data.recordset);
})

router.post('/createAccount', async (req, res) => {
    if (!checkQueriesValid([{value: req.body.username, num: false}, {value: req.body.uid, num: false}])) {
        res.json([]);
        return;
    }
    let pool = req.app.get("db");
    await createAccount(pool, req.body.uid, req.body.username);
    res.json({ submitted: true });
})

router.get('/searchUid', async (req, res) => {
    if (!checkQueriesValid([{value: req.query.uid, num: false}])) {
        res.json([]);
        return;
    }
    let pool = req.app.get("db");
    let data = await searchUid(pool, req.query.uid);
    res.json(data.recordset);
})

export {router};