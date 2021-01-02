'use strict'
const express = require('express')
const router = express.Router()
const userRouter = require('./user.route')
const errors = require('../middlewares/error-handler')

router.use('/users', userRouter) // mount user paths

router.use(errors.handleNotFound)
module.exports = router
