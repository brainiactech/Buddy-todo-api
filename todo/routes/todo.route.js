
'use strict'

const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todo.controller')
const validation = require('../middlewares/validation')
const todoSchema = require('../validations/todo.validation')

router.get('/list', todoController.list)
router.post('/create', validation(todoSchema.create, 'body'), todoController.createTodo)
router.post('/bulk-create', todoController.bulkCreate)
router.patch('/edit/:id', validation(todoSchema.edit, 'body'), todoController.updateTodo)
router.delete('/remove/:id', validation(todoSchema.delete, 'body'), todoController.deleteTodo)
router.get('/get/:id', todoController.get)

module.exports = router
