const express = require('express')
const router = express.Router()
exports.router = router
const authenticate = require('../middleware/authenticate')
const authController = require('../controller/auth')
const profileController = require('../controller/profile')


// 3. create an unprotected login endpoint
router.post('/login', authController.login)

// 4. plug in another middleware that will check if the user is authenticated or not
// all requests that are plugged in after this middleware will only be accessible if the user is logged in
router.use(authenticate)

// 5. plug in all routes that the user can only access if logged in
router.get('/profile', profileController.profile)


module.exports = router