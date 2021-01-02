'use strict';
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const Paginator = require('../helpers/paginator')


const userSchema = new Schema(
  {
    name: {
      type: String
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'last_updated' }
  }
);

userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
  }


userSchema.statics = {
  async list(payload) {
      const payloadOptions = { page: payload.page ? payload.page : 1, limit: payload.limit ? payload.limit : 20, sort: { created_date: -1 }, offset: payload.offset ?  payload.offset : 0  }
      const users = await this.paginate({}, payloadOptions )
      const paginate = Paginator.build(users);
      
    if (users.docs) {
      return {
        success: true,
        message: 'Users successfully retrieved',
        data: {
          users: users && users.docs,
          pagination: paginate,
        }
      };
    } else {
      return {
        success: true,
        message: `There are no's available for this company`,
        data: []
      };
    }

  },
  async get(id) {
    let user = await this.findOne({ _id: id }).lean().exec();

    if (user) {
      return {
        success: true,
        message: 'User successfully retrieved',
        data: user
      };
    } else {
      return {
        success: true,
        message: `Error retrieving user`
      };
    }
  },
  async createUser(payload) {
    const { name } = payload;
    let user = await this.create({ name: name })

    if (user) {
      return {
        success: true,
        message: 'User created successfully',
        data: user
      };
    } else {
      return {
        success: true,
        message: `Error creating user`
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
  async updateUser(id, payload) {
    let user = await this.findOneAndUpdate({ _id: id }, payload, {
        upsert: false,
        new: true
      }).exec();

    if (user) {
      return {
        success: true,
        message: 'User updated successfully',
        data: user
      };
    } else {
      return {
        success: true,
        message: `Error updating user`
      };
    }
  },
  async deleteUser(id) {
    let user = await this.deleteOne({ _id: id }).exec()

    if (user) {
      return {
        success: true,
        message: 'User deleted successfully'
      };
    } else {
      return {
        success: true,
        message: `Error deleting user`
      };
    }
  }
  
};


userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', userSchema);
