const mongoose = require('mongoose')

// 定义product的Schema数据结构
const productsSchema = new mongoose.Schema({
  title: String,
  price: Number,
  img: String,
  brand: String,
  address: String,
  createdAt: Number
})

const productsModel = mongoose.model('product', productsSchema)

// 定义用户登录信息的Schema
const usersSchema = new mongoose.Schema({
  username: String,
  password: String
})

const usersModel = mongoose.model('user', usersSchema)


module.exports = {
  productsModel,
  usersModel
}