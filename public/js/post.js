//code to post an item from the modal in userpage.handlebars


$(document).ready(function() {
    var newPost = {
        postItem: $("#postItemName").val().trim(),
        zipcode: $("#zipCode").val().trim(),
        image: $("#postImage").val(),
        postDescription: $("#postDescription").val().trim(),
        category: $("input[name='categoryType']:checked").val(),
    }

    $("#submitPostBtn").on("click", function() {
        console.log(newPost);
    })
});
