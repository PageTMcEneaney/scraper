// var cheerio = require("cheerio");
// var request = require("request");
var db = require("../models");

var findArticles = function (found, headline) {
    var headlineObject = {};
    headlineObject[headline] = [];
    if (found.length > 0) {
        for (let i = 0; i < found.length; i++) {
            newObject = {
                id: found[i]._id,
                title: found[i].title,
                summary: found[i].summary,
                link: found[i].link,
                image: found[i].image,
                date: found[i].date,
                saved: found[i].saved,
                notes: found[i].notes
            };
            headlineObject[headline].push(newObject);
        };
    };
    return headlineObject;
};

module.exports = function (app) {
    app.get("/", function (req, res) {
        var allArticles = {}
        db.News.find({ $query: { saved: false } }).sort({ date: -1 })
            .then(function (found) {
                var news = findArticles(found, "news")
                allArticles.news = news;

                db.Business.find({ $query: { saved: false } }).sort({ date: -1 })
                    .then(function (found) {
                        var business = findArticles(found, "business")
                        allArticles.business = business;

                        db.Codeswitch.find({ $query: { saved: false } }).sort({ date: -1 })
                            .then(function (found) {
                                var codeswitch = findArticles(found, "codeswitch")
                                allArticles.codeswitch = codeswitch;

                                db.Health.find({ $query: { saved: false } }).sort({ date: -1 })
                                    .then(function (found) {
                                        var health = findArticles(found, "health")
                                        allArticles.health = health;

                                        db.Politics.find({ $query: { saved: false } }).sort({ date: -1 })
                                            .then(function (found) {
                                                var politics = findArticles(found, "politics")
                                                allArticles.politics = politics;

                                                db.Science.find({ $query: { saved: false } }).sort({ date: -1 })
                                                    .then(function (found) {
                                                        var science = findArticles(found, "science")
                                                        allArticles.science = science;

                                                        db.Technology.find({ $query: { saved: false } }).sort({ date: -1 })
                                                            .then(function (found) {
                                                                var technology = findArticles(found, "technology")
                                                                allArticles.technology = technology;

                                                                db.World.find({ $query: { saved: false } }).sort({ date: -1 })
                                                                    .then(function (found) {
                                                                        var world = findArticles(found, "world")
                                                                        allArticles.world = world;

                                                                        render(allArticles);
                                                                    });
                                                            });
                                                    });
                                            });
                                    });
                            });
                    });
            });

        var render = function (all) {
            res.render("index", all)
        }
    });

    app.get("/saved", function (req, res) {
        //
    })
};