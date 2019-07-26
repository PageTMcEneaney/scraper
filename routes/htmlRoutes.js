// var cheerio = require("cheerio");
// var request = require("request");
// var db = require("../models");

module.exports = function(app) {
    app.get("/", function(req, res) {
        //MAKE DB CALL
        //RENDER INDEX WITH MOST RECENT ARTICLE DATA
        //SORT BY id?

        res.render("index")
        // res.render("index", {
        //     title: result.title,
        //     link: result.link,
        //     summary: result.summary
        // })
    });

    app.get("/saved", function(req, res) {
        //
    })
};