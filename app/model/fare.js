const {Model, DataTypes} = require('sequelize')
const {
  sequelize
} = require('../../core/db')
const {
  encapsulatePageResult
} = require('../../utils')
class FareCategory extends Model{
  static async updatefareCategory(id, name){
    try {
      if(id){
        return await this.update({
          name
        }, {
          where: {id}
        })
      }else {
        return await this.create({
          name
        })
      }
    }catch(e){
      console.log(e)
    }
  }
  static async getFareCategoryList(params){
    let {page = 0, pageSize = 10} = params
    page = +page
    pageSize = +pageSize
    const res = await this.findAndCountAll({
      order: [
        ['id']
      ],
      limit: pageSize,
      offset: page * pageSize
    })
    return encapsulatePageResult({
      data: res,
      page,
      pageSize
    })
  }
  static async deleteFareCategory(id){
    await this.destroy({
      where: {
        id
      }
    })
  }
}
FareCategory.init({
  name: {
    type: DataTypes.STRING,
  },
}, {
  sequelize
})
// FareCategory.sync({force: false})
module.exports = {
  FareCategory
}