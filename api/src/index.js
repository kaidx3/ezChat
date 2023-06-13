import express from 'express';
import sql from 'mssql'

const sqlConfig = {
    user: "sa",
    password: "Destiny13245",
    database: "ezChat",
    server: "143.110.209.44",
    port: 1433,
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

const pool = new sql.ConnectionPool(sqlConfig)
const app = express();

//routes
import { router as user } from './routes/user.js'
app.use('/user', user)

app.listen(3000, async () => {
    await pool.connect()
    app.set("db", pool)
    console.log('Listening on port 3000.')
});