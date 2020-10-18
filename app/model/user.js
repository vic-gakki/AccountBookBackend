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
    this.validatePass(password, user.password)
    return user
  }
  static async findUser(condition, type){
    type = type.slice(0, 1).toUpperCase() + type.slice(1)
    const user = await this['find' + type](condition)
    return user
  }
  static validatePass(passin, exsit){
    const isPwdRight = Bcrypt.compareSync(passin, exsit)
    if(!isPwdRight){
      throw new AuthFail('密码不正确')
    }
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
  },
  role: {
    type: DataTypes.INTEGER                     ,
    allowNull: true,
    defaultValue: 8
  },
}, {
  sequelize
})
module.exports = {
  User
}