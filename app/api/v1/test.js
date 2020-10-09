const koaRouter = require('koa-router')
const {HttpException} = require('../../../core/http-exception')
const router = new koaRouter({
  prefix: '/test'
})
router.get('/', async (ctx, next) => {
  throw new Error()
  ctx.body = 'hello koa test'
})
module.exports = router