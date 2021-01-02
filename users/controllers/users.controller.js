const User = require('../models/user.model.js');
const responseHandler = require('../helpers/responseHandler');
/**
 * @method post
 * @body { page: int, limit: int}
 **/
exports.list = async (req, res) => {
    const users = await User.list(req.query);
    responseHandler.send(res, users, 'OK', 'BAD_REQUEST')
}

exports.get = async (req, res) => {
    const users = await User.get(req.params.id);
    responseHandler.send(res, users, 'OK', 'BAD_REQUEST')
}

exports.createUser = async (req, res) => {
    const user = await User.createUser(req.body);
    responseHandler.send(res, user, 'OK', 'BAD_REQUEST')
}

exports.updateUser = async (req, res) => {
    const user = await User.updateUser(req.params.id, req.body);
    responseHandler.send(res, user, 'OK', 'BAD_REQUEST')
}

exports.deleteUser = async (req, res) => {
    const user = await User.deleteUser(req.params.id);
    responseHandler.send(res, user, 'OK', 'BAD_REQUEST')
}

exports.bulkCreate = async (req, res) => {
    const users = await User.bulkCreate(req.body);
    responseHandler.send(res, users, 'OK', 'BAD_REQUEST')
}




