function profile(req, res, next) {
  // check if the user has sufficient privileges
  // ...

  // if the user has the privilege,
  res.json(req.session)
} 

module.exports = {
  profile
}