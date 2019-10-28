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

    app.delete("/api/clearID/:id", function(req, res){
        db.Article.remove({_id: req.params.id}, function(err, data){
            if(err) throw err;
            res.json(data)
        })
    })

    // Route for saving a new Note to the db and associating it with a Article
    app.post("/api/submit", function(req, res) {
        // Create a new Note in the db
        db.Note.create(req.body)
        .then(function(dbNote) {
            // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the Article's `notes` array
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Article.findOneAndUpdate({}, { $push: { notes: dbNote._id } }, { new: true });
        })
        .then(function(dbArticle) {
            // If the User was updated successfully, send it back to the client
            res.json(dbArticle);
        })
        .catch(function(err) {
            // If an error occurs, send it back to the client
            res.json(err);
        });
    });

    // Route to see what user looks like WITH populating
    app.get("/populatedArticle/:id", function(req, res) {
        // Write the query to grab the documents from the User collection,
        // and populate them with any associated Notes.
        // TIP: Check the models out to see how the Notes refers to the User
        db.Article.find({_id: req.params.id})
        .populate("notes")
        .then(function(dbArticle){
            res.json(dbArticle)
        })
        .catch(function(err){
            res.json(err)
        })
  });
}