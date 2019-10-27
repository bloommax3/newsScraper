var db = require("../models");

module.exports = function(app){

    app.delete("/api/clearUnsaved", function(req, res){
        db.Article.remove({saved: false}, function(err, data){
            if(err) throw err;
            res.json(data)
        })
    })

    app.put("/api/save", function(req, res){
        db.Article.updateOne({_id: req.body.id}, {$set: {saved: true}}, function(err, data){
            if(err) throw err;
            res.json(data)
        })
    })

    
}