const Todo = require('../models/todo.model.js');
const responseHandler = require('../helpers/responseHandler');
/**
 * @method post
 * @body { page: int, limit: int}
 **/
exports.list = async (req, res) => {
    const todos = await Todo.list(req.query);
    responseHandler.send(res, todos, 'OK', 'BAD_REQUEST')
}

exports.createTodo = async (req, res) => {
    const todo = await Todo.createTodo(req.body);
    responseHandler.send(res, todo, 'OK', 'BAD_REQUEST')
}

exports.updateTodo = async (req, res) => {
    const todo = await Todo.updateTodo(req.params.id, req.body);
    responseHandler.send(res, todo, 'OK', 'BAD_REQUEST')
}

exports.get = async (req, res) => {
    const todos = await Todo.get(req.params.id);
    responseHandler.send(res, todos, 'OK', 'BAD_REQUEST')
}

exports.deleteTodo = async (req, res) => {
    const todo = await Todo.deleteTodo(req.params.id, req.body);
    responseHandler.send(res, todo, 'OK', 'BAD_REQUEST')
}

exports.bulkCreate = async (req, res) => {
    const todos = await Todo.bulkCreate(req.body);
    responseHandler.send(res, todos, 'OK', 'BAD_REQUEST')
}



