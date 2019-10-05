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
    $.getJSON("/articles", function(data) {
        for (var i = 0; i < data.length; i++) {
            $("#articles").append(
                "<div class='card' style='background-color:black;'><div class='card-content'><span class='result-title'><h4>" + data[i].title + "</h4></span></div><div class='card-action'><a href='" + data[i].link + "'>Link to Article</a><a id='save' class='btn'>Save</a></div></div>"
            );
        };
    });
});

//Clears the articles section
$("#clear-scrape").on("click", function() {
    $("#articles").empty();
})

// Scrapes articles from webpage and appends to index.html
$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append(
            "<div class='card' style='background-color:black;'><div class='card-content'><span class='result-title'><h4>" + data[i].title + "</h4></span></div><div class='card-action'><a href='" + data[i].link + "'>Link to Article</a><a id='save' class='btn'>Save</a></div></div>"
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