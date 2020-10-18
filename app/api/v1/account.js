const Router = require('koa-router')
const {
  AccountBook
} = require('../../model/account')
const {
  AccountService
} = require('../../service/account')
const {
  NameValidator,
  PostFareValidator
} = require('../../validator/validator')
const {
  Success
} = require('../../../core/http-exception')
const {
  Auth
} = require('../../../middlewares/auth')
const {
  containEndTime
} = require('../../../utils')
const moment = require('moment')
const router = new Router({
  prefix: '/v1/account'
})
router.post('/postFare', new Auth().m, async (ctx, next) => {
  const v = await new PostFareValidator().validate(ctx)
  let params = ctx.request.body, recordId = +params.id, involved = JSON.parse(params.memberInvolve).map(item => +item)
  params.creatorId = ctx.auth.uid
  params.fareCategoryId = +params.fareCategoryId
  delete params.id
  delete params.memberInvolve
  const res = await AccountBook.updateFareRecord(params, involved, recordId)
  throw new Success({}, '账单更新成功')
})
router.post('/list', new Auth().m, async (ctx, next) => {
  let params = ctx.request.body
  containEndTime(params)
  const res = await AccountBook.fetchAccountList(params, ctx.auth.uid)
  throw new Success(res, '账单获取成功')
})
router.post('/involved', new Auth().m, async (ctx, next) => {
  let params = ctx.request.body
  containEndTime(params)
  const res = await AccountBook.fetchRelativeAccountList(params, ctx.auth.uid)
  throw new Success(res, '账单获取成功')
})
router.post('/statistics', new Auth().m, async (ctx, next) => {
  let params = ctx.request.body
  containEndTime(params)
  const res = await AccountService.fetchStatistics(params, ctx.auth.uid)
  throw new Success(res, '账单获取成功')
})
router.post('/delete', new Auth().m, async (ctx, next) => {
  const v = await new NameValidator('id').validate(ctx)
  const res = await AccountBook.deleteAccount(v.get('body.id'))
  throw new Success(res, '账单获取成功')
})

module.exports = router