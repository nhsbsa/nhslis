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
  
  //formatting for the list added in routes.js
  function updateList() {
    if(document.getElementById("people-list")) {
      var peopleList = document.getElementById("people-list").innerHTML;
      console.log(document.getElementById("people-list").innerHTML);
      peopleList = peopleList.replace(/\,/g, "</li> <li>");
      document.getElementById("people-list").innerHTML = peopleList;
    }
  }
  updateList();

  //update the summary
  var updateSummary = function (answer, rows) {
    answer = answer.innerHTML;
    if (answer == 'No') {
      for (var i = 0; i < rows.length; i++) {
        rows[i].style.display = 'none';
      }
    }
  };
  
  // remove all pension answers if the user says no
  if(document.getElementById("pension_answer")) {
    
//    if pension = no hide all
//    if pension credit = no hide pen credit amount
//    if state pension = no hide state pension amount
//    if another pension = no hide other pension amount
    
    updateSummary(document.getElementById("pension_answer"), 
    [ 
      document.getElementById("credit_row"), 
      document.getElementById("credit_payments_row"), 
      document.getElementById("state_pension_answer"),
      document.getElementById("state_payments_row"),
      document.getElementById("private_pension_answer"),
      document.getElementById("private_payments_row")
    ]);
    updateSummary(document.getElementById("credit_answer"), 
    [ 
      document.getElementById("credit_payments_row") 
    ]);
    updateSummary(document.getElementById("state_pension_answer"), 
    [ 
      document.getElementById("state_payments_row") 
    ]);
  };  
  
  
});

jQuery(document).ready(function($) {
    $(".clickable-row").click(function() {
        window.document.location = $(this).data("href");
    });
});
