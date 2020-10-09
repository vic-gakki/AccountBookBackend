const {Model, DataTypes} = require('sequelize')
const Bcrypt = require('bcryptjs')
const {
  NotFound,
  AuthFail
} = require('../../core/http-exception')
const {
  sequelize
} = require('../../core/db')
class User extends Model{
  static async createUser(nickname, password){
    return await this.create({
      nickname,
      password
    })
  }
  static async verifyUser(nickname, password){
    const user = await this.findOne({
      where: {
        nickname
      }
    })
    if(!user){
      throw new NotFound('账户不存在')
    }
    const isPwdRight = Bcrypt.compareSync(password, user.password)
    if(!isPwdRight){
      throw new AuthFail('密码不正确')
    }
    return user
  }
}
User.init({
  nickname: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    set(val){
      const salt = Bcrypt.genSaltSync(10)
      val = Bcrypt.hashSync(val, salt)
      this.setDataValue('password', val)
    }
  }
}, {
  sequelize
})
module.exports = {
  User
}