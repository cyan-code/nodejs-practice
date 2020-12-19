const express = require('express')
const router = express.Router()
const { usersModel } = require('../models/index')

router.post('/', (request, response) => {
  const { username, password } = request.body
  new usersModel({username, password}).save().then(successData => {
    response.json({
      code: 200,
      data:successData
    })
  }).catch(err => {
    response.json({
      code: 400,
      data: err.message
    })
  })
})

module.exports = router
