$(document).ready(function () {

    // local storage for the user while switching betweeen pages.
    let userId = JSON.parse(localStorage.getItem("userId"));

    // Post modal open
    $("#post-item").on("click", function (event) {
        event.preventDefault();
        $("#post-modal").modal();
        $("#postDescription").characterCounter();
    });

    // Post Button submit click event
    $("#submitPostBtn").on("click", function () {
        var newPost = {
            userId: userId.userId,
            itemName: $("#postItemName").val().trim(),
            zipcode: $("#zipCode").val(),
            image: $("#postItemurl").val().trim(),
            description: $("#postDescription").val().trim(),
            category: $("input[name='categoryType']:checked").val(),
        };
        
        // clear the input values.
        $("#postItemName").val("")
        $("#zipCode").val("")
        $("#postItemurl").val("")
        $("#postDescription").val("")
        $("input[name='categoryType']:checked").val("")
        $('#post-modal').modal('close');
        $.ajax({
            contentType: "application/JSON",
            url: "/api/posts",
            method: "POST",
            data: JSON.stringify(newPost)
        }).then(function (postResponse) {
            window.location.href = "/yourPage/" + userId.userId;
        })
    })

    // see only the signed-in user posts
    $("#your-posts").on("click", function () {

        $.ajax({
            contentType: "application/JSON",
            url: "/yourPage/" + userId.userId,
            type: "GET",
        }).then(function (postResponse) {
            window.location.href = "/yourPage/" + userId.userId;
        })
    })

    // delete the post 
    $(document).on("click", "#deleteButton", function (e) {
        e.preventDefault();
        $.ajax({
            contentType: "application/JSON",
            url: "/yourPage/" + $(this).attr("data-postID"),
            method: "DELETE",
        }).then(function (postResponse) {
            window.location.href = "/yourPage/" + userId.userId;
        })
    });

    // when a trade button is clicked, values are passed to modal and opens the trade modal
    $(document).on("click", "#tradeButton", function (e) {
        e.preventDefault();
        var myVal = $(this).attr("data-email")
        $('#trade-modal').find("#submitOfferButton").attr('data-email', myVal);
        $('#trade-modal').modal();
        $('#trade-modal').modal('open');
    });

    // when a submit offer button is clicked(Trade),an email is send to the post owner with inputted details
    $("#submitOfferButton").on("click", function (e) {
        e.preventDefault();
        var myVal = $(this).attr("data-email")
        var newPost = {
            email: myVal,
            name: $("#offerName").val().trim(),
            contactInfo: $("#offerContactInfo").val(),
            item: $("#offerItem").val().trim(),
            description: $("#offerDescription").val().trim(),
            zipcode: $("#offerZipcode").val(),
            link: $("#offerLink").val().trim()

        };
        $('#trade-modal').modal('close');
        $.ajax({
            contentType: "application/JSON",
            url: "/api/email",
            method: "POST",
            data: JSON.stringify(newPost)
        }).then(function (postResponse) {
            $('#email-modal').modal();
            $('#email-modal').modal('open');
        })
    })

    // email notification modal is closed on OK button is clicked
    $("#emailButton").on("click", function (e) {
        e.preventDefault();
        $('#email-modal').modal();
        $('#trade-modal').modal('close');
    });

    // when an update button is clicked, values are passed to modal and opens the update modal
    $(document).on("click", "#updateButton", function (e) {
        e.preventDefault();
        M.updateTextFields();

        // put values into modal fields
        $('#update-modal').find("#updateItemName").val($(this).attr("data-itemName"));
        $('#update-modal').find("#updateZipCode").val($(this).attr("data-zipcode"));
        $('#update-modal').find("#updateItemurl").val($(this).attr("data-image"));
        $('#update-modal').find("#updateDescription").val($(this).attr("data-description"));
        $('#update-modal').find("#submitUpdateBtn").attr('data-postID', $(this).attr("data-postID"));

        // open update modal
        $('#update-modal').modal();
        $('#update-modal').modal('open');
    });

    // when a submit offer button is clicked(Trade),an email is send to the post owner with inputted details
    $("#submitUpdateBtn").on("click", function (e) {
        e.preventDefault();
        var newPost = {
            userId: userId.userId,
            id: $("#submitUpdateBtn").attr('data-postID'),
            itemName: $("#updateItemName").val().trim(),
            zipcode: $("#updateZipCode").val(),
            image: $("#updateItemurl").val().trim(),
            description: $("#updateDescription").val().trim(),
            category: $("input[name='updatecategoryType']:checked").val(),
        };
        $('#update-modal').modal('close');
        $.ajax({
            contentType: "application/JSON",
            url: "/yourPage",
            method: "PUT",
            data: JSON.stringify(newPost)
        }).then(function (postResponse) {
            window.location.href = "/yourPage/"+userId.userId;
        })
    })

    // User log out from google sign in  
    $("#logoutBtn").on("click", function () {
        function signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                alert("signed out");
            });
        }
        signOut();
        window.location.href = "/";
    });
})