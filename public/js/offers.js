$(document).ready(function () {

  let offerId = JSON.parse(localStorage.getItem("offerId"));
  console.log(offerId.offerId)
  $("#submitOfferButton").on("click", function () {
      var newOffer = {
          offerId: offerId.offerId,
          item_name: $("#offerItem").val().trim(),
          item_zip: $("#offerZipcode").val(),
          full_name: $("#offerFullName").val().trim(),
          item_description: $("#offerDescription").val().trim(),
          contact_info: $("offerContactInfo").val(), 
          // created_at: moment().format("MM-DD-YYYY HH:mm:ss")
      };
      console.log(newOffer)
      $('#offers-modal').modal('close');
      $.ajax({
          contentType: "application/JSON",
          url: "/api/offers",
          method: "POST",
             data: JSON.stringify(newOffer)
      }).then(function (offerResponse) {
          // console.log(postResponse);
          // var postcard = $("<div>");
          // postcard.addClass("postcard");

          // postcard.append("<p id='newPostItem'>" + postResponse.itemName +"</p>");
          // postcard.append("<img id='newPostImage src='" + postResponse.image + "'>");
          // postcard.append("<p id='newPostDescription'>" + postResponse.description + "</p>");
          // postcard.append("<p id='newPostCategory'>" + postResponse.category + "</p>");
          // postcard.append("<p id='newPostZipcode'>" + postResponse.zipcode + "</p>");

          // $("#feedcontainer").prepend(postcard);
          window.location.href = "/userpage";
          window.location.href = "/homepage";
      })
  })
}
)