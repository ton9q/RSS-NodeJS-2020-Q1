const mongoose = require('mongoose');
const uuid = require('uuid');
const { columnSchema } = require('../column/column.model');

const boardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      default: uuid
    },
    title: {
      type: String,
      required: true
    },
    columns: {
      type: [columnSchema]
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
