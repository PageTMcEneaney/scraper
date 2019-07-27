var axios = require("axios");
var cheerio = require("cheerio");
// var request = require("request");
var db = require("../models");

var axiosCall = function (category) {
    var base = "https://www.npr.org/sections/";
    var url = base + category + "/"

    // First, we grab the body of the html with axios
    axios.get(url).then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        $("article.item").each(function (i, element) {
            var result = {};

            result.title = $(element)
                .find('.item-info')
                .find('.title')
                .find('a')
                .text();
            result.link = $(element)
                .find('.item-info')
                .find('.title')
                .children()
                .attr("href");
            result.summary = $(element)
                .find('.item-info')
                .find('.teaser')
                .find('a')
                .text();
            result.image = $(element)
                .find('.item-image')
                .find('.imagewrap')
                .find('a')
                .find('img')
                .attr("src");
            result.date = $(element)
                .find('.item-info')
                .find('.teaser')
                .find('a')
                .find('time')
                .attr("datetime");

            // console.log(result);
            switch (category) {
                case "business":
                db.Business.create(result)
                .then(function (article) {
                    console.log(article);
                }).catch(function (err) {
                    console.log(err);
                });
                break;
                case "codeswitch":
                db.Codeswitch.create(result)
                .then(function (article) {
                    console.log(article);
                }).catch(function (err) {
                    console.log(err);
                });
                break;
                case "health":
                db.Health.create(result)
                .then(function (article) {
                    console.log(article);
                }).catch(function (err) {
                    console.log(err);
                });
                break;
                // case "National":
                // db.National.create(result)
                // .then(function (article) {
                //     console.log(article);
                // }).catch(function (err) {
                //     console.log(err);
                // });
                // break;
                case "news":
                db.News.create(result)
                .then(function (article) {
                    console.log(article);
                }).catch(function (err) {
                    console.log(err);
                });
                break;
                case "politics":
                db.Politics.create(result)
                .then(function (article) {
                    console.log(article);
                }).catch(function (err) {
                    console.log(err);
                });
                break;
                case "science":
                db.Science.create(result)
                .then(function (article) {
                    console.log(article);
                }).catch(function (err) {
                    console.log(err);
                });
                break;
                case "technology":
                db.Technology.create(result)
                .then(function (article) {
                    console.log(article);
                }).catch(function (err) {
                    console.log(err);
                });
                break;
                case "world":
                db.World.create(result)
                .then(function (article) {
                    console.log(article);
                }).catch(function (err) {
                    console.log(err);
                });
                break;
                default:
                    console.log("oops! something went wrong")
                break;    
            };        
        });
    });
}

module.exports = function (app) {
    // A GET route for scraping the npr news   website
    app.get("/scrape/:category", function (req, res) {
        axiosCall(req.params.category);
        res.send("scrape complete");
    });

    // Route for getting all Articles from the db
    app.get("/api/all", function (req, res) {
        // TODO: Finish the route so it grabs all of the articles
    });

    // Route for grabbing a specific Article by id, populate it with it's note
    app.get("/articles/:id", function (req, res) {
        // TODO
        // ====
        // Finish the route so it finds one article using the req.params.id,
        // and run the populate method with "note",
        // then responds with the article with the note included
    });

    // Route for saving/updating an Article's associated Note
    app.post("/articles/:id", function (req, res) {
        // TODO
        // ====
        // save the new note that gets posted to the Notes collection
        // then find an article from the req.params.id
        // and update it's "note" property with the _id of the new note
    });

};