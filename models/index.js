const mongoose = require('mongoose')

// 定义Schema数据结构
const productsSchema = new mongoose.Schema({
  title: String,
  price: Number,
  img: String,
  brand: String,
  address: String,
  createdAt: Number
})

const productsModel = mongoose.model('product', productsSchema)

module.exports = {
  productsModel
}