'use strict'

const Joi = require('joi')
const ObjectId = require('joi-objectid')(Joi)
// User validation rules
module.exports = {
  create: Joi.object({
      name: Joi.string().max(250).required(),
    }) 
}
