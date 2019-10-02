var mongoose = require("mongoose");

// Save a reference to schema constructor
var Schema = mongoose.Schema;

// Use Schema constructor to create a new NoteSchema object
var NoteSchema = new Schema ({
    title: String,
    body: String
});

// Creates our mode from the above schema
var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;