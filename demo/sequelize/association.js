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
    timestamps: false,
    scopes: {

    }
  }
})

// 1
// const Ship = sequelize.define('ship', {
//   name: DataTypes.TEXT,
//   crewCapacity: DataTypes.INTEGER,
//   amountOfSails: DataTypes.INTEGER
// }, { timestamps: false });
// const Captain = sequelize.define('captain', {
//   name: DataTypes.TEXT,
//   skillLevel: {
//     type: DataTypes.INTEGER,
//     validate: { min: 1, max: 10 }
//   }
// }, { timestamps: false });
// Captain.hasOne(Ship);
// Ship.belongsTo(Captain);

// (async () => {
  // await sequelize.sync({force: true})

  // lazy loading
  // const cap = await Captain.findOne({
  //   where: {
  //     name: 'jack'
  //   }
  // })
  // console.log('Name:', cap.name);
  // console.log('Skill Level:', cap.skillLevel);
  // const hisShip = await cap.getShip();
  // // Do stuff with the ship
  // console.log('Ship Name:', hisShip.name);
  // console.log('Amount of Sails:', hisShip.amountOfSails);

  // eager loading
  // const awesomeCaptain = await Captain.findOne({
  //   where: {
  //     name: "jack"
  //   },
  //   include: Ship
  // });
  // // Now the ship comes with it
  // console.log('Name:', awesomeCaptain.name);
  // console.log('Skill Level:', awesomeCaptain.skillLevel);
  // console.log('Ship Name:', awesomeCaptain.ship.name);
  // console.log('Amount of Sails:', awesomeCaptain.ship.amountOfSails);
  // console.log(awesomeCaptain.toJSON());
// })()



// 2 别名定义关联多次
class Mail extends Model{}
Mail.init({
  content: DataTypes.STRING
}, {
  sequelize,
})
class Person extends Model{}
Person.init({
  name: DataTypes.STRING,
  age: DataTypes.INTEGER,
  gender: {
    type: DataTypes.ENUM('男', '女'),
    defaultValue: '男'
  }
}, {
  sequelize,
})

// Person.hasMany(Mail)
Mail.belongsTo(Person, {as: 'sender'});
Mail.belongsTo(Person, {as: 'receiver'});
// sequelize.sync({force: true})
(async () => {

  // const mail = await Mail.findByPk(1)
  // console.log((await mail.getSender()).toJSON())
  // console.log((await mail.getReceiver()).toJSON())


  const mail = await Mail.findOne({where: {id: 1}, include: ['sender', 'receiver']})
  console.log(mail.toJSON())

})()
