const {
  LinValidator,
  Rule
} = require('../../core/validator')
const {
  User
} = require('../model/user')

class UserValidator extends LinValidator{
  constructor(){
    super()
    this.username = [
      new Rule('isLength', '用户名不能为空', {
        min: 1
      })
    ]
    this.password = [
      new Rule('isLength', '密码不能为空', {
        min: 1
      }),
      // 校验密码强度，用于注册
      // new Rule('matches', '密码强度过弱，需要包含字母，数字和特殊字符中的两种', /^(?![a-zA-Z]+$)(?!\d+$)(?![!@#$%^%&*_]+$)[a-zA-Z\d!@#$%^&*_]+$/)
    ]
  }
}
class UserUpdateValidator extends LinValidator {
  constructor(){
    super()
    this.oldPassword = [
      new Rule('isLength', '原始密码不能为空', {
        min: 1
      })
    ]
    this.newPassword = [
      new Rule('isLength', '密码不能为空', {
        min: 1
      }),
      new Rule('matches', '密码强度过弱，需要包含字母，数字和特殊字符中的两种', /^(?![a-zA-Z]+$)(?!\d+$)(?![!@#$%^%&*_]+$)[a-zA-Z\d!@#$%^&*_]+$/)
    ]
    this.confirmpassword = this.newPassword
    
  }
  validateConfirm(ctx){
    if(ctx.body.newPassword !== ctx.body.confirmpassword){
      throw new Error('两次密码不一致')
    }
  }
}
class RegisterValidator extends UserValidator{
  constructor(){
    super()
    this.confirm = this.password
  }
  validateConfirm(ctx){
    if(ctx.body.password !== ctx.body.confirm){
      throw new Error('两次密码不一致')
    }
  }
  async validateExsit(ctx){
    const user = await User.findOne({
      where: {
        nickname: ctx.body.username
      }
    })
    if(user){
      throw new Error('用户名已存在')
    }
  }
}
module.exports = {
  UserValidator,
  RegisterValidator,
  UserUpdateValidator
}