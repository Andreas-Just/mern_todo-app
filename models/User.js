const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  todos: [{
    type: Types.ObjectId,
    ref: 'Todos',
  }]
});

module.exports = model('User', userSchema);
