const express = require('express')
const router = express.Router()
const { usersModel } = require('../models/index')
const bcrypt = require('bcrypt')

router.post('/', (request, response) => {
  // 获取post用户名密码
  const {username, password } = request.body
  // 判断用户名是否存在
  usersModel.findOne({username}).then(success => {
    // 有用户名
    const encryptedPwdFromDB = success.password // 从数据库中得到的经加密的密码
    if (success) {
      bcrypt.compare(password, encryptedPwdFromDB, function (err, res) {
        if (err) { // 密码比对不正确
          response.json({
            code: 400,
            data: {
              ...err.message,
              msg: '密码比对不正确'
            }
          })
        }
        if (res) { // 密码正确，返回Token等数据
          const fakeToken = Date.now() //模拟一个token
          response.json({
            code: 200,
            data: {
              vaild: true,
              userInfo: {
                username,
                token: fakeToken
              }
            }
          })
        }
      })
    }
  })
  .catch(err => {
    // 没有用户名
    response.json({
      code: 400,
      data: {
        ...err.message,
        msg: '获取用户名失败'
      }
    })
  })
})

module.exports = router