function login(req, res) {
  const { email, password } = req.body

  // check if the credentials are correct
  // ...

  // if that credentials are correct
  req.session.clientId = 'abc123'
  req.session.myNum = 5

  res.json('you are now logged in')
}

module.exports = {
  login,
}