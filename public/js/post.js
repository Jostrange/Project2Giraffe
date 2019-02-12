$(document).ready(function () {


    $("#submitPostBtn").on("click", function () {
        console.log(newPost);
        var newPost = {
            itemName: $("#postItemName").val().trim(),
            zipcode: $("#zipCode").val(),
            image: $("#postImage").val(),
            description: $("#postDescription").val().trim(),
            category: $("input[name='categoryType']:checked").val(), 
            // created_at: moment().format("MM-DD-YYYY HH:mm:ss")
        };
        $.ajax({
            contentType: "application/JSON",
            url: "/api/posts",
            method: "POST",
            data: JSON.stringify(newPost)
        }).then(function (postResponse) {
            console.log(postResponse);
            var postcard = $("<div>");
            postcard.addClass("postcard");

            postcard.append("<p id='newPostItem'>" + newPost.itemName +"</p>");
            postcard.append("<img id='newPostImage src='" + newPost.image + ">" );
            postcard.append("<p id='newPostDescription'>" + newPost.description + "</p>");
            postcard.append("<p id='newPostCategory'>" + newPost.category + "</p>");
            postcard.append("<p id='newPostZipcode'>" + newPost.zipcode + "</p>");

            $("#feedcontainer").prepend(postcard);
        })
    })
}
)