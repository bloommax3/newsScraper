var db = require("../models");

module.exports = function(app){

    app.get("/", function(req, res){
        db.Article.find({})
        .then(function(data){
            res.render("index", {data: data})
        }).catch(function(err){
            console.log(err)
        })
    })

    app.get("/archived", function(req, res){
        db.Article.find({})
        .then(function(data){
            res.render("archived", {data: data})
        }).catch(function(err){
            console.log(err)
        })
    })
}