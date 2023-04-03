const redis = require('redis')


// 1-1. Initialize client.
let redisClient = redis.createClient()
redisClient.connect().catch(console.error)

module.exports = redisClient