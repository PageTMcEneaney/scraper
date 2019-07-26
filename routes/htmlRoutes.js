// var cheerio = require("cheerio");
// var request = require("request");
var db = require("../models");

module.exports = function(app) {
    app.get("/", function(req, res) {
        var headlineObject = {}

        headlineObject["articles"] = []

        db.Article.find({$query: {saved: false} }).sort( { date: -1 })
        .then(function(found) {
            if (found.length > 0) {
                for (let i = 0; i < found.length; i ++ ) {

                    console.log(found[i]);

                    newObject = {
                        id: found[i]._id,
                        title: found[i].title,
                        summary: found[i].summary,
                        link: found[i].link,
                        image: found[i].image,
                        date: found[i].date,
                        saved: found[i].saved,
                        notes: found[i].notes
                    }

                    headlineObject.articles.push(newObject);

                    if (i == (found.length - 1)) {
                        // res.json(headlineObject)

                        res.render("index", headlineObject)
                    }
                }
            }

            else {
                res.render("index")
            }

        });


        // res.render("index")
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