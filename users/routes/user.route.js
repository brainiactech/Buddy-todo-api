
'use strict'

const express = require('express')
const router = express.Router()
const userController = require('../controllers/users.controller')
const validation = require('../middlewares/validation')
const userSchema = require('../validations/user.validation')

router.get('/list', userController.list)
router.get('/get/:id', userController.get)
router.post('/create', validation(userSchema.create, 'body'), userController.createUser)
router.post('/bulk-create', userController.bulkCreate)
router.patch('/edit/:id', userController.updateUser)
router.delete('/remove/:id', userController.deleteUser)

module.exports = router
