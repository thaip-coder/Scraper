$(document).ready(function() {

$('.parallax').parallax();

// Grabs articles as a JSON
$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
        $("#artciles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});


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