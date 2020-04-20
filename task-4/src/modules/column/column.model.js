const mongoose = require('mongoose');
const uuid = require('uuid');

const columnSchema = new mongoose.Schema(
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
    order: {
      type: Number,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        // ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

const Column = mongoose.model('Column', columnSchema);

module.exports = {
  columnSchema,
  columnModel: Column
};
