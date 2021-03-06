//Required Dependencies
var cheerio = require("cheerio");
var axios = require("axios");
var logger = require("morgan");
var mongoose = require("mongoose");

var express = require("express");
var app = express();

var db = require("./models");

var PORT = process.env.PORT || 3001;

//Morgan logger for logging requests
app.use(logger("dev"));

//Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Make public a static folder
app.use(express.static("public"));

//Connect to MongoDB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoPoly";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

//Routes

// ---------- A GET route for scraping the website ---------- //
app.get("/scrape", function(req, res) {
    axios.get("https://www.polygon.com/gaming").then(function(response) {
        //Load data into cheerio via $ for easy access
        var $ = cheerio.load(response.data);
        
        //Grabs every h3 with an headline tag
        $("div.c-entry-box--compact--article").each(function(i, element) {
            //Saves into empty object
            var result = {};

            //Add text and href of every link as properties of the result object
            result.image = $(this)
                .children("a")
                .children("div")
                .children("img")
                .attr("src")
            result.title = $(this)
                .find("h2.c-entry-box--compact__title")
                .text();
            result.link = $(this)
                .find("h2.c-entry-box--compact__title")
                .children("a")
                .attr("href");
         
            //Creat a new Article using the "result" object built from scraping
            db.Article.create(result)
            .then(function(dbArticle) {
                console.log(dbArticle);
            })
            .catch(function(err) {
                console.log(err);
            });
        });

        //Send message to client
        res.send("Scrape COMPLETE!");
    }).catch(function(error) {
        console.log(error);
        res.send("Scrape ACCESSING WEBSITE ERROR!");
    });
});



// ---------- Route for getting articles from the db ---------- //
app.get("/articles", function(req, res) {
    db.Article.find({})
    .then(function(dbArticle) {
        res.json(dbArticle)
    })
    .catch(function(err) {
        res.json(err);
    });
});

// ---------- Route for grabbing specific Article by ID ---------- //
app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
    //Populate notes associated with specific Article
    .populate("note")
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});

// ---------- Route for saving/updating an Article's associated note ---------- //
app.post("/articles/:id", function(req, res) {
    //Create new note and pass the req.body to the entry
    db.Note.create(req.body)
    .then(function(dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, {new: true});
    })
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});

// Start server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
