const express = require('express')
const router = express.Router()
const { usersModel } = require('../models/index')
const bcrypt = require('bcrypt') // bcrypt用于加密密码的插件

router.post('/', (request, response) => {
  const { username, password } = request.body
  
  // 通过bcrypt加密密码
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      response.json({
        code: 400,
        data: {
          ...err.message,
          msg: '加密失败'
        }
      })
      return
    }
    // 注意这里是将hash赋值给password，而不是直接写hash
    new usersModel({username, password: hash}).save().then(successData => {
      response.json({
        code: 200,
        data: {
          msg: '用户名和密码存储成功'
        }
      })
    }).catch(err => {
      response.json({
        code: 400,
        data: {
          ...err.message,
          msg: '存储数据失败'
        }
      })
    })
  })
})

module.exports = router
