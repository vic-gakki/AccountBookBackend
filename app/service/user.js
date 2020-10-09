const {
  User
} = require('../model/user')
const {
  generateToken
} = require('../../core/util')
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
}
module.exports = {
  UserService
}