$(document).ready(function () {

  GOVUK.toggle.init();

  // Initialise auto-suggest fields
  //$('.auto-suggest').selectToAutocomplete();
  

  // Uses radio buttons to emulate a more usable select box
  $(".js-form-select label").click(function() {
    $(this).closest('.js-form-select').toggleClass("open");
  });

  // Postcode lookup
  // Hide address list if user changes postcode
    var lastValue = '';
	$("#postcode").on('change keyup paste mouseup', function () {
      if ($(this).val() != lastValue) {
        lastValue = $(this).val();
  		$("#address-list").addClass("js-hidden");
  		$("#submit-postcode").removeClass("js-hidden");
	 }
	});
  
  //LIS
  function updateStatus() {
    if(document.getElementById("about_you_status") && 
      document.getElementById("about_partner_status") &&
      document.getElementById("property_status") &&
      document.getElementById("where_you_live_status")) {
        var aboutYouStatus = document.getElementById("about_you_status"),
        aboutPartnerStatus = document.getElementById("about_partner_status"),
        propertyStatus = document.getElementById("property_status"),
        whereYouLiveStatus = document.getElementById("where_you_live_status"),
        sections = [aboutYouStatus, aboutPartnerStatus, propertyStatus, whereYouLiveStatus];
        for (var section in sections) {
          if (sections[section].innerHTML === "Started") {
            sections[section].classList.add("incomplete-text");
            sections[section].classList.remove("notstarted-text");
          } else if (sections[section].innerHTML === "Completed") {
            sections[section].classList.add("complete-text");
            sections[section].classList.remove("notstarted-text", "incomplete-text");
          }
        }
      }
  }
  updateStatus();
  
});