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
        $('#post-modal').modal('close');
        $.ajax({
            contentType: "application/JSON",
            url: "/api/posts",
            method: "POST",
            data: JSON.stringify(newPost)
        }).then(function (postResponse) {
            window.location.href = "/userPage";
        })
    })

    // Redirecct to yourPost page when your post button is clicked
    $("#your-posts").on("click", function () {

        $.ajax({
            contentType: "application/JSON",
            url: "/yourPage/" + userId.userId,
            type: "GET",
        }).then(function (postResponse) {
            window.location.href = "/yourPage/" + userId.userId;
        })
    })

    // when a trade button is clicked, values are passed to modal and opens the trade modal
    $(document).on("click", "#tradeButton", function (e) {
        e.preventDefault();
        var myVal = $(this).attr("data-email")
        console.log(myVal);
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
            console.log(postResponse);
            $('#email-modal').modal();
            $('#email-modal').modal('open');
        })
    })

    // email notificationn modal is closed on OK button is clicked
    $("#emailButton").on("click", function (e) {
        e.preventDefault();
        $('#email-modal').modal();
        $('#email-modal').modal('close');
    });

    // Report modal is opened when report button is clicked.
    $("#reportButton").on("click", function () {
        event.preventDefault();
        $("#report-modal").modal();
        $('select').formSelect();
    });

    // submit report button submits and close the report modal
    $("#submitReportButton").on("click", function () {
        $("#report-modal").modal('close');
    });

    // User log out from google sign in  
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
})