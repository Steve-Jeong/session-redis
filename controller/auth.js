function login(req, res) {
  const { email, password } = req.body

  // perform payload validation
  // in prod, always use a validation library like joi
  // for this turorial, we only do basic validation
  if(!email || !password) {
    return res.status(400).json('Bad request params - you need to provide an email and a password')
  }

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