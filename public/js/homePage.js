
// Get user id from the local storage.
let userId = JSON.parse(localStorage.getItem("userId"));

// The API object contains methods for each kind of request we'll make
var API = {
  saveUser: function (user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(user)
    })
  }
};

//Google sign in script from docs
function onSignIn(googleUser) {

  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;

  // User data from google account
  var userObject = {
    FullName: profile.getName(),
    userImageURL: profile.getImageUrl(),
    email: profile.getEmail()
  }

  // API call to get the data from backend and redirect to logged in page
  API.saveUser(userObject).then(function (dbuser) {
    localStorage.setItem("userId", JSON.stringify({ userId: dbuser[0].id }));
    window.location.href = "/userPage";
  })
}

// when a trade button is clicked, show the trade-modal after passing values to trade modal
$(document).on("click", "#tradeButton", function (e) {
  e.preventDefault();
  var myVal = $(this).attr("data-id")
  $('#trade-modal').find("#submitOfferButton").attr('data-id', myVal);
  $('#trade-modal').modal();
  $('#trade-modal').modal('open');
});

// when a submit offer button is clicked(Trade) email is send and trade modal is closed
// An email notification modal is opened once an email is successfullty send.
$("#submitOfferButton").on("click", function (e) {
  e.preventDefault();
  var myVal = $(this).attr("data-id")
  var newPost = {
    id: myVal,
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

// Email notification modal closed when OK button is clicked.
$("#emailButton").on("click", function (e) {
  e.preventDefault();
  $('#email-modal').modal();
  $('#trade-modal').modal('close');
});

// Report modal is opened when report button is clicked.
$("#reportButton").on("click", function () {
  event.preventDefault();
  $("#report-modal").modal();
  $('select').formSelect();
});

// report button closed when submit report button is clicked
$("#submitReportButton").on("click", function () {
  $("#report-modal").modal('close');
});

// Google signout function
$("#logoutBtn").on("click", function () {
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      alert("signed out");
    });
  }
  signOut();
});


