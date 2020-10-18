const path = require('path')
const koa = require('koa')
const cors = require('koa-cors')
const parser = require('koa-bodyparser')
const busboy = require('koa-busboy')
const {InitManager} = require('./core/init')
const errorHandle = require('./middlewares/error-handler')
const {sequelize} = require('./core/db')
sequelize.sync({alter: true})
const app = new koa()
// 解决跨域问题
app.use(cors()) 
// 解析post请求参数  
app.use(parser())
app.use(busboy({
  dest: path.resolve(__dirname, './public'),
}))
app.use(errorHandle)
InitManager.initCore(app)

app.listen(3000)