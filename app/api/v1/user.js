const Router = require('koa-router')
const {
  UserService
} = require('../../service/user')
const {
  UserValidator,
  RegisterValidator
} = require('../../validator/validator')
const {
  Success
} = require('../../../core/http-exception')
const {
  Auth
} = require('../../../middlewares/auth')
const router = new Router({
  prefix: '/v1/user'
})
router.post('/register', async (ctx, next) => {
  const v = await new RegisterValidator().validate(ctx)
  const res = await UserService.createUser(v.get('body.username'), v.get('body.password'))
  throw new Success({}, '注册成功')
})
router.post('/login', async (ctx, next) => {
  const v = await new UserValidator().validate(ctx)
  const token = await UserService.verifyUser(v.get('body.username'), v.get('body.password'))
  throw new Success({
    token
  }, '登录成功')
})
router.get('/info', new Auth().m, async (ctx, next) => {
  throw new Success({
    roles: ['admin']
  }, '获取用户角色：ok')
})

module.exports = router