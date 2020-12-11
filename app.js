const express = require('express')
const app = express()

// 使用中间件
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


const productsRouter = require('./routes/products')
app.use('/api/v1/products', productsRouter)

app.listen(9527, () => {
  console.log('server running at http://localhost:9527')
})