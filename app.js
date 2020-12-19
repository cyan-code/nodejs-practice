const express = require('express')
const app = express()

// 连接mongoDB服务器
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/myshop', { useNewUrlParser: true, useUnifiedTopology: true})

// 使用中间件，否则获取req.body会报错
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 商品查询的路由
const productsRouter = require('./routes/products')
app.use('/api/v1/products', productsRouter)

// 新增用户登录信息
const usersRouter = require('./routes/users')
app.use('/api/v1/users', usersRouter)

// 验证用户登录
const sessionsRouter = require('./routes/sessions')
app.use('/api/v1/sessions', sessionsRouter)

app.listen(9527, () => {
  console.log('server running at http://localhost:9527')
})