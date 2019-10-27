$(document).ready(function(){

    $("#delete-button").on("click", function(){
        $.ajax({url: "/api/clearID/"+$(this).attr("data-id"), method: 'DELETE'}).then(function(response) {
            document.location.reload()
        });
        
    })
})