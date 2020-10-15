const { Schema, model, Types } = require('mongoose');

const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  owner: [{
    type: Types.ObjectId,
    ref: 'User',
  }]
},
{ versionKey: false });

module.exports = model('Todo', todoSchema);
