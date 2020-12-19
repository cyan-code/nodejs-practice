const express = require('express')
const router = express.Router()
const { productsModel } = require('../models/index.js')

router.get('/:_id?', (req, res) => {
  const { _id } = req.params
  if (_id) {
    productsModel.findById(_id).then(successData => {
      res.json({
        code: 200,
        data: successData
      }).catch(err => {
        res.json({
          code: 400,
          data: err.message
        })
      })
    })
  } else {
    // 解构赋值默认值，如果没有查询字符串返回第1页，5条数据
    const { page = 1, pageSize = 5 } = req.query 
    productsModel.find().limit(parseInt(pageSize)).skip((page - 1) * pageSize).then(successData => {
      res.json({
        code: 200,
        data: successData
      })
    }).catch(err => {
      res.json({
        code: 400,
        data: err.message
      })
    })
  }
})

router.post('/', (req, res) => {
  const { title, price, img, brand, address } = req.body


/*   // 创建model
  const Product = mongoose.model('product', {
    title: String,
    price: Number,
    img: String,
    brand: String,
    address: String,
    createdAt: Number
  }) */

  // 创建实例
  const myProduct = new productsModel({
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

// 修改update操作
router.put('/', (req, res) => {
  const {_id, title, price, img, brand, address } = req.body
  productsModel.update({ _id }, {title, price,img, brand, address, createdAt: Date.now()}).then( successData => {
    res.json({
      code: 200,
      data: {...successData, message: '更新成功！'}
    })
  }).catch(err => {
    res.json({
      code: 400,
      data: err.message
    })
  })
})

// 删除
router.delete('/:_id', (req, res) => {
  const { _id } = req.params
  productsModel.remove({ _id }).then(successData => {
    res.json({
      code: 200,
      data: { ...successData, message: '删除成功！' }
    })
  }).catch(err => {
    res.json({
      code: 400,
      data: err.message
    })
  })
})
module.exports = router