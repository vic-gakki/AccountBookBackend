class Enum {
  constructor(enumObj){
    Reflect.ownKeys(enumObj).forEach(enumItem => {
      let value = enumObj[enumItem]
      this[enumItem] = value
      this[value] = enumItem
    })
  }
}
const userLevel = new Enum({
  NORMAL_USER: 8,
  VIP_USR: 16,
  ADMIN: 24
})
module.exports = {
  userLevel
}