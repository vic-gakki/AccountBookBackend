const {HttpException, Success} = require('../core/http-exception')
const isDev = process.env.NODE_ENV === 'development'
async function errorHandle (ctx, next){
  try{
    await next()
  }catch(e){
    let res = {
      msg: isDev ? e : `啊哦~服务器跑向远方了~`,
      errorCode: 999
    }, statusCode = 500
    if(e instanceof HttpException){
      res.msg = e.errorMessage
      res.errorCode = e.errorCode
      statusCode = e.statusCode
    }
    if(e instanceof Success){
      res.data = e.data
    }else {
      res.request = `${ctx.method} ${ctx.path}`
    }
    ctx.body = res
    ctx.status = statusCode
  }
}
module.exports = errorHandle