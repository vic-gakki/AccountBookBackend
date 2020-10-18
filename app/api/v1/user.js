const Router = require('koa-router')
const {
  UserService
} = require('../../service/user')
const { Op } = require("sequelize");
const {
  UserValidator,
  RegisterValidator,
  UserUpdateValidator
} = require('../../validator/validator')
const {
  Success
} = require('../../../core/http-exception')
const {
  Auth
} = require('../../../middlewares/auth')
const {
  userLevel
} = require('../../../core/enum')
const router = new Router({
  prefix: '/v1/user'
})
router.post('/register', async (ctx, next) => {
  const v = await new RegisterValidator().validate(ctx)
  console.log(v.get('body.username'))
  const res = await UserService.createUser(v.get('body.username'), v.get('body.password'))
  throw new Success({}, '注册成功')
})
router.post('/updatePass', new Auth().m, async (ctx, next) => {
  const v = await new UserUpdateValidator().validate(ctx)
  console.log(v.get('body.username'))
  const res = await UserService.updatePass(ctx.auth.uid, v.get("body.oldPassword"), v.get('body.newPassword'))
  throw new Success({}, '修改成功')
})
router.post('/login', async (ctx, next) => {
  const v = await new UserValidator().validate(ctx)
  const token = await UserService.verifyUser(v.get('body.username'), v.get('body.password'))
  throw new Success({
    token
  }, '登录成功')
})
router.post('/info', new Auth().m, async (ctx, next) => {
  const user = await UserService.findUser({where: {id: ctx.auth.uid}}, 'one')
  throw new Success({
    roles: [userLevel[user.role]],
    name: user.nickname
  }, '获取用户角色：ok')
})
router.post('/list', new Auth().m, async (ctx, next) => {
  const users = await UserService.findUser({ where: {
    id: {
      [Op.not]: ctx.auth.uid
    }
  }, attributes: ['id', ['nickname', 'name']]}, 'all')
  throw new Success({
    list: users
  }, '获取用户列表成功')
})
router.post('/logout', new Auth().m, async (ctx, next) => {
  throw new Success({
  }, '登出成功')
})

module.exports = router