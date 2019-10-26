var db = require("../models");

module.exports = function(app){

    app.delete("/api/clearUnsaved", function(req, res){
        db.Article.remove({saved: false})
    })

    app.put("/api/save", function(req, res){
        console.log(req.body)
    })
}