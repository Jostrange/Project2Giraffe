$(document).ready(function() {
    var newPost = {
        itemName: $("#postItemName").val().trim(),
        zipcode: $("#zipCode"),
        image: $("#postImage").val(),
        description: $("#postDescription").val().trim(),
        category: $("input[name='group1']:checked").val()
    };

    $("#submitPostBtn").on("click", function(){
        console.log(newPost);
    })
})