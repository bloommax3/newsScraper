$(document).ready(function(){
    $("#scrape-button").on("click", function(){
        $.ajax({
            url: "/scrape",
            method: 'GET'
        }).then(function(response) {
            document.location.reload()
        });
    })

    $("#clear-button").on("click", function(){
        $.ajax({url: "/api/clearUnsaved", method: 'DELETE'}).then(function(response) {
            document.location.reload()
        });
        
    })

    $("#archive-button").on("click", function(){
        $.ajax({url: "/api/save", method: 'PUT', data: this.attr("data-id")}).then(function(response) {});
        
    })
})