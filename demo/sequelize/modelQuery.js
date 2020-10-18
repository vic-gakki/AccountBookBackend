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
  await sequelize.sync({alter: true})
  // await User.create({
  //   name: 'gakki',
  //   age: 32,
  //   cash: 100
  // })
  // await User.create({
  //   name: 'xxv',
  //   age: 24,
  //   cash: 10
  // })

  // attributes
  // const users = await User.findAll({
  //   attributes: [
  //     'name', 'cash',
  //     // 使用聚合函数时,必须为它提供一个别名,以便能够从模型中访问它.
  //     [Sequelize.fn('COUNT', Sequelize.col('age')), 'test_age']
  //   ]
  // })
  
  // order
  // const users = await User.findAll({
  //   // order: [['name', 'DESC']]  name降序
  //   // order: [Sequelize.fn('max', Sequelize.col('age'))] 按照最大年龄升序排序
  //   order: sequelize.col('age'),
  // })


  // const users = await User.max('age')
  const users = await User.max('age', { where: { age: { [Op.lt]: 20 } } }); 

  console.log(JSON.stringify(users, null, 2))
})()