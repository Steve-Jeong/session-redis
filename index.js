const express = require('express')
const app = express()
const session = require('express-session')
const redis = require('redis')
const RedisStore = require("connect-redis").default

// if your run behind a proxy (e.g. nginx)
// 프록시 뒤에서 작업할때 http를 쓰지만 incoming request는 https를 쓰므로 cookie가 오지않음. 아래와 같은 코드를 추가해야 이를 해결.
// app.set('trust proxy', 1)  

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
      secure: false,  // if true, only transmit cookie over https. use true in production state.
      httpOnly: true,  // if true, prevents client side JS from reading the cookie
      maxAge: 1000 * 60 * 10  // session max age in milliseconds
    }
  })
)

app.use(express.json())

// 3. create an unprotected login endpoint
app.post('/login', (req, res) => {
  const {email, password} = req.body

  // check if the credentials are correct
  // ...

  // if that credentials are correct
  req.session.clientId = 'abc123'
  req.session.myNum = 5

  res.json('you are now logged in')
})

// 4. plug in another middleware that will check if the user is authenticated or not
// all requests that are plugged in after this middleware will only be accessible if the user is logged in
app.use((req, res, next) => {
  if(!req.session || !req.session.clientId) {
    const err = new Error('You are not logged in')
    err.statusCode = 401
    next(err)
  }
  next()
})

// 5. plug in all routes that the user can only access if logged in
app.get('/profile', (req,res, next)=>{
  // check if the user has sufficient privileges
  next() 
},(req, res) => {
  res.json(req.session)
})



const PORT = 3001
app.listen(PORT, console.log(`server is listening on port http://localhost:${PORT}`))