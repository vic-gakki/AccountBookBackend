const {
  User
} = require('../model/user')
const {
  generateToken
} = require('../../utils')
const {
  userLevel
} = require('../../core/enum')
class UserService {
  static async createUser(nickname, password){
    return await User.createUser(nickname, password)
  }
  static async verifyUser(nickname, password){
    const user = await User.verifyUser(nickname, password)
    return generateToken(user.id, userLevel.NORMAL_USER)
  }
  static async updatePass(id, old, password){
    const user = await User.findUser(id)
    User.validatePass(old, user.password)
    await user.update({
      password
    })
  }
  static async findUser(id){
    return await User.findUser(id)
  }
}
module.exports = {
  UserService
}