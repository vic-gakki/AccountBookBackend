const {sign} = require('jsonwebtoken')
const moment = require('moment')
const {Op} = require('sequelize')
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
function encapsulatePageResult({data, page, pageSize}){
  // let offset = page * pageSize
  // data.rows.forEach((item, index) => {
  //   item.index = offset + index
  // })
  return {
    list: data.rows,
    page: {
      count: data.count,
      current: page + 1,
      pageSize: pageSize
    }
  }
}
function containEndTime(params){
  if(params.endTime){
    let time = moment(params.endTime)
    params.endTime = time.date(time.date() + 1).format('YYYY-MM-DD')
  }
}
function generateTimeClause(params, field){
  let res = {}, {startTime, endTime} = params
  if(startTime && endTime){
    res[field] = {[Op.between]: [startTime, endTime]}
  }
  return res
}
module.exports = {
  generateToken,
  encapsulatePageResult,
  containEndTime,
  generateTimeClause
}