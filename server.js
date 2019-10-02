//Required Dependencies
var cheerio = require("cheerio");
var axios = require("axios");
var logger = require("morgan");
var mongoose = require("mongoose");

var express = require("express");
var app = express();

var db = require("./models");

console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from reddit's webdev board:" +
            "\n***********************************\n");

axios.get("https://www.polygon.com/gaming").then(function(res) {
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
