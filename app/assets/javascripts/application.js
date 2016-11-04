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
  
  var buildRow = function(q, a, url) {
    return  '<tr>' +
            '<td>' + q + '</td>' +
            '<td>' + a + '</td>' +
            '<td><a href="' + url + '">Change this</a></td>' +
            '</tr>';
  };
  
  if(document.getElementById('pension_answer')) {
    var pensionAnswer = document.getElementById('pension_answer').innerHTML;
    var creditAnswer = document.getElementById('credit_answer').innerHTML;
    var stateAnswer = document.getElementById('state_answer').innerHTML;
    var stateAmount = document.getElementById('state_amount').innerHTML;
    var stateFrequency = document.getElementById('state_frequency').innerHTML;
    var privateAnswer = document.getElementById('private_answer').innerHTML;
    var privateFrequency = document.getElementById('private_frequency').innerHTML;
    var privateAmount = document.getElementById('private_amount').innerHTML;
    var pensionSummary = [];
    var pensionTable = document.getElementById('pension_table');

    pensionSummary.push(buildRow(
      'Do you get a pension?', 
      pensionAnswer, 
      'pension/newpension'));
    if(pensionAnswer === 'Yes') {
      pensionSummary.push(buildRow(
        'Do you get Pension Credit Savings Credit?', 
        creditAnswer,
        'pension/newpen-credit'));
      if(creditAnswer === 'Yes') {
      pensionSummary.push(buildRow(
        'Pension Credit Savings Credit payments', 
        '£121 per week',
        'pension/newpen-credit'));
      }
      pensionSummary.push(buildRow(
        'Do you get a state pension?', 
        stateAnswer,
        'pension/pension'));
      if(stateAnswer === 'Yes') {
      pensionSummary.push(buildRow(
        'State pension payments', 
        '£' + stateAmount + ' ' + stateFrequency,
        'pension/other-pension'));
      }
      pensionSummary.push(buildRow(
        'Do you get another pension?', 
        privateAnswer,
        'pension/other-pension'));
    }
    if(privateAnswer === 'Yes') {
      pensionSummary.push(buildRow(
        'First pension payments', 
        '£' + privateAmount + ' ' + privateFrequency,
        'pension/other-pension'));
    }
    pensionTable.innerHTML = pensionSummary;
  }

});

jQuery(document).ready(function($) {
    $(".clickable-row").click(function() {
        window.document.location = $(this).data("href");
    });
});