$(document).ready(function () {
    let tradeModalEmail = ""
    let userId = JSON.parse(localStorage.getItem("userId"));
    console.log(userId.userId)
    $("#post-item").on("click", function (event) {
        event.preventDefault();
        $("#post-modal").modal();
        $("#postDescription").characterCounter();
    });
    $("#submitPostBtn").on("click", function () {
        var newPost = {
            userId: userId.userId,
            itemName: $("#postItemName").val().trim(),
            zipcode: $("#zipCode").val(),
            image: $("#postItemurl").val().trim(),
            description: $("#postDescription").val().trim(),
            category: $("input[name='categoryType']:checked").val(),
            // created_at: moment().format("MM-DD-YYYY HH:mm:ss")
        };
        console.log(newPost)
        $('#post-modal').modal('close');
        $.ajax({
            contentType: "application/JSON",
            url: "/api/posts",
            method: "POST",
            data: JSON.stringify(newPost)
        }).then(function (postResponse) {
            // console.log(postResponse);
            // var postcard = $("<div>");
            // postcard.addClass("postcard");

            // postcard.append("<p id='newPostItem'>" + postResponse.itemName +"</p>");
            // postcard.append("<img id='newPostImage src='" + postResponse.image + "'>");
            // postcard.append("<p id='newPostDescription'>" + postResponse.description + "</p>");
            // postcard.append("<p id='newPostCategory'>" + postResponse.category + "</p>");
            // postcard.append("<p id='newPostZipcode'>" + postResponse.zipcode + "</p>");

            // $("#feedcontainer").prepend(postcard);
            window.location.href = "/userPage";
        })
    })

    // $(document).on("click", "#submitOfferButton",function (e) {
    //     e.preventDefault();

    // see onluy the signes in user posts
    $("#your-posts").on("click", function () {

        $.ajax({
            contentType: "application/JSON",
            url: "/yourPage/" + userId.userId,
            type: "GET",
        }).then(function (postResponse) {
            console.log(postResponse);
            window.location.href = "/yourPage/" + userId.userId;
        })
    })

    // delete the post 
    // $(document).on("click", "#deleteButton",function (e) {
    //     e.preventDefault();
    //     console.log($(this).attr("data-postID"))
    //     // var newPost = {
    //     //     id: $(this).attr("data-postID")
    //     // }
    //     // console.log(newPost)
    //     $.ajax({
    //         contentType: "application/JSON",
    //         url: "/yourPage/"+$(this).attr("data-postID"),
    //         method: "DELETE",
    //         // data: newPost
    //     }).then(function (postResponse) {
    //         window.location.href = "/yourPage/"+userId.userId;
    //     })
    // });

    // when a trade button is clicked 
    $(document).on("click", "#tradeButton", function (e) {
        e.preventDefault();
        var myVal = $(this).attr("data-email")
        console.log(myVal);
        $('#trade-modal').find("#submitOfferButton").attr('data-email', myVal);
        $('#trade-modal').modal();
        $('#trade-modal').modal('open');
    });

    // when a submit offer button is clicked(Trade)
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
        console.log(newPost)
        $('#trade-modal').modal('close');
        $.ajax({
            contentType: "application/JSON",
            url: "/api/email",
            method: "POST",
            data: JSON.stringify(newPost)
        }).then(function (postResponse) {
            console.log(postResponse);
            $('#email-modal').modal();
            $('#email-modal').modal('open');
            // window.location.href = "/userpage";
        })
    })
    $("#emailButton").on("click", function (e) {
        e.preventDefault();
        $('#email-modal').modal();
        $('#trade-modal').modal('close');
    });

    $("#logoutBtn").on("click", function () {


        function signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
                alert("signed out");
            });
        }
        signOut();
        window.location.href = "/";

    });

    $("#reportButton").on("click", function () {
        event.preventDefault();
        $("#report-modal").modal();
        $('select').formSelect();
      });
      
      $("#submitReportButton").on("click", function () {
        $("#report-modal").modal('close');
      });
      
})