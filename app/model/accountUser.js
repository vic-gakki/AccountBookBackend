const {Model, DataTypes} = require('sequelize')
const {
  sequelize
} = require('../../core/db')
class AccountUser extends Model {}
AccountUser.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  sequelize
})
module.exports =  {
  AccountUser
}