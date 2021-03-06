var mongoose = require("mongoose");

// Save a reference to the schema constructor
var Schema = mongoose.Schema;

// Using the schema instructor to create a new UserSchema object
var ArticleSchema = new Schema({
    image: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
    saved: {
        type: Boolean,
        default: false
    }
});


// Creates mode from the above schema with mongoose model method
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;