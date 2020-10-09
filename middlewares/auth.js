const auth = require('basic-auth')
const {
  verify,
  TokenExpiredError
} = require('jsonwebtoken')
const {
  AuthFail,
  Forbidden
} = require('../core/http-exception')
const {
  key
} = require('../config/config').token
const {
  NORMAL_USER
} = require('../core/enum').userLevel
class Auth {
  constructor(scope = NORMAL_USER){
    this.scope = scope
  }
  get m(){
    return async (ctx, next) => {
      const basicAuthToken = auth(ctx.req)
      let tokenPayload
      if(!basicAuthToken || !basicAuthToken.name){
        throw new AuthFail('token不存在', 40101)
      }
      try {
        tokenPayload = verify(basicAuthToken.name, key)
      }catch(e){
        if(e instanceof TokenExpiredError){
          throw new AuthFail('token已失效', 40116)
        }
        throw new AuthFail('token不合法', 40108)
      }
      if(tokenPayload.scope < this.scope){
        throw new Forbidden()
      }
      ctx.auth = {
        ...tokenPayload
      }
      await next()
    }
  }
}
module.exports = {
  Auth
}