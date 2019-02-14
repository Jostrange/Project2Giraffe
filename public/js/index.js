// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

let userId = JSON.parse(localStorage.getItem("userId"));
    console.log(userId.userId)

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  },

  saveUser: function(example){
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(example)
    })
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};
//Here is code that does similarly to above but for tradesies user posts
//This function will  be called by a click
var postSubmit = function(event) {
  event.preventDefault;
  //I'm making an object based off the post form info.
  var newPost = {
    poster:    "user1",
    title:     "coffee beans",
    body:      "Hey! I'm a coffee worker and I have so many free beans and im going to die of starvation please does anybody have fooodddd we can trade.",
    image:     "image.jpg",
    category:  "goods",
    location:  "seattle",
    zip:       "98102"
  };
  var newPost = {
    poster: $("#postusername").val().trim(),
    title: $("postItemName").val().trim(),
    body: $("#postDescription").val().trim(),
    //need more code for image upload
    image: $("postPhoto").val(),
    category: $("input[name='group1']:checked").val(),
    //Waiting on location input
    location: $("post-location").val().trim()
  };
  

  //Recycles template function for saving example
  API.saveExample(newPost).then(function(){ 
    refreshExamples();
  })

}

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

//Google sign in script from docs
function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " +          profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' +   profile.getName());
  console.log('Given Name: ' +  profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " +   profile.getImageUrl());
  console.log("Email: " +       profile.getEmail());

  // // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
  console.log(profile)

  //we can use what we need from this
  var userObject = {
    FullName:     profile.getName(),
    // FirstName:    profile.getGivenName(),
    // Surname:      profile.getFamilyName(),
    userImageURL: profile.getImageUrl(),
    email:        profile.getEmail()
  }
  API.saveUser(userObject).then(function(dbuser){
    localStorage.setItem("userId",JSON.stringify({userId: dbuser[0].id}));
    window.location.href = "/userpage";
  })
  
}
//code for signing out from google api
$("#logout").on("click", function(){
  console.log("HEY")
  localStorage.clear();
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  
}
});

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$("submitBtn").on("click", postSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
