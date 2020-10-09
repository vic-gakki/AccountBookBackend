const {sign} = require('jsonwebtoken')
const {
  key,
  expiresIn
} = require('../config/config').token
function generateToken(uid, scope){
  return sign({
    uid,
    scope
  }, key, {
    expiresIn
  })
}
module.exports = {
  generateToken
}