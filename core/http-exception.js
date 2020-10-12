class HttpException extends Error {
  constructor(errorMessage = '', errorCode = 10000, statusCode = 400){
    super()
    this.statusCode = statusCode
    this.errorCode = errorCode
    this.errorMessage = errorMessage
  }
}
class ParameterException extends HttpException {
  constructor(errorMessage = '参数错误', errorCode = 1000, statusCode = 400){
    super(errorMessage, errorCode, statusCode)
  }
}
class NotFound extends HttpException {
  constructor(errorMessage = '资源未找到', errorCode = 40000, statusCode = 404){
    super(errorMessage, errorCode, statusCode)
  }
}
class AuthFail extends HttpException {
  constructor(errorMessage = '授权失败', errorCode = 40100, statusCode = 401){
    super(errorMessage, errorCode, statusCode)
  }
}
class Success extends HttpException {
  constructor(data = {}, errorMessage = '操作成功', errorCode = 0, statusCode = 200){
    super(errorMessage, errorCode, statusCode)
    this.data = data
  }
}
class Forbidden extends HttpException {
  constructor(errorMessage = '权限不足，禁止访问', errorCode = 40300, statusCode = 403){
    super(errorMessage, errorCode, statusCode)
  }
}
module.exports = {
  HttpException,
  ParameterException,
  NotFound,
  AuthFail,
  Forbidden,
  Success
}