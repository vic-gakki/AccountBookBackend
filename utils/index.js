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
module.exports = {
  generateToken,
  encapsulatePageResult
}