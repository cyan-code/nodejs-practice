const express = require('express')
const app = express()

const productsRouter = require('./routes/products')

app.use('/api/v1/products', productsRouter)

app.listen(9527, () => {
  console.log('server running at http://localhost:9527')
})