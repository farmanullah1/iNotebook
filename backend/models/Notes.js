const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/inotebook"; 
const { Schema } = mongoose;
const NotesSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('notes', NotesSchema);