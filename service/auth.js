const userDAO = require('../dao/user')
const bcrypt = require('bcryptjs')

async function login(email, password) {
  try {
    // lookup user by email
    const user = await userDAO.findUserByEmail(email)
    const match = await bcrypt.compare(password, user.pwHash)
    if(match) {
      return {id:user.id, roles:user.roles}
    } else {
      return Promise.reject('wrong password')
    }
  } catch(err) {
    return Promise.reject(err)
  }
}

module.exports = {
  login
}