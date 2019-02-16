$(document).ready(function () {

    let offerId = JSON.parse(localStorage.getItem("offerId"));
    console.log(offerId);
    $("#submitOfferButton").on("click", function () {
        var newOffer = {
            offerId: $("#offerId"),
            offerItemName: $("#offerItem").val().trim(),
            offerItemZip: $("#offerZipcode").val(),
            offerFullName: $("#offerName").val(),
            offerItemDescription: $("#offerDescription").val().trim(),
            offerContactInfo: $("#offerContactInfo").val()
            // created_at: moment().format("MM-DD-YYYY HH:mm:ss")
        };
        console.log(newOffer)
        $('#trade-modal').modal('close');
        $.ajax({
            contentType: "application/JSON",
            url: "/api/offers",
            method: "POST",
            data: JSON.stringify(newOffer)
        }).then(function (offerResponse) {
            console.log(offerResponse);
            var offercard = $("<div>");
            offercard.addClass("offercard");

            offercard.append("<p id='offerItem'>" + offerResponse.offerItemName +"</p>");
            offercard.append("<p id='offerDescription'>" + offerResponse.offerItemDescription + "</p>");
            offercard.append("<p id='offerName'>" + offerResponse.offerFullName + "</p>");
            offercard.append("<p id='offerZipcode'>" + offerResponse.offerItemZip + "</p>");
            offercard.append("<p id='offerContactInfo'>" + offerResponse.offerContactInfo + "</p>");

            $("#feedcontaineroffers").prepend(offercard);
            
           
        })
    })
}
)