const koa = require('koa')
const cors = require('koa-cors')
const parser = require('koa-bodyparser')
const json = require('koa-json')
const {InitManager} = require('./core/init')
const errorHandle = require('./middlewares/error-handler')
const app = new koa()
// 解决跨域问题
app.use(cors({
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'OPTIONS']
})) 
// 解析post请求参数  
app.use(parser())
app.use(json())
app.use(errorHandle)
InitManager.initCore(app)

module.exports = app;