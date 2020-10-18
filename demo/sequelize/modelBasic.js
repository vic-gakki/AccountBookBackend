const {Sequelize, Model, Op, DataTypes} = require('sequelize')
const {
  user,
  password,
  port,
  host,
} = (require('../../config/config')).db
const sequelize = new Sequelize('sequelizeDemo', user, password, {
  host,
  port,
  dialect: 'mysql',
  timezone: '+08:00',
  logging: (msg) => {
    console.log(msg)
  },
  define: {
    paranoid: true,
    scopes: {

    }
  }
})
class User extends Model {}
User.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
  }
}, {
  sequelize
})
User.sync({force: true})
console.log(User === sequelize.models.User)