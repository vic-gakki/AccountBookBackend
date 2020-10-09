const koaRouter = require('koa-router')
const requireDirectory = require('require-directory')
class InitManager {
  static initCore(app){
    InitManager.app = app
    this.initEnv()
    this.initRoutes()
  }
  static initEnv(path = ''){
    path = path || process.cwd() + '/config/config.js'
    const config = require(path)
    global.config = config
  }
  static initRoutes(path = ''){
    function whenModuleLoad(module){
      if(module instanceof koaRouter){
        InitManager.app.use(module.routes())
      }
    }
    path = path || `${process.cwd()}/app/api`
    requireDirectory(module, path, {
      visit: whenModuleLoad
    })
  }
}
module.exports = {
  InitManager
}