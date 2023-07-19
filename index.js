const express = require('express')
const path = require('path')
const port = 2000;
const db = require('./config/database')
const cors = require('cors')
require('dotenv').config()


app = express()

app.use(express.urlencoded())
app.use(cors())

app.use('/user',require('./router/user.router'))

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server Is Running " + port);
})