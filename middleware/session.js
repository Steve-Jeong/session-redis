const session = require('express-session')
const RedisStore = require("connect-redis").default
const redisClient = require('../db/redis')

// if your run behind a proxy (e.g. nginx)
// 프록시 뒤에서 작업할때 http를 쓰지만 incoming request는 https를 쓰므로 cookie가 오지않음. 아래와 같은 코드를 추가해야 이를 해결.
// app.set('trust proxy', 1)  


// 1-2. Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})

module.exports = session({
  store: redisStore,
  resave: false, // required: force lightweight session keep alive (touch)
  saveUninitialized: false, // recommended: only save session when data exists
  secret: "keyboard cat",
  name: "sessionId",  // nodejs를 쓰면 session id이름이 connect.id인데 이를 일반적인 이름으로 바꾸어서 해커 공격으로 부터 보호한다.
  cookie: {
    secure: false,  // if true, only transmit cookie over https. use true in production state.
    httpOnly: true,  // if true, prevents client side JS from reading the cookie
    maxAge: 1000 * 60 * 10  // session max age in milliseconds
  }
})