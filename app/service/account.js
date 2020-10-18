const {
  AccountBook
} = require('../model/account')

class AccountService {
  static async fetchStatistics(params, id){
    const {all, users} = await AccountBook.fetchStatistics(params, id)
    // 获取所有账单，遍历计算记录每笔账单平摊费用
    let userMap = users.reduce((acc, cur) => {
      acc[cur.id] = {
        name: cur.nickname, 
        expense: 0, 
        average: 0
      }
      return acc
    }, {})
    all.forEach(({dataValues}) => {
      let {participate, fareAmount, creatorId} = dataValues
      let average = fareAmount / (participate.length + 1)
      userMap[creatorId].expense += fareAmount
      userMap[creatorId].average += average
      participate.forEach(user => {
        userMap[user.id].average += average
      })
    })
    let outArr = [], inArr = []
    for(let user of Object.entries(userMap)){
      let [id, value] = user
      let outInGap = value.expense - value.average
      let temp = {id, name: value.name, amount: outInGap};
      (outInGap > 0 ? inArr : outInGap < 0 ? outArr : []).push(temp)
    }
    for(let i = 0; i < inArr.length; i++){
      let inUser = inArr[i], inAmount = inUser.amount
      inUser.take = []
      for(let j = 0; j < outArr.length; j++){
        let outUser = outArr[j], outAmount = outUser.amount
        inAmount += outAmount
        if(inAmount > 0){
          inUser.take.push({id: outUser.id, name: outUser.name, given: -outAmount})
          outArr.splice(j, 1)
          j--
        }else {
          let partial = inAmount - outAmount
          inUser.take.push({id: outUser.id, name: outUser.name, given: partial})
          outUser.amount += partial
          break
        }
      }
    }
    return {statistics: userMap, plan: inArr}
  }
}
module.exports = {
  AccountService
}