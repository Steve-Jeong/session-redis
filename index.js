const express = require('express')
const app = express()
const router = require('./routes')
const session = require('./middleware/session')


app.use(express.json())

// 2. Initialize sesssion storage.
app.use(session)


app.use(router)


const PORT = 3001
app.listen(PORT, console.log(`server is listening on port http://localhost:${PORT}`))