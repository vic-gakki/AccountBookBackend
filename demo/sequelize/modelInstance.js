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
  name: DataTypes.TEXT,
  favoriteColor: {
    type: DataTypes.TEXT,
    defaultValue: 'green'
  },
  age: DataTypes.INTEGER,
  cash: DataTypes.INTEGER
}, {
  sequelize
});

(async () => {
  await sequelize.sync({ force: true });
  // // 创建可以映射到数据库的数据
  // const vic = User.build({name: 'xxv'})
  // console.log(vic instanceof User); // true
  // console.log(vic.name); // xxv

  // // 保存至数据库
  // await vic.save()
  // console.log('save success')


  const gakki = await User.create({name: 'gakki'})
  // 实例记录log使用toJSON
  console.log(gakki.toJSON());
})();
