$(document).ready(function() {

//Hides favorites section on website load
$("#saved").hide();

//Clicking faves shows favorited section
$(document).on("click", "#faves", function() {
    $("#results").hide();
    $("#saved").show();
});

//Clicking home will show results section
$(document).on("click", "#home", function() {
    $("#results").show();
    $("#saved").hide();
});

//Reruns the scrape route to scrape newest articles
$("#scrape-btn").on("click", function() {
    app.get("/scrape", function(req, res) {
        axios.get("https://www.polygon.com/gaming").then(function(response) {
            //Load data into cheerio via $ for easy access
            var $ = cheerio.load(response.data);
    
               //Remove db
               db.Article.remove({})
               .then(function(dbArticle) {
                   console.log(dbArticle); 
               })
               .catch(function(err) {
                   console.log(err);
               });
            
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





    $.getJSON("/articles", function(data) {
        for (var i = 0; i < data.length; i++) {
            $("#articles").append(
                "<div class='card horizontal z-depth-5' style='background-color:black;'><div class='card-image'><img href='" + data[i].link + "' src='" + data[i].image + "' style='width: 350px; height: 200px;' target='_blank'></img></div><div class='card-stacked'><div class='card-content'><h5><a href='" + data[i].link + "' target='_blank'>" + data[i].title + "</h5></div><div class='card-action'><a id='save' class='btn right'>Save</a></div></div></div>"
            );
        };
    });
});
 /*$("#articles").append(
                "<div class='card' style='background-color:black;'><div class='card-content'><span class='result-title'><h4>" + data[i].title + "</h4></span></div><div class='card-action'><a href='" + data[i].link + "'>Link to Article</a><a id='save' class='btn'>Save</a></div></div>"
            );*/

//Clears the articles section
$("#clear-scrape").on("click", function() {
    $("#articles").empty();
})

//Saves article to favorites
$("#save").on("click", function() {
    
})

// Scrapes articles from webpage and appends to index.html
$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append(
            "<div class='card horizontal z-depth-5' style='background-color:black;'><div class='card-image'><img href='" + data[i].link + "' src='" + data[i].image + "' style='width: 350px; height: 200px;' target='_blank'></img></div><div class='card-stacked'><div class='card-content'><h5><a href='" + data[i].link + "' target='_blank'>" + data[i].title + "</h5></div><div class='card-action'><a id='save' class='btn right'>Save</a></div></div></div>"
        );
    };
});







// ---------- ADDING NOTES TO SAVED ARTICLES ---------- //
// Click on p tag to write note
$(document).on("click", "p", function() {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");

$.ajax({
    method: "GET",
    url: "/articles/" + thisId
})
    // Adds notes information to the page
    .then(function(data) {
        console.log(data);
        $("#notes").append("<h2>" + data.title + "</h2>");
        $("#notes").append("<input id='titleinput' name='title' >");
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
        if (data.note) {
            $("#titleinput").val(data.note.title);
            $("#bodyinput").val(data.note.body);
        }
    });
});

// When click save note button
$(document).on("click", "#savenote", function() {
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
        .then(function(data) {
            console.log(data);
            $("#notes").empty();
        });

        $("#titleinput").val("");
        $("#bodyinput").val("");
});

});