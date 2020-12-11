const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('查询商品')
})

router.post('/', (req, res) => {
  const { title, price, img, brand, address } = req.body
  // 连接mongoDB服务器
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://localhost:27017/myshop', { useNewUrlParser: true, useUnifiedTopology: true})

  // 创建model
  const Product = mongoose.model('product', {
    title: String,
    price: Number,
    img: String,
    brand: String,
    address: String,
    createdAt: Number
  })

  // 创建实例
  const myProduct = new Product({
    title, price, img, brand, address,
    createdAt: Date.now()
  })
  
  // save方法保存实例
  myProduct.save().then(successData => {
    res.json({
      code: 200,
      data: successData
    })
  }).catch(err => {
    res.json({
      code:400,
      data:err
    })
  })
})

router.put('/', (req, res) => {
  res.send('修改商品')
})

router.delete('/', (req, res) => {
  res.send('删除商品')
})
module.exports = router