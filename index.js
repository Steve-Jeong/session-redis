const express = require('express')
const app = express()
const session = require('express-session')
const redis = require('redis')
const RedisStore = require("connect-redis").default

// Initialize client.
let redisClient = redis.createClient()
redisClient.connect().catch(console.error)

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})

// Initialize sesssion storage.
app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: "keyboard cat",
    cookie: {
      secure: false,  // if true, only transmit cookie over https
      httpOnly: true,  // if true, prevents client side JS from reading the cookie
      maxAge: 1000 * 60 * 10  // session max age in milliseconds
    }
  })
)
const PORT = 3001
app.listen(PORT, console.log(`server is listening on port http://localhost:${PORT}`))