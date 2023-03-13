const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentsSchema = new Schema({
  name: String,
  email: {
    type: String
  },
  movie_id: ObjectId,
  text: String,
  date: Date
});

const commentsModel = mongoose.model("comments", commentsSchema);


module.exports = commentsModel;