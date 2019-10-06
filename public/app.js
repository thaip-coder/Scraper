$(document).ready(function() {
scrapeArticles();

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


//Refreshes scraped articles
$("#scrape-btn").on("click", function() {
   scrapeArticles();
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
function scrapeArticles() {
    $("#articles").empty();
    $.getJSON("/articles", function(data) {
        for (var i = 0; i < data.length; i++) {
            $("#articles").append(
                "<div class='card horizontal z-depth-5' style='background-color:black;'><div class='card-image'><img href='" + data[i].link + "' src='" + data[i].image + "' style='width: 350px; height: 200px;' target='_blank'></img></div><div class='card-stacked'><div class='card-content'><h5><a href='" + data[i].link + "' target='_blank'>" + data[i].title + "</h5></div><div class='card-action'><a id='save' class='btn right'>Save</a></div></div></div>"
            );
        };
    });
};







// ---------- ADDING NOTES TO SAVED ARTICLES ---------- //
// Click on p tag to write note
/*$(document).on("click", "p", function() {
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
});*/

});