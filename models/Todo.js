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
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  time: {
    type: String,
    default: '00:00',
    required: true,
  },
  owner: [{
    type: Types.ObjectId,
    ref: 'User',
  }]
});

module.exports = model('Todo', todoSchema);

/*
const localDate = new Date();
const localeTime = `
  ${localDate.getHours().toString().padStart(2, '0')}
  :
  ${localDate.getMinutes().toString().padStart(2, '0')}
`;
*/
