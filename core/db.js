const {Sequelize} = require('sequelize')
const {
  user,
  password,
  port,
  host,
  database
} = (require('../config/config')).db
const sequelize = new Sequelize(database, user, password, {
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
sequelize.sync()
module.exports = {
  sequelize
}