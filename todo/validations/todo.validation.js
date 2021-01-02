'use strict'

const Joi = require('joi')
const ObjectId = require('joi-objectid')(Joi)
// Todo validation rules
module.exports = {
    create: Joi.object({
      description: Joi.string().max(500).required(),
      state: Joi.string().required(),
      user_id: ObjectId().required()
    }),
    edit: Joi.object({
      user_id: ObjectId().required()
    }),
    delete: Joi.object({
      user_id: ObjectId().required()
    })
}
