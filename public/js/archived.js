$(document).ready(function(){

    $("#delete-button").on("click", function(){
        $.ajax({url: "/api/clearID/"+$(this).attr("data-id"), method: 'DELETE'}).then(function(response) {
            document.location.reload()
        });
        
    })

    $("#note-button").on("click", function(){
        const articleId = $(this).attr("data-id")
        console.log(articleId)
        var noteAdd = confirm("Would You Like To Add A New Note?")
        if(noteAdd){
            var newNote = prompt("Write Your Note Here")
            $.ajax({url: "/api/submit", method: 'POST', data: {articleId: articleId, body: newNote}}).then(function(response) {
                getNotes(articleId)
            }); 
        }
        else{
            getNotes(articleId)
        }
    })

    function getNotes(id){
        $.ajax({url: "/populatedArticle/"+id, method: 'GET'}).then(function(response) {
            console.log(response)
        });
        
    }
})