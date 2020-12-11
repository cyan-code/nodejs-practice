const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('查询商品')
})

router.post('/', (req, res) => {
  res.send('新增商品')
})

router.put('/', (req, res) => {
  res.send('修改商品')
})

router.delete('/', (req, res) => {
  res.send('删除商品')
})
module.exports = router