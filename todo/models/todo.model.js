'use strict';
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const Paginator = require('../helpers/paginator')

const stateTypes = [
  'todo',
  'done'
]

const todoSchema = new Schema(
  {
    description: {
      type: String
    },
    state: {
      type: String,
      enum: stateTypes
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'last_updated' }
  }
);

todoSchema.methods.toJSON = function () {
    var obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
  }


  todoSchema.statics = {
  async list(payload) {
    
      const payloadOptions = { page: payload.page ? payload.page : 1, limit: payload.limit ? payload.limit : 20, sort: { created_date: -1 }, offset: payload.offset ?  payload.offset : 0  }
      let todos;
      if(payload.user_id){
         todos = await this.paginate({user_id: payload.user_id}, payloadOptions )
      }else{
         todos = await this.paginate({}, payloadOptions )
      }
      
      const paginate = Paginator.build(todos);
      
    if (todos.docs) {
      return {
        success: true,
        message: 'Todo successfully retrieved',
        data: {
          todos: todos && todos.docs,
          pagination: paginate,
        }
      };
    } else {
      return {
        success: true,
        message: `Error retrieving todo list`,
        data: []
      };
    }

  },
  async get(id) {
    let todo = await this.findOne({ _id: id }).lean().exec();

    if (todo) {
      return {
        success: true,
        message: 'todo successfully retrieved',
        data: todo
      };
    } else {
      return {
        success: true,
        message: `Error retrieving todo`
      };
    }
  },
  async createTodo(payload) {
    const { description, state, user_id } = payload;
    let todo = await this.create({ description, state, user_id })

    if (todo) {
      return {
        success: true,
        message: 'todo created successfully',
        data: todo
      };
    } else {
      return {
        success: true,
        message: `Error creating todo`
      };
    }
  },
  async bulkCreate(payload) {
    
    let todo = await this.insertMany(payload)

    if (todo) {
      return {
        success: true,
        message: 'todo created successfully',
        data: todo
      };
    } else {
      return {
        success: true,
        message: `Error creating todo`
      };
    }
  },
  async updateTodo(id, payload) {
    let todo = await this.findOneAndUpdate({ _id: id, user_id: payload.user_id }, payload, {
        upsert: false,
        new: true
      }).exec();

    if (todo) {
      return {
        success: true,
        message: 'todo updated successfully',
        data: todo
      };
    } else {
      return {
        success: true,
        message: `Error updating todo`
      };
    }
  },
  async deleteTodo(id, payload) {
    let todo = await this.deleteOne({ _id: id, user_id: payload.user_id }).exec()

    if (todo) {
      return {
        success: true,
        message: 'todo deleted successfully'
      };
    } else {
      return {
        success: true,
        message: `Error deleting todo`
      };
    }
  }
  
};


todoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Todo', todoSchema);
