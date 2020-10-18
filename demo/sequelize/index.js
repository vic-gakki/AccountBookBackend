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