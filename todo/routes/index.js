'use strict'
const express = require('express')
const router = express.Router()
const userRouter = require('./todo.route')
const errors = require('../middlewares/error-handler')

router.use('/todo', userRouter) // mount todo paths

router.use(errors.handleNotFound)
module.exports = router
