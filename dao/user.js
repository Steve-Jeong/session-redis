const bcrypt = require('bcryptjs')

const users = {
  'user1@productioncoder.com' : {
    pwHash: bcrypt.hashSync('user1pw',10),
    roles: ['ADMIN'],
    id: '7ff7777d-0d28-48d4-89b8-30349a3bbb00'
  },
  'user2@productioncoder.com' : {
    pwHash: bcrypt.hashSync('user2pw', 10),
    roles: ['ACCOUNT_MANAGER'],
    id: 'fbcfa0cb-06c7-4497-824a-45822a1d4243'
  }
}

// this call would be async and would return a promise
// if we were to use a real database
async function findUserByEmail(email) {
  const user = users[email]
  return user ? user : Promise.reject('user not found')
}

module.exports = {
  findUserByEmail
}