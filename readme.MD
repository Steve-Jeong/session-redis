Sessions in express.js | Node.js session implementation with Redis
==================================================================

docker로 session-redis라는 이름의 redis 컨테이너 설치   
docker run --name session-redis -p 6379:6379 -d redis

redis-session컨테이너에 진입   
docker exec -it session-redis redis-cli
<br><br>    
# 유투브 #2 - 골격 구성
https://www.youtube.com/watch?v=n4ClLTXXZsE&list=PL1Nml43UBm6fPP7cW9pAFTdZ_9QX2mBn2&ab_channel=productioncoder

## 프로젝트 초기화   
npm init -y

## package 설치   
npm install redis connect-redis express-session express   
npm i -D nodemon   

index.js
```javascript
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
```

<br><br>    
# 유투브 #3 - apply express-session
https://www.youtube.com/watch?v=mzG3tpZmRUE&list=PL1Nml43UBm6fPP7cW9pAFTdZ_9QX2mBn2&ab_channel=productioncoder

```javascript
// session에 기록
  req.session.clientId = 'abc123'
  req.session.myNum = 5

// session을 확인
  if(!req.session || !req.session.clientId) {
    const err = new Error('You are not logged in')
    err.statusCode = 401
    next(err)
  }

// session을 출력
  res.json(req.session)
```

<br><br>    
# 유투브 #4 - refactoring routes
https://www.youtube.com/watch?v=AlE021bw3Fc&list=PL1Nml43UBm6fPP7cW9pAFTdZ_9QX2mBn2&ab_channel=productioncoder

<br><br>    
# 유투브 #5 - refactoring codebase
https://www.youtube.com/watch?v=qzKRzwZzc6o&list=PL1Nml43UBm6fPP7cW9pAFTdZ_9QX2mBn2&ab_channel=productioncoder


<br><br>    
# 유투브 #6 - password hashing with bcrypt
https://www.youtube.com/watch?v=i6190xVJMh8&list=PL1Nml43UBm6fPP7cW9pAFTdZ_9QX2mBn2&ab_channel=productioncoder


<br><br>    
# 유투브 #7 - secure password login
https://www.youtube.com/watch?v=x8Ea6VPs89o&list=PL1Nml43UBm6fPP7cW9pAFTdZ_9QX2mBn2&ab_channel=productioncoder