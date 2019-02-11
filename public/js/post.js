$(document).ready(function () {


    $("#submitPostBtn").on("click", function () {
        console.log(newPost);
        var newPost = {
            itemName: $("#postItemName").val().trim(),
            zipcode: $("#zipCode").val(),
            image: $("#postImage").val(),
            description: $("#postDescription").val().trim(),
            category: $("input[name='group1']:checked").val()
        };
        $.ajax({
            contentType: "application/JSON",
            url: "/api/posts",
            method: "POST",
            data: JSON.stringify(newPost)
        }).then(function (postResponse) {
            console.log(postResponse);
        })
    })
}
)