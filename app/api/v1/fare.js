const Router = require('koa-router')
const {
  FareCategory
} = require('../../model/fare')
const {
  NameValidator,
} = require('../../validator/validator')
const {
  Success
} = require('../../../core/http-exception')
const {
  Auth
} = require('../../../middlewares/auth')
const router = new Router({
  prefix: '/v1/fare'
})
router.post('/category', new Auth().m, async (ctx, next) => {
  const v = await new NameValidator('name').validate(ctx)
  const res = await FareCategory.updatefareCategory(ctx.request.body.id, v.get('body.name'))
  throw new Success()
})
router.post('/list', new Auth().m, async (ctx, next) => {
  const res = await FareCategory.getFareCategoryList(ctx.request.body)
  throw new Success(res)
})
router.post('/delete', new Auth().m, async (ctx, next) => {
  const v = await new NameValidator('id').validate(ctx)
  const res = await FareCategory.deleteFareCategory(v.get('body.id'))
  throw new Success(res)
})

module.exports = router