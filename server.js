//Required Dependencies
var cheerio = require("cheerio");
var axios = require("axios");
var rp = require("request-promise");

var express = require("express");
var app = express();


console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from reddit's webdev board:" +
            "\n***********************************\n");

axios.get("https://www.ultimatetennisstatistics.com/rankingsTable").then(function(res) {
    var $ = cheerio.load(res.data);

    var results = [];

    $("h3.c-entry-box-base_headline").each(function(i, element) {
        var title = $(element).text();

        var link = $(element).children().attr("href");

        results.push({
            title: title,
            link: link
        });
    });

    console.log(results);
});
