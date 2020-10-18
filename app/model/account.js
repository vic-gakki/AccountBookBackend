const {Model, DataTypes, where, Op} = require('sequelize')
const moment = require('moment')
const {
  sequelize
} = require('../../core/db')
const {
  encapsulatePageResult,
  generateTimeClause
} = require('../../utils')
const {User} = require('./user')
const {FareCategory} = require('./fare')
const {AccountUser} = require('./accountUser')
const { param } = require('../api/v1/account')
class AccountBook extends Model{
  static async updateFareRecord(params, involved, id){
    let record
    if(id){
      record = await this.findByPk(id)
      record.update(params)
    }else {
      record = await this.create(params)
    }
    involved = await User.findAll({where: {id: involved}})
    record.setParticipate(involved)
  }
  static async fetchAccountList(params, id){
    let {page = 0, pageSize = 10} = params
    let where = {creatorId: id}
    if(params.startTime && params.endTime){
      where = {
        ...where,
        payTime: {[Op.between]: [params.startTime, params.endTime]}
      }
    }
    page = +page
    pageSize = +pageSize
    const count = await this.count({where})
    const rows = await this.findAll({
      where,
      order: [
        ['payTime', 'DESC']
      ],
      limit: pageSize,
      offset: page * pageSize,
      include: [FareCategory, {model: User, as: 'participate', attributes: ['id', 'nickname'], through: {attributes: []}}]
    })
    return encapsulatePageResult({
      data: {count, rows},
      page,
      pageSize
    })
  }
  static async fetchRelativeAccountList(params, id){
    let {page = 0, pageSize = 10} = params
    let where = {}
    if(params.startTime && params.endTime){
      where = {
        payTime: {[Op.between]: [params.startTime, params.endTime]}
      }
    }
    const user = await User.findByPk(+id)
    const count = await user.countInvolved({where})
    let rows = await user.getInvolved({
      where, 
      order: [
        ['payTime', 'DESC']
      ],
      limit: pageSize,
      offset: page * pageSize,
      include: [
        FareCategory, 
        {model: User, as: 'creator', attributes: ['id', 'nickname'],}, 
        {model: User, as: 'participate', attributes: ['id', 'nickname']}
      ]
    })
    rows.forEach(row => {
      delete row.dataValues.AccountUser
    })
    return encapsulatePageResult({
      data: {count, rows},
      page,
      pageSize
    })
  }
  static async fetchStatistics(params, id){
    let where = {...generateTimeClause(params, 'payTime')}
    const all = await AccountBook.findAll({
      where,
      include: [
        {model: User, as: 'participate', attributes: ['id', 'nickname'], through: {attributes: []}}
      ]
    })
    const users = await User.findAll()
    return {
      all, users
    }
  }
  static async deleteAccount(id){
    return await this.destroy({
      where: {
        id
      }
    })
  }
}
AccountBook.init({
  payTime: {
    type: DataTypes.DATE,
    get(){
     return moment(this.getDataValue('payTime')).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  fareAmount: {
    type: DataTypes.FLOAT(2),
  },
  fareNote: {
    type: DataTypes.STRING
  },
  isDone: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  sequelize
})

AccountBook.belongsTo(FareCategory, {foreignKey: 'fareCategoryId'})
FareCategory.hasMany(AccountBook, {foreignKey: 'fareCategoryId'})

AccountBook.belongsTo(User, {as: 'creator'})
User.hasMany(AccountBook, {foreignKey: 'creatorId'})

AccountBook.belongsToMany(User, {as: 'participate', through: AccountUser})
User.belongsToMany(AccountBook, {as: 'involved', through: AccountUser})
module.exports = {
  AccountBook
}