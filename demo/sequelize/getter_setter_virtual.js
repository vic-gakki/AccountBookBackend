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

// getter
// User.init({
//   // 假设我们想要以大写形式查看每个用户名,
//   // 即使它们在数据库本身中不一定是大写的
//   username: {
//     type: DataTypes.STRING,
//     get() {
//       const rawValue = this.getDataValue('username');
//       return rawValue ? rawValue.toUpperCase() : null;
//     }
//   }
// }, {
//   sequelize
// });
// (async () => {
//   await User.sync({force: true})
//   const user = User.build({username: 'gakki'})    
//   console.log(user.username); //GAKKI
//   console.log(user.get('username')); //GAKKI
//   console.log(user.getDataValue('username')); //gakki
// })()

// setter
function hash(value){
  return 'hash' + value
}
User.init({
  username: DataTypes.STRING,
  password: {
    type: DataTypes.STRING,
    set(value) {
      // 在数据库中以明文形式存储密码是很糟糕的.
      // 使用适当的哈希函数来加密哈希值更好.
      // 可以通过this获取其他字段的值
      this.setDataValue('password', hash(value));
    }
  }
}, {
  sequelize
});
(async () => {
  // await User.sync({force: true})
  // const user = User.build({username: 'gakki', password: '123456'})    
  // console.log(user.password); //hash123456
  // console.log(user.get('password')); //hash123456
  // console.log(user.getDataValue('password')); //hash123456

  const users = await User.findAll({raw: true})
  console.log(users)
})()