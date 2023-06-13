import express from 'express'
import { searchUsername, createAccount } from '../services/userServices.js'
let router = express.Router()

router.get('/searchUsername', async (req, res) => {
    let pool = req.app.get("db")
    let data = await searchUsername(pool, req.query.username)
    res.json(data.recordset)
})

router.post('/createAccount', async (req, res) => {
    let pool = req.app.get("db")
    let data = await createAccount(pool, req.body.uid, req.body.username)
    res.json({ submitted: true })
})

export {router}