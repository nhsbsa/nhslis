//import the person constructor
var person = require("./person.js");

//import the LIS application constructor
  var aboutYouStatus = "Not started";
  var aboutPartnerStatus= "Not started";
  var propertyStatus = "Not started";
  var whereYouLiveStatus = "Not started";
  var aboutYouLink = "Start";
  var aboutPartnerLink = "Start";
  var propertyLink = "Start";
  var whereYouLiveLink = "Start";
  var resetApplication = function() {
    aboutYouStatus = "Not started";
    aboutPartnerStatus = "Not started";
    propertyStatus = "Not started";
    whereYouLiveStatus = "Not started";
    aboutYouLink = "Start";
    aboutPartnerLink = "Start";
    propertyLink = "Start";
    whereYouLiveLink = "Start";
    jointOwnerText : 'Is anyone else other than your partner a joint owner of the property you live in',
    console.log('Resetting application now... ' + aboutPartnerStatus);
  };
  allComplete = function () {
    if (aboutYouStatus === 'Completed' &&
      aboutPartnerStatus === 'Completed' &&
      propertyStatus === 'Completed' &&
      whereYouLiveStatus === 'Completed') {
      return true;
    } else {
      return false;
    }
  };
  setPartnerText = function (partner) {
    if (partner === false) {
      partnerBothText = 'you';
      partnerOrText = 'you';
      partnerAndText = 'you';
      partnersText = 'your';
      partnerLiveText = 'Does anyone else live with you?';
      jointTennantText = 'Is anyone else a joint tenant of the place you live';
      jointOwnerText = 'Is anyone else a joint owner of the property you live in';
      otherThanPartner = ' ';
      iWe = 'I';
    } else {
      partnerBothText = 'you, your partner or both of you';
      partnerOrText = 'you or your partner';
      partnerAndText = 'you and your partner';
      partnersText = "you and your partner's";
      partnerLiveText = 'Does anyone else other than your partner live with you?';
      jointTennantText = 'Is anyone else other than your partner a joint tenant of the place you live';
      jointOwnerText = 'Is anyone else other than your partner a joint owner of the property you live in';
      otherThanPartner = 'other than your partner';
      iWe = 'we';
    }
  };


//var LIS = require('./lis.js').LIS;
var continueText = 'Continue';
var changeText = 'View or change';
var completedText = "Completed";

//summary
var contactText;
var contactValue;

var helpLevel = 3;

var peopleList;

var resetPeople = function () {
  peopleList = [];
  console.log('resetting people');
};

resetPeople();

var
  sprint,
  pensionNumber;
  //pension,
  //pensions,
  //benefits,
  //firstBenefit,
  //myWork,
  //partnerBenefits,
  //firstPartnerBenefit,
  //accounts,
  //firstSavingsAcc,
  //stateP,
  //privateP,

//create an applicant
var applicant = person.createPerson(
  this.firstName = null,
  this.lastName = null,
  this.dobDay = null,
  this.dobMonth = null,
  this.dobYear = null,
  this.email = null,
  this.telephone = null,
  this.partner = true,
  this.pension = 'No',
  this.statePension = false,
  this.statePensionAmount = null,
  this.statePensionFrequency = null,
  this.privatePension = false,
  this.privatePensionAmount = null,
  this.privatePensionFrequency = null,
  this.employmentPension = false,
  this.warPension = false,
  this.savingsCredit = false,
  this.savings = false,
  this.premiumBonds = false,
  this.disabilityLivingAllowance = false,
  this.attendanceAllowance = false,
  this.homeOwner = false,
  this.tennant = false,
  this.guest = false,
  this.othersAtHome = false,
  this.bankAccount = false,
  this.contactPref = null,
  this.councilTaxFreq = null,
  this.penCount = 0
);

//create a partner
var partner = person.createPerson(
  this.firstName = null,
  this.lastName = null,
  this.dobDay = null,
  this.dobMonth = null,
  this.dobYear = null,
  this.email = null,
  this.telephone = null,
  this.partner = false,
  this.pension = 'No',
  this.statePension = false,
  this.statePensionAmount = null,
  this.statePensionFrequency = null,
  this.privatePension = false,
  this.privatePensionAmount = null,
  this.privatePensionFrequency = null,
  this.employmentPension = false,
  this.warPension = false,
  this.savings = false,
  this.premiumBonds = false,
  this.disabilityLivingAllowance = false,
  this.attendanceAllowance = false,
  this.homeOwner = false,
  this.tennant = false,
  this.guest = false,
  this.bankAccount = false,
  this.penCount = 0
);

applicant.penCount = 0;
partner.penCount = 0;
applicant.pension = 'No';
var address;

//create someone else in the household
var householder = {
  firstName : null,
  lastName : null,
  age : 0,
  relationship : null,
  financialSupport : null,
  underFifteen : false,
  sixteenToNineteen : false,
  overNineteen : false,
  work : false,
  benefits : false,
  ageRange : function () {
    if (householder.age <= 15) {
      householder.underFifteen = true;
    } else if (householder.age >= 16 && householder.age <= 19) {
      householder.sixteenToNineteen = true;
    } else if (householder.age >= 20) {
      householder.overNineteen = true;
    }
  },
  resetHouseHolder : function () {
    householder.relationship = null;
    householder.financialSupport = null;
    householder.underFifteen = false;
    householder.sixteenToNineteen = false;
    householder.overNineteen = false;
    householder.work = false;
    householder.benefits = false;
    console.log('resetting householder...');
  }
};

function convertFrequency(frequency) {
  if (frequency === 'fourweekly') {
    return ('every 4 weeks');
  } else if (frequency === 'fortnight') {
    return ('every 2 weeks');
  } else if (frequency === 'weekly') {
    return ('every week');
  } else if (frequency === 'month') {
    return ('every month');
  } else if (frequency === 'year') {
    return ('every year');
  }
}

var convertMonth = function (monthInt) {
  monthInt = Number(monthInt);
  if (monthInt === 1) {
    return ("January");
  } else if (monthInt === 2) {
    return ("February");
  } else if (monthInt === 3) {
    return ("March");
  } else if (monthInt === 4) {
    return ("April");
  } else if (monthInt === 5) {
    return ("May");
  } else if (monthInt === 6) {
    return ("June");
  } else if (monthInt === 7) {
    return ("July");
  } else if (monthInt === 8) {
    return ("August");
  } else if (monthInt === 9) {
    return ("September");
  } else if (monthInt === 10) {
    return ("October");
  } else if (monthInt === 11) {
    return ("November");
  } else if (monthInt === 12) {
    return ("December");
  }
};

var boolToString = function (myBool) {
  if (myBool === true) {
    return 'Yes';
  } else if (myBool === false) {
    return 'No';
  }
};

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};

var querystring = require('querystring');

function resetVars() {
  stateP = false;
  privateP = false;
}
resetVars();

module.exports = {
  bind : function (app) {
    function find_gp_practice(slug) {
      return app.locals.gp_practices.filter(
        function (p) {
          return p.slug === slug;
        }
      )[0];
    }

    //setPartnerText(applicant.partner);

    app.get('/', function (req, res) {
      res.render('index');
      resetPeople();
      resetVars();
      applicant.resetVars();
      applicant.resetBenefits();
      console.log('applicant =');
      applicant.printPerson();
      partner.resetBenefits();
      console.log('partner =');
      partner.printPerson();
      applicant.resetPartner();
      resetApplication();
      setPartnerText();
    });
    
    


    // -------------
    // Pre questions
    // -------------

    // partner handler v2
    app.get(/p2-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      if (req.query.partner === 'yes') {
        applicant.partner = true;
        //aboutPartnerStatus = "Started";
        //aboutPartnerLink = continueText;
      } else if (req.query.partner === 'no') {
        applicant.partner = false;
        //aboutPartnerStatus = completedText;
        //aboutPartnerLink = changeText;
      }
      setPartnerText(applicant.partner);
      res.render('lis/' + sprint + '/ko', {
        'partnerortext' : partnerOrText,
        'iwe' : iWe
      });
    });

    // kickout-handler
    app.get(/kickout-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      if (req.query.kickout === 'continue') {
        res.render('lis/' + sprint + '/guarantee-credit', {
          'partnerortext' : partnerOrText
        });
      } else {
        res.redirect('../exempt-kickout');
      }
    });
    
    // guacredit-kickout-handler v2
    app.get(/guacredit-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      if (req.query.guacredit === 'yes') {
        res.redirect('../exempt-kickout');
      } else {
        res.render('lis/' + sprint + '/tax-credits', {
          'partnerortext' : partnerOrText
        });
      }
    });
    
    // carehome-handler
    app.get(/carehome-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      if (req.query.carehome === 'yes') {
        res.redirect('../sc/authority-assessed');
      } else {
        res.render('lis/' + sprint + '/savings', {
          'partnerbothtext' : partnerBothText
        });
      }
    });
    
    // hospital-handler
    app.get(/hospital2-handler/, function (req, res) {
      res.render('lis/' + sprint + '/savings', {
        'partnerbothtext' : partnerBothText
      });
    });
    
     // carehome-handler v2
    app.get(/carehome-v2-handler/, function (req, res) {
      if (req.query.carehome === 'yes') {
        res.redirect('../sc/authority-assessed');
      } else {
        res.render('lis/' + sprint + '/hospital', {
          'partnerortext' : partnerOrText
        });
      }
    });
    
    app.get(/saving-ch/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/' + sprint + '/sc/saving-ch', {
        'partnerbothtext' : partnerBothText
      });
    });

    // tax credits cert-handler
    app.get(/tce-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      if (req.query.taxcredits === 'yes') {
        res.redirect('../tce-kickout');
      } else {
        res.render('lis/' + sprint + '/care-home', {
          'partnerortext' : partnerOrText
        });
      }
    });

    // authority-assessed-handler
    app.get(/authority-assessed-handler/, function (req, res) {
      if (req.query.authority === 'yes') {
        res.redirect('../about-you');
      } else {
        res.redirect('../saving-ch');
      }
    });
        
    // carehome savings kickout handler v2
    app.get(/chome-savings-handler/, function (req, res) {
      if (req.query.savings === 'yes') {
        res.redirect('../../savings-kickout');
      } else {
        res.redirect('../../need-to-know');
      }
    });
    
    // carehome savings kickout handler
    app.get(/carehome-savings-handler/, function (req, res) {
      if (req.query.savings === 'no') {
        res.redirect('../../savings-kickout');
      } else {
        res.redirect('../../need-to-know');
      }
    });

    // savings kickout handler v2
    app.get(/savings-ko-handler/, function (req, res) {
      if (req.query.savings === 'no') {
        res.redirect('../need-to-know');
      } else {
        res.redirect('../savings-kickout');
      }
    });
    
    
    // savings kickout handler
    app.get(/sko-handler/, function (req, res) {
      if (req.query.savings === 'yes') {
        res.redirect('../savings-kickout');
      } else {
        res.redirect('../need-to-know');
      }
    });
    
    // need to know
    app.get(/need-to-know/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/' + sprint + '/need-to-know', {
        'partnerstext' : partnersText
      });
    });
    


    // -----------------
    // Save and continue
    // -----------------

    // handles the first email at save and continue
    app.get(/ref-email-handler/, function (req, res) {
      if (req.query.email != '') {
        applicant.email = req.query.email;
        console.log('applicant.email = ' + applicant.email);
      }
      res.redirect('../mem-word');
    });
    
    // telephone-number-handler
    app.get(/telephone-number-handler/, function (req, res) {
      applicant.telephone = req.query.telephone;
      console.log('applicant.telephone = ' + applicant.telephone);
      res.redirect('../code');
    });
    
    // save-continue/code
    app.get(/code/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/' + sprint + '/save-continue/code', {
        'telephone' : applicant.telephone
      });
    });

        // email-address-handler
    app.get(/email-address-handler/, function (req, res) {
      if (req.query.email != '') {
        applicant.email = req.query.email;
      }
      res.redirect('../work');
    });


    // ----
    // Home
    // ----
    
    app.get(/lis-home/, function (req, res) {
      sprint = req.url.charAt(5);
      console.log(aboutPartnerStatus);
      res.render('lis/' + sprint + '/lis-home', {
        'aboutYouStatus' : aboutYouStatus,
        'aboutPartnerStatus' : aboutPartnerStatus,
        'propertyStatus' : propertyStatus,
        'whereYouLiveStatus' : whereYouLiveStatus,
        'aboutYouLink' : aboutYouLink,
        'aboutPartnerLink' : aboutPartnerLink,
        'propertyLink' : propertyLink,
        'whereYouLiveLink' : whereYouLiveLink
      });
    });
    
    // home updated
    app.get(/home-updated/, function (req, res) {
      sprint = req.url.charAt(5);
      console.log(aboutPartnerStatus);
      res.render('lis/' + sprint + '/home-updated', {
        'aboutYouStatus' : aboutYouStatus,
        'aboutPartnerStatus' : aboutPartnerStatus,
        'propertyStatus' : propertyStatus,
        'whereYouLiveStatus' : whereYouLiveStatus,
        'aboutYouLink' : aboutYouLink,
        'aboutPartnerLink' : aboutPartnerLink,
        'propertyLink' : propertyLink,
        'whereYouLiveLink' : whereYouLiveLink
      });
    });

    
    // ---------
    // About you
    // ---------

    // registration-handler
    app.get(/registration-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      aboutYouStatus = "Started";
      aboutYouLink = continueText;
      applicant.firstName = req.query.firstname;
      applicant.lastName = req.query.lastname;
      applicant.dobDay = req.query.day;
      applicant.dobMonth = convertMonth(req.query.month);
      applicant.dobYear = req.query.year;
      console.log(applicant.dobYear);
      res.redirect('../contact-prefs');
    });

    app.get(/name-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      aboutYouStatus = "Started";
      console.log(aboutYouStatus);
      aboutYouLink = continueText;
      applicant.firstName = req.query.firstname;
      applicant.lastName = req.query.lastname;
      applicant.dobDay = req.query.day;
      applicant.dobMonth = convertMonth(req.query.month);
      applicant.dobYear = req.query.year;
      console.log(applicant.dobYear);
      res.redirect('../dob');
    });
    
    // dob handler
    app.get(/dob-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      applicant.dobDay = req.query.day;
      applicant.dobMonth = convertMonth(req.query.month);
      applicant.dobYear = req.query.year;
      console.log(applicant.dobYear);
      res.render('lis/' + sprint + '/you/contact-prefs', {
        'applicantFirstName' : applicant.firstName
      });
    });
    
    // contact-handler 2
    app.get(/contact-handler2/, function (req, res) {
      if (req.query.contact === "email") {
        applicant.contactPref = 'email';
        if (applicant.email != undefined) {
          res.redirect('../email');
        } else {
          res.redirect('../new-mail');
        }
      } else if (req.query.contact === "text") {
        applicant.contactPref = 'text';
        if (applicant.telephone != undefined) {
          res.redirect('../telephone');
        } else {
          res.redirect('../telephone');
        }
      } else if (req.query.contact === "telephone") {
        applicant.contactPref = 'telephone';
        res.redirect('../telephone');
      } else if (req.query.contact === "post") {
        applicant.contactPref ='post';
        res.redirect('../work');
      } else {
        res.redirect('../work');
      }
    });
    
    // contact-handler
    app.get(/contact-handler/, function (req, res) {
      if (req.query.contact === "email") {
        applicant.contactPref ='email';
        if (applicant.email != undefined) {
          res.redirect('../email');
        } else {
          res.redirect('../new-mail');
        }
      } else if (req.query.contact === "telephone") {
        applicant.contactPref = 'telephone';
        res.redirect('../telephone');
      } else if (req.query.contact === "both") {
        applicant.contactPref = 'both';
        res.redirect('../email');
      } else {
        applicant.contactPref = 'none';
        res.redirect('../work');
      }
    });
    
    // email address
    app.get(/email/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/' + sprint + '/you/email', {
        'email' : applicant.email
      });
    });
    
    // email handler
    app.get(/mail-handler/, function (req, res) {
      applicant.email = req.query.email;
      if (applicant.contactPref === 'both') {
        res.redirect('../telephone');
      } else {
        res.redirect('../work');
      }
    });
        
    // telephone handler
    app.get(/telephone/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/' + sprint + '/you/telephone', {
        'telephone' : applicant.telephone
      });
    });
    
    // about you summary
    app.get(/about-you-summary/, function (req, res) {
      sprint = req.url.charAt(5);
      if (applicant.contactPref == 'telephone' || applicant.contactPref == 'text') {
        contactText = 'Telephone number';
        contactValue = applicant.telephone;
      } else if (applicant.contactPref == 'email') {
        contactText = 'Email address';
        contactValue = applicant.email;
      } else if (applicant.contactPref == 'post') {
        contactText = 'Post';
        contactValue = undefined;
      }
      if (applicant.contactPref != undefined) {
        applicant.contactPref = applicant.contactPref.toProperCase();
      } 
      var stateFrequency;
      var privateFrequency;
      if (applicant.statePensionFrequency != undefined) {
      	stateFrequency = convertFrequency(applicant.statePensionFrequency);
      }
      if (applicant.privatePensionFrequency != undefined) {
        privateFrequency = convertFrequency(applicant.privatePensionFrequency);
      }
      res.render('lis/' + sprint + '/you/about-you-summary', {
        'applicantFullName' : applicant.fullName(),
        'dobday' : applicant.dobDay,
        'dobmonth' : applicant.dobMonth,
        'dobyear' : applicant.dobYear,
        'contact' : applicant.contactPref,
        'contacttext' : contactText,
        'contactvalue' : contactValue,
        'pensionanswer' : applicant.pension,
        'savingscredit' : boolToString(applicant.savingsCredit),
        'stateanswer' : applicant.statePension,
        'stateamount' : applicant.statePensionAmount,
        'statepensionfrequency' : stateFrequency,
        'privateanswer' : applicant.privatePension,
        'privatefrequency' : applicant.privatePensionFrequency,
        'privateAmount' : applicant.privatePensionAmount
      });
    });

    
    // -------
    // Pension
    // -------
    
    // pension credit handler sprints: 6, 7, 8
    app.get(/newcred-handler/, function (req, res) {
      if (req.query.savingscredit === 'yes') {
        applicant.savingsCredit = true;
        res.redirect('../newcredit-amount');
      } else if (req.query.savingscredit === 'no') {
          applicant.savingsCredit = false;
        res.redirect('../statepension');
      }
    });
    
    app.get(/newpension/, function (req, res) {
      sprint = req.url.charAt(5);
      applicant.pension = "No";
      console.log(applicant.pension);
      res.render('lis/' + sprint + '/you/pension/newpension');
    });

    // newpen-handler
    app.get(/newpen-handler/, function (req, res) {
      if (req.query.pension === 'yes') {
        applicant.pension = 'Yes';
        res.redirect('../newpen-credit');
      } else {
        applicant.pension = 'No';
        res.redirect('../../benefits/benefit-sprint3');
      }
    });
    
    // newpen-handler
    app.get(/stateamount-handler/, function (req, res) {
      applicant.statePensionAmount = req.query.moneyamount;
      applicant.statePensionFrequency = req.query.frequency;
      res.redirect('../other-pension');
    });
    
    // otherpen-handler
    app.get(/otherpen-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      if (req.query.pension === 'a-yes') {
        applicant.privatePension = 'Yes';
        pensionNumber = applicant.updatePensionNumber(applicant.penCount);
        applicant.penCount++;
        res.render('lis/' + sprint + '/you/pension/pensionamount', {
          pensionNumber : pensionNumber
        });
      } else if (req.query.pension === 'p-yes') {
        pensionNumber = partner.updatePensionNumber(partner.penCount);
        partner.penCount++;
        res.render('lis/' + sprint + '/partner/pension/pensionamount', {
          pensionNumber : pensionNumber
        });
      } else {
        res.redirect('../../benefits/benefit-sprint3');
      }
    });
    
    
    
    app.get(/p-amount-handler/, function (req, res) {
      applicant.privatePensionAmount = req.query.moneyamount;
      applicant.privatePensionFrequency = req.query.frequency;
      res.redirect('../other-pension');
    });
    
     // newstate-handler
    app.get(/newstate-handler/, function (req, res) {
      if (req.query.pension === 'yes') {
        applicant.statePension = 'Yes';
        res.redirect('../state-amount');
      } else {
        applicant.statePension = 'No';
        res.redirect('../other-pension');
      }
    });
    
    // pension-handler
    app.get(/pension-handler/, function (req, res) {
      if (req.query.pension === 'yes') {
        res.redirect('../pension-credit');
      } else {
        res.redirect('../../benefits/benefit-sprint3');
      }
    });
    
    // pension credit handler sprints: 6, 7, 8
    app.get(/pencred-handler6/, function (req, res) {
      if (req.query.savingscredit === 'yes') {
        applicant.savingsCredit = true;
        res.redirect('../credit-amount');
      } else if (req.query.savingscredit === 'no') {
        applicant.savingsCredit = false;
        res.redirect('../pension-type');
      } else if (req.query.partnersavingcredit === 'yes') {
        partner.savingsCredit = true;
        res.redirect('../credit-amount');
      } else if (req.query.partnersavingcredit === 'no') {
        partner.savingsCredit = false;
        res.redirect('../pension-type');
      }
    });
    
    // pension-type-handler
    app.get(/pension-type-handler/, function (req, res) {
      applicant.resetPension();
      pensions = req.query.pensiontype;
      console.log(pensions);
      sprint = req.url.charAt(5);
      if (pensions === 'state') {
        applicant.statePension = true;
        res.redirect('../pension-amount');
      } else if (pensions === 'private') {
        applicant.privatePension = true;
        res.redirect('../private-pension-amount');
      } else if (pensions === 'employment') {
        applicant.employmentPension = true;
        res.redirect('../employment-pension-amount');
      } else if (pensions === 'wardisablement') {
        applicant.warPension = true;
        res.redirect('../war-pension');
      } else if (pensions === 'warwidow') {
        applicant.warWidowPension = true;
        res.redirect('../war-widow-pension');
      } else if (pensions === undefined) {
        res.redirect('../pension-type');
      } else {
        applicant.pensionChecker(pensions);
        console.log(applicant.statePension + " " + applicant.privatePension);
        if (applicant.statePension === true) {
          res.redirect('../pension-amount');
        } else if (applicant.privatePension === true) {
          res.redirect('../private-pension-amount');
        } else if (applicant.employmentPension === true) {
          res.redirect('../employment-pension-amount');
        } else if (applicant.warPension === true) {
          res.redirect('../war-pension');
        } else if (applicant.warWidowPension === true) {
          res.redirect('../war-widow-pension');
        } else {
          res.redirect('../benefit-sprint3');
        }
      }
    });
    
    // state-pension-handler
    app.get(/sp-handler/, function (req, res) {
      applicant.statePensionAmount = req.query.amount;
      applicant.statePensionFrequency = req.query.frequency;
      if (applicant.privatePension === true) {
        res.redirect('../private-pension-amount');
      } else if (applicant.employmentPension === true) {
        res.redirect('../employment-pension-amount');
      } else {
        res.redirect('../../benefits/benefit-sprint3');
      }
    });

    // private-pension-handler
    app.get(/pp-handler/, function (req, res) {
      if (applicant.employmentPension === true) {
        res.redirect('../employment-pension-amount');
      } else if (applicant.warPension === true) {
        res.redirect('../war-pension');
      } else if (applicant.warPension === false) {
        res.redirect('../../benefits/benefit-sprint3');
      }
    });

    // private-pension-handler
    app.get(/pp2/, function (req, res) {
      if (req.query.pp === 'yes') {
        res.redirect('../private-pension-amount');
      } else if (applicant.employmentPension === true) {
        res.redirect('../employment-pension-amount');
      } else if (applicant.warPension === true) {
        res.redirect('../war-pension');
      } else if (applicant.warPension === false) {
        res.redirect('../../benefits/benefit-sprint3');
      }
    });

     // employment-pension-handler
    app.get(/ep-handler/, function (req, res) {
      if (applicant.warPension === true) {
        res.redirect('../war-pension');
      } else if (applicant.warPension === false) {
        res.redirect('../../benefits/benefit-sprint3');
      }
    });

    // employment-pension-handler
    app.get(/ep2/, function (req, res) {
      if (req.query.ep === 'yes') {
        res.redirect('../employment-pension-amount');
      } else if (applicant.warPension === true) {
        res.redirect('../war-pension');
      } else if (applicant.warPension === false) {
        res.redirect('../../benefits/benefit-sprint3');
      }
    });

    // war-pension-handler
    app.get(/wp-handler/, function (req, res) {
      if (applicant.warWidowPension === true) {
        res.redirect('../war-widow-pension');
      } else if (applicant.warWidowPension === false) {
        res.redirect('../../benefits/benefit-sprint3');
      }
    });


    // --------
    // Benefits
    // --------

    // benefit handler
    app.get(/sprint3-benefit-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      applicant.resetBenefits();
      benefits = req.query.sprint3benefits;
      console.log(typeof benefits);
      var firstBenefit = applicant.benefitChecker(benefits);
      //if (firstBenefit === "aa") {
      //  res.render('lis/' + sprint + '/you/benefits/aa');
      //} else
      //if (firstBenefit === "ctc") {
      //  res.render('lis/' + sprint + '/you/benefits/ctc');
      //} else
      if (firstBenefit === "dla") {
        res.redirect('../dla');
      } else if (firstBenefit === "pip") {
        res.redirect('../pip');
      } else {
        res.redirect('../benefit4');
      }
    });

    //child tax credit
    app.get(/ctc-handler/, function (req, res) {
      if (applicant.disabilityLivingAllowance === true) {
        res.redirect('../dla');
      } else if (applicant.personalIndependence === true) {
        res.redirect('../pip');
      } else {
        res.redirect('../benefit4');
      }
    });

    // care-allowance
    app.get(/care-allowance/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/' + sprint + '/you/benefits/care-allowance', {
        'otherthanartner' : otherThanPartner
      });
    });

    // partner care-allowance
    app.get(/partnercare-allowance/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/' + sprint + '/partner/benefits/partner-careallowance', {
        'otherthanartner' : otherThanPartner
      });
    });

    // disability living allowance
    app.get(/dla-handler/, function (req, res) {
      if (applicant.personalIndependence === true) {
        res.redirect('../pip');
      } else {
        res.redirect('../benefit4');
      }
    });

    // attendance allowance handler
    app.get(/attendance-allowance-handler/, function (req, res) {
      if (applicant.childTaxCredits === true) {
        res.redirect('../benefits/ctc');
      } else if (applicant.disabilityLivingAllowance === true) {
        res.redirect('../benefits/dla');
      } else if (applicant.personalIndependence === true) {
        res.redirect('../benefits/pip');
      } else {
        res.redirect('../benefits/benefit4');
      }
    });

    // updates the home page when the you section is completed
    app.get(/you-done/, function (req, res) {
      aboutYouStatus = completedText;
      aboutYouLink = changeText;
      if (allComplete() === true) {
        res.redirect('../../home-updated');
      } else {
        res.redirect('../../lis-home');
      }
    });

    // Old routes...

    // pencred-handler sprint: 5
    app.get(/pencred-handler5/, function (req, res) {
      console.log(req.query);
      if (req.query.savingsCredit === 'yes') {
        res.redirect('../credit-amount');
      } else {
        res.redirect('../../benefits/benefit-sprint3');
      }
    });

    // pencred-handler sprint: 4, 3
    app.get(/pencred-handler3/, function (req, res) {
      if (req.query.prencred === 'gc') {
        res.redirect('../../../kickout');
      } else {
        res.redirect('../pension-type');
      }
    });


    // -------
    // Partner
    // -------



    // partner summary
    app.get(/p-status/, function (req, res) {
      sprint = req.url.charAt(5);
      console.log(applicant.partner);
      res.render('lis/' + sprint + '/partner/p-status', {
        'partnerstatus' : applicant.partner
      });
    });

    // partner handler
    app.get(/partner-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      aboutPartnerStatus = "Started";
      aboutPartnerLink = continueText;
      if (req.query.partner === 'yes') {
        applicant.partner = true;
        setPartnerText(applicant.partner);
        res.redirect('../basic');
      } else if (req.query.partner === 'no') {
        applicant.partner = false;
        setPartnerText(applicant.partner);
        res.redirect('../summary-no');
      }
    });

     // partner summary
    app.get(/summary-full/, function (req, res) {
      res.render('../summary-full');
    });

    // updates the home page when the partner section is completed
    app.get(/partner-done/, function (req, res) {
      aboutPartnerStatus = completedText;
      aboutPartnerLink = changeText;
      if (allComplete() === true) {
        res.redirect('../../home-updated');
      } else {
        res.redirect('../../lis-home');
      }
    });


    // ------
    // Assets
    // ------

    // property
    app.get(/property/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/' + sprint + '/assets/property', {
        'partnerortext' : partnerOrText,
        'partnerandext' : applicant.partnerAndText
      });
    });

    // property handler
    app.get(/land-handler/, function (req, res) {
      propertyStatus = "Started";
      propertyLink = continueText;
      if (req.query.property === "yes") {
        res.redirect('../second-address');
      } else {
        res.redirect('../accounts');
      }
    });
          // home address for property handler
    app.get(/otherProp-handler/, function (req, res) {
      LIS.propertyStatus = "Started";
      LIS.propertyLink = continueText;
        address = req.query.addressLineone;
      if (req.query.property === "yes") {
        res.redirect('../second-address');
      } else {
        res.redirect('../accounts');
      }
    });
      
     
          // property handler
    app.get(/address-prop/, function (req, res) {
        sprint = req.url.charAt(5);
        res.render('lis/' + sprint + '/assets/address-prop', {
         'addressLineone' : address               
        });
      });
      


    // property handler
    app.get(/assets-mortgage-handler/, function (req, res) {
      if (req.query.mortgage === "yes") {
        res.redirect('../outstanding');
      } else {
        res.redirect('../property');
      }
    });

    // money
    app.get(/accounts/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/' + sprint + '/assets/accounts', {
        'partnerortext' : partnerOrText,
        'partnerandtext' : applicant.partnerAndText
      });
    });

    // accounts
    app.get(/accounts/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/' + sprint + '/assets/accounts', {
        'partnerortext' : partnerOrText,
        'partnerandtext' : applicant.partnerAndText
      });
    });

    // account-type-handler
    app.get(/account-type-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      applicant.resetAccounts();
      var accounts = req.query.banktype;
      var firstSavingsAcc = applicant.savingChecker(accounts);
      if (firstSavingsAcc === 'bank') {
        res.render('lis/' + sprint + '/assets/bank', {
          'partnerortext' : partnerOrText,
          'partnerandtext' : applicant.partnerAndText
        });
      } else if (firstSavingsAcc === 'pb') {
        res.render('lis/' + sprint + '/assets/premium-bonds', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : applicant.partnerAndText
        });
      } else {
        res.render('lis/' + sprint + '/assets/assets-other', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : applicant.partnerAndText
        });
      }
    });

    // bank accounts handler
    app.get(/bank-savings-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      console.log('here');
      if (applicant.premiumBonds === true) {
        res.render('lis/' + sprint + '/assets/premium-bonds');
      } else {
        res.render('lis/' + sprint + '/assets/assets-other', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : applicant.partnerAndText
        });
      }
    });

    //p remium-bond-handler
    app.get(/premium-bond-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/' + sprint + '/assets/assets-other', {
        'partnerortext' : partnerOrText,
        'partnerandrext' : applicant.partnerAndText
      });
    });
    
    // assets/other
    app.get(/assets-other/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('../assets-other', {
        'partnerortext' : partnerOrText,
        'partnerandtext' : applicant.partnerAndText
      });
    });

    // updates the home page when the assets section is completed
    app.get(/assets-done/, function (req, res) {
      propertyStatus = completedText;
      propertyLink = changeText;
      if (allComplete() === true) {
        res.redirect('../../home-updated');
      } else {
        res.redirect('../../lis-home');
      }
    });


    // --------------
    // Where you live
    // --------------

    // hospital-handler
    app.get(/hospital-handler/, function (req, res) {
      whereYouLiveStatus = "Started";
      whereYouLiveLink = continueText;
      res.redirect('../you-live');
    });

    // home-handler
    app.get(/home-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      console.log(req.query);
      if (req.query.home === 'own') {
        applicant.homeOwner = true;
        res.redirect('../mortgaged/joint-own');
      } else if (req.query.home === 'rented') {
        applicant.tennant = true;
        res.redirect('../joint-tenant');
      } else if (req.query.home === 'guest') {
        applicant.guest = true;
        res.redirect('../guest/address');
      } else if (req.query.home === 'homeless') {
        res.redirect('../living-summary-nh');
      } else {
        res.redirect('../home');
      }
    });
        
    // rent to parents relitives friends
    app.get(/prf-handler/, function (req, res) {
      if (req.query.prf === 'yes') {
        res.redirect('../guest/address');
      } else {
        res.redirect('../joint-tenant');
      }
    });

    // home
    app.get(/your-home/, function (req, res) {
      applicant.resetLivingSituation();
      res.redirect('../your-home');
    });


    // mortgaged/joint
    app.get(/joint-own/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/' + sprint + '/live/mortgaged/joint-own', {
        'jointOwnerText' : jointOwnerText
      });
    });
    
    // mortgaged-handler
    app.get(/mortgaged2-handler/, function (req, res) {
      if (req.query.mortgaged === 'yes') {
        res.redirect('../mortgage-frequency');
      } else {
        res.redirect('../../services');
      }
    });

    // mortgaged-handler
    app.get(/mortgaged-handler/, function (req, res) {
      if (req.query.mortgaged === 'yes') {
        res.redirect('../mortgage-amount');
      } else {
        res.redirect('../../services');
      }
    });

    // council-tax-handler 2
    app.get(/ctax-handler/, function (req, res) {
      if (req.query.counciltax === 'yes') {
        res.redirect('../tax-amount');
      } else {
        res.redirect('../ground-rent');
      }
    });
    
     // council-tax-handler 2
    app.get(/taxfreq-handler/, function (req, res) {
      applicant.councilTaxFreq = req.query.ctax;
      console.log(applicant.councilTaxFreq);
      sprint = req.url.charAt(5);
      res.render('lis/' + sprint + '/live/tax-amount', {
        'taxfreq' : applicant.councilTaxFreq
      });
    });

    // council-tax-handler
    app.get(/ctax2-handler/, function (req, res) {
      if (req.query.counciltax === 'yes') {
        res.redirect('../tax-frequency');
      } else {
        res.redirect('../ground-rent');
      }
    });


    // ------
    // Others
    // ------

    // people-handler
    app.get(/people-list/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/' + sprint + '/live/others/people-list', {
        'partnerlivetext' : partnerLiveText,
        'peoplelist' : peopleList
      });
    });

    // people-handler
    app.get(/people-handler/, function (req, res) {
      if (req.query.people === 'yes') {
        res.redirect('../name');
      } else {
        res.redirect('../../living-summary');
      }
    });
    
    //8 people-handler
    app.get(/people/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/' + sprint + '/live/others/people', {
        'partnerlivetext' : partnerLiveText
      });
    });

    // persons details
    app.get(/name/, function (req, res) {
      sprint = req.url.charAt(5);
      householder.resetHouseHolder();
      res.render('lis/' + sprint + '/live/others/name');
    });

    // others details
    app.get(/others-details/, function (req, res) {
      sprint = req.url.charAt(5);
      householder.firstName = (req.query.firstname);
      console.log(householder.firstName);
      householder.lastName = (req.query.lastname);
      var bigname = householder.firstName + " " + householder.lastName;
      peopleList.push(bigname);
      householder.age = (2016 - req.query.dob);
      console.log(householder.age);
      householder.ageRange();
      if (householder.overNineteen) {
        res.render('lis/' + sprint + '/live/others/boarder');
      } else {
        res.render('lis/' + sprint + '/live/others/relationship');
      }
    });
    //child || none underFifteen = people
    //child sixteenToNineteen = education
    //none sixteenToNineteen = boarder
    //child overNineteen = he-education
    //none overNineteen = boarder

    //family underFifteen > are you financially responsable > done
    //family sixteenToNineteen > are you financially responsable > education...
    //family overNineteen > he-education

    // boarder-handler
    app.get(/boarder-handler/, function (req, res) {
      if (req.query.boarder === 'yes') {
        res.redirect('../boarder-detail');
      } else {
        res.redirect('../ft-student');
      }
    });
    
    // others-work-handler
    app.get(/others-work-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      if (req.query.work === 'yes') {
        res.redirect('../hours');
      } else {
        if (householder.sixteenToNineteen) {
          res.redirect('../benefits-reduced');
        } else {
          res.redirect('../benefits');
        }
      }
    });
    
    // work-hours-handler
    app.get(/work-hours-handler/, function (req, res) {
      if (req.query.hours === 'yes') {
        res.redirect('../amount');
      } else {
        res.redirect('../benefits');
      }
    });

    // others-education-handler
    app.get(/others-education-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      if (req.query.education === 'yes') {
        res.render('lis/' + sprint + '/live/others/people-list', {
          'partnerlivetext' : partnerLiveText
        });
      } else {
        res.redirect('../training');
      }
    });

    // others-training-handler
    app.get(/others-training-handler/, function (req, res) {
      if (req.query.training === 'yes') {
        res.redirect('../people-list');
      } else {
        res.redirect('../he-student');
      }
    });

     // relationship-handler
    app.get(/relationship-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      householder.relationship = req.query.relationship;
      console.log(householder.relationship);
      if (householder.underFifteen === true) {
        //child || none underFifteen = people
        res.render('lis/' + sprint + '/live/others/people-list', {
          'partnerlivetext' : partnerLiveText,
          'peoplelist' : peopleList
        });
      } else if (householder.relationship === 'child' && householder.sixteenToNineteen === true) {
        //child sixteenToNineteen = education
        res.redirect('../alevel');
      } else if (householder.relationship === 'none' && householder.sixteenToNineteen === true) {
        //none sixteenToNineteen = boarder
        res.redirect('../boarder');
      } else if (householder.relationship === 'child' && householder.overNineteen === true) {
        //child overNineteen = full time-education
        res.redirect('../ft-student');
      } else if (householder.relationship === 'none' && householder.overNineteen === true) {
        //none overNineteen = boarder
        res.redirect('../boarder');
      }
    });

    // updates the home page when the living section is completed
    app.get(/live-done/, function (req, res) {
      whereYouLiveStatus = completedText;
      whereYouLiveLink = changeText;
      if (allComplete() === true) {
        res.redirect('../../home-updated');
      } else {
        res.redirect('../../lis-home');
      }
    });


    // ---------
    // Exemption
    // ---------

    // LIS exemption
    app.get('/lis/exemption/hc2certificate', function (req, res) {
      res.render('lis/exemption/hc2certificate', {
        'cert-title' : 'HC2'
      });
    });

    // send-mail
    app.get(/send-mail/, function (req, res) {
      sprint = req.url.charAt(5);
      helpLevel = req.query.helplevel;
      res.render('lis/' + sprint + '/exemption/send-mail', {
        'helplevel' : helpLevel
      });
    });

    // mail-confirm
    app.get(/mail-confirm/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/' + sprint + '/exemption/mail-confirm', {
        'helplevel' : helpLevel
      });
    });

    // post cert
    app.get(/post-cert/, function (req, res) {
      helpLevel = req.query.helplevel;
      sprint = req.url.charAt(5);
      console.log(helpLevel);
      res.render('lis/' + sprint + '/exemption/post-cert', {
        'helplevel' : helpLevel
      });
    });

    /*
    

    // ----------
    // Old routes
    // ----------


//LIS sprint 6

    //6) post
    app.get('/lis/6/exemption/post', function (req, res) {
      helpLevel = req.query.helplevel;
      res.render('lis/6/exemption/post', {
        'helplevel' : helpLevel
      });
    });
    
    //6) post-confirm
    app.get('/lis/6/exemption/post-confirm', function (req, res) {
      res.render('lis/6/exemption/post-confirm', {
        'helplevel' : helpLevel
      });
    });
    
    //6)
    app.get('/lis/6/', function (req, res) {
      res.render('lis/6/', {
        'partnerortext' : partnerOrText,
        'partnerandtext' : applicant.partnerAndText
      });
    });
    
    //6)
    app.get('/lis/6/assets/money', function (req, res) {
      res.render('lis/6/assets/money', {
        'partnerortext' : partnerOrText,
        'partnerandtext' : applicant.partnerAndText
      });
    });
    
    //6)
    app.get('/lis/6/assets/accounts', function (req, res) {
      res.render('lis/6/assets/accounts', {
        'partnerortext' : partnerOrText,
        'partnerandtext' : applicant.partnerAndText
      });
    });
    
    //6)
    app.get('/lis/6/guacredit-kickout-handler', function (req, res) {
      if (req.query.guacredit === 'yes') {
        res.redirect('/lis/6/kickout');
      } else {
        res.redirect('/lis/6/need-to-know');
      }
    });
    
    //6) about you summary
    app.get('/lis/6/partner/summary', function (req, res) {
      res.render('lis/6/partner/summary');
    });
    
    //6) partner handler
    app.get('/lis/6/partner/partner-handler', function (req, res) {
      aboutPartnerStatus = "Started";
      aboutPartnerLink = continueText;
      if (req.query.partner === 'yes') {
        applicant.partner = true;
        setPartnerText();
        res.render('lis/6/partner/basic');
      } else if (req.query.partner === 'no') {
        applicant.partner = false;
        setPartnerText();
        res.render('lis/6/partner/summary-no');
      }
    });
    
    //6) partner summary
    app.get('/lis/6/partner/summary', function (req, res) {
      res.render('lis/6/partner/summary');
    });

    //6) about you summary
    app.get('/lis/6/you/about-you-summary', function (req, res) {
      res.render('lis/6/you/about-you-summary', {
        'mywork' : myWork,
        'applicantFullName' : applicant.fullName()
      });
    });
    
    //6) registration-handler
    app.get('/lis/6/you/registration-handler', function (req, res) {
      aboutYouStatus = "Started";
      aboutYouLink = continueText;
      applicant.firstName = req.query.firstname;
      applicant.lastName = req.query.lastname;
      res.render('lis/6/you/contact-prefs', {
        'applicantFirstName' : applicant.firstName
      });
    });

    //6) benefit handler
    app.get('/lis/6/you/benefits/sprint3-benefit-handler', function (req, res) {
      applicant.resetBenefits();
      benefits = req.query.sprint3benefits;
      firstBenefit = applicant.benefitChecker(benefits);
      //if (firstBenefit === "aa") {
      //  res.render('lis/6/you/benefits/aa');
      //} else
      //if (firstBenefit === "ctc") {
      //  res.render('lis/6/you/benefits/ctc');
      //} else 
      if (firstBenefit === "dla") {
        res.render('lis/6/you/benefits/dla');
      } else if (firstBenefit === "pip") {
        res.render('lis/6/you/benefits/pip');
      } else {
        res.render('lis/6/you/benefits/benefit4');
      }
    });
    
    //6 Armed forces independence payment = single amount 
    
    //6 attendance allowance 
    app.get('/lis/6/you/benefits/attendance-allowance-handler', function (req, res) {
      if (applicant.childTaxCredits === true) {
        res.render('lis/6/you/benefits/ctc');
      } else if (applicant.disabilityLivingAllowance === true) {
        res.render('lis/6/you/benefits/dla');
      } else if (applicant.personalIndependence === true) {
        res.render('lis/6/you/benefits/pip');
      } else {
        res.render('lis/6/you/benefits/benefit4');
      }
    });
    
    //6 Carers allowance = single amount 
    
    //6 child tax credit 
    app.get('/lis/6/you/benefits/ctc-handler', function (req, res) {
      if (applicant.disabilityLivingAllowance === true) {
        res.render('lis/6/you/benefits/dla');
      } else if (applicant.personalIndependence === true) {
        res.render('lis/6/you/benefits/pip');
      } else {
        res.render('lis/6/you/benefits/benefit4');
      }
    });

    //6 disability living allowance
    app.get('/lis/6/you/benefits/dla-handler', function (req, res) {
      if (applicant.personalIndependence === true) {
        res.render('lis/6/you/benefits/pip');
      } else {
        res.render('lis/6/you/benefits/benefit4');
      }
    });
    
    //6 Industrial injuries disablement benefit
    
    //6 Maintenance payments
        
    //6) home
    app.get('/lis/6/live/home', function (req, res) {
      applicant.resetLivingSituation();
      res.render('lis/6/live/home');
    });

    //6) mortgaged/joint
    app.get('/lis/6/live/mortgaged/joint', function (req, res) {
      res.render('lis/6/live/mortgaged/joint', {
        'jointownertext' : jointOwnerText
      });
    });
    
    //6) tenant/joint
    app.get('/lis/6/live/mortgaged/joint', function (req, res) {
      res.render('lis/6/live/mortgaged/joint', {
        'partnerortext' : partnerOrText
      });
    });
    
    //6) tenant/joint
    app.get('/lis/6/live/joint', function (req, res) {
      res.render('lis/6/live/joint', {
        'jointTennantText' : jointTennantText
      });
    });

    //6) where you live
    app.get('/lis/6/live/home-handler', function (req, res) {
      if (req.query.home === 'own') {
        applicant.homeOwner = true;
        res.redirect('/lis/6/live/mortgaged/joint');
      } else if (req.query.home === 'rented') {
        applicant.tennant = true;
        res.redirect('/lis/6/live/joint');
      } else if (req.query.home === 'guest') {
        applicant.guest = true;
        res.redirect('/lis/6/live/guest/address');
      } else {
        res.redirect('/lis/6/live/home');
      }
    });

    //6) pension-handler
    app.get('/lis/6/you/pension/pension-handler', function (req, res) {
      if (req.query.pension === 'yes') {
        res.redirect('/lis/6/you/pension/pension-credit');
      } else {
        res.redirect('/lis/6/you/benefits/benefit-sprint3');
      }
    });

    //6) pension-type-handler
    app.get('/lis/6/you/pension/pension-type-handler', function (req, res) {
      applicant.resetPension();
      pensions = req.query.pensiontype;
      if (pensions === 'state') {
        applicant.statePension = true;
        res.render('lis/6/you/pension/pension-amount');
      } else if (pensions === 'private') {
        applicant.privatePension = true;
        res.render('lis/6/you/pension/private-pension-amount');
      } else if (pensions === 'employment') {
        applicant.employmentPension = true;
        res.render('lis/6/you/pension/employment-pension-amount');
      } else if (pensions === 'wardisablement') {
        applicant.warPension = true;
        res.render('lis/6/you/pension/war-pension');
      } else if (pensions === 'warwidow') {
        applicant.warWidowPension = true;
        res.render('lis/6/you/pension/war-widow-pension');
      } else if (pensions === undefined) {
          res.redirect('/lis/6/you/pension/pension-type');
      } else {
        applicant.pensionChecker(pensions);
        if (applicant.statePension === true) {
          res.render('lis/6/you/pension/pension-amount');
        } else if (applicant.privatePension === true) {
          res.render('lis/6/you/pension/private-pension-amount');
        } else if (applicant.employmentPension === true) {
          res.render('lis/6/you/pension/employment-pension-amount');
        } else if (applicant.warPension === true) {
          res.render('lis/6/you/pension/war-pension');
        } else if (applicant.warWidowPension === true) {
          res.render('lis/6/you/pension/war-widow-pension');
        } else {
          res.redirect('/lis/6/you/benefits/benefit-sprint3');
        }
      }
    });
    
    //6) state-pension-handler
    app.get('/lis/6/you/pension/state-pension-handler', function (req, res) {
      if (applicant.privatePension === true) {
        res.redirect('/lis/6/you/pension/private-pension-amount');
      } else if (applicant.employmentPension === true) {
        res.redirect('/lis/6/you/pension/employment-pension-amount');
      } else {
        res.redirect('/lis/6/you/benefits/benefit-sprint3');
      }
    });

    //6) private-pension-handler
    app.get('/lis/6/you/pension/private-pension-handler', function (req, res) {
      if (applicant.employmentPension === true) {
        res.redirect('/lis/6/you/pension/employment-pension-amount');
      } else if (applicant.employmentPension === false) {
        res.redirect('/lis/6/you/benefits/benefit-sprint3');
      }
    });

    //6) employment-pension-handler
    app.get('/lis/6/you/pension/employment-pension-handler', function (req, res) {
      if (applicant.warPension === true) {
        res.redirect('/lis/6/you/pension/war-pension');
      } else if (applicant.warPension === false) {
        res.redirect('/lis/6/you/benefits/benefit-sprint3');
      }
    });

    //6) war-pension-handler
    app.get('/lis/6/you/pension/war-pension-handler', function (req, res) {
      if (applicant.warWidowPension === true) {
        res.redirect('/lis/6/you/pension/war-widow-pension');
      } else if (applicant.warWidowPension === false) {
        res.redirect('/lis/6/you/benefits/benefit-sprint3');
      }
    });

    //6) kickout-handler
    app.get('/lis/6/kickout-handler', function (req, res) {
      if (req.query.kickout === 'continue') {
        res.redirect('/lis/6/care-home');
      } else {
        res.redirect('/lis/6/kickout');
      }
    });
    
    //6) bank account handler
    app.get('/lis/6/assets/account-type-handler', function (req, res) {
      applicant.resetAccounts();
      accounts = req.query.banktype;
      firstSavingsAcc = applicant.savingChecker(accounts);
      if (firstSavingsAcc === 'bank') {
        res.render('lis/6/assets/accounts', {
          'partnerortext' : partnerOrText,
          'partnerandtext' : applicant.partnerAndText
        });
      } else if (firstSavingsAcc === 'pb') {
        res.render('lis/6/assets/premium-bonds', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : applicant.partnerAndText
        });
      } else {
        res.render('lis/6/', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : applicant.partnerAndText
        });
      }
    });
        
    //6)
    app.get('/lis/6/assets/bank-savings-handler', function (req, res) {
      if (applicant.premiumBonds === true) {
        res.render('lis/6/assets/premium-bonds');
      } else {
        res.render('lis/6/', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : applicant.partnerAndText
        });
      }
    });
        
    //6)
    app.get('/lis/6/assets/premium-bond-handler', function (req, res) {
      res.render('lis/6/', {
        'partnerortext' : partnerOrText,
        'partnerandrext' : applicant.partnerAndText
      });
    });
 
// 6) partner handlers
    
    //6) partner pension-handler
    app.get('/lis/6/partner/pension/pension-handler', function (req, res) {
      if (req.query.pension === 'yes') {
        res.redirect('/lis/6/partner/pension/pension-credit');
      } else {
        res.redirect('/lis/6/partner/benefits/benefit-sprint3');
      }
    });
    
    //6) partner pension-type-handler
    app.get('/lis/6/partner/pension/pension-type-handler', function (req, res) {
      partner.resetPension();
      pensions = req.query.pensiontype;
      if (pensions === 'state') {
        partner.statePension = true;
        res.render('lis/6/partner/pension/pension-amount');
      } else if (pensions === 'private') {
        partner.privatePension = true;
        res.render('lis/6/partner/pension/private-pension-amount');
      } else if (pensions === 'employment') {
        partner.employmentPension = true;
        res.render('lis/6/partner/pension/employment-pension-amount');
      } else if (pensions === undefined) {
          res.redirect('/lis/6/partner/pension/pension-type');
      } else {
        partner.pensionChecker(pensions);
        if (partner.statePension === true) {
          res.render('lis/6/partner/pension/pension-amount');
        } else if (partner.privatePension === true) {
          res.render('lis/6/partner/pension/private-pension-amount');
        } else if (partner.employmentPension === true) {
          res.render('lis/6/partner/pension/employment-pension-amount');
        } else {
          res.redirect('/lis/6/partner/benefits/benefit-sprint3');
        }
      }
    });
    
    //6) partner state-pension-handler
    app.get('/lis/6/partner/pension/state-pension-handler', function (req, res) {
      if (partner.privatePension === true) {
        res.redirect('/lis/6/partner/pension/private-pension-amount');
      } else if (applicant.employmentPension === true) {
        res.redirect('/lis/6/partner/pension/employment-pension-amount');
      } else {
        res.redirect('/lis/6/partner/benefits/benefit-sprint3');
      }
    });

    //6) partner private-pension-handler
    app.get('/lis/6/partner/pension/private-pension-handler', function (req, res) {
      if (partner.employmentPension === true) {
        res.redirect('/lis/6/partner/pension/employment-pension-amount');
      } else if (applicant.employmentPension === false) {
        res.redirect('/lis/6/partner/benefits/benefit-sprint3');
      }
    });

    //6) partner benefit handler
    app.get('/lis/6/partner/benefits/sprint3-benefit-handler', function (req, res) {
      partner.resetBenefits();
      partnerBenefits = req.query.sprint3benefits;
      firstPartnerBenefit = partner.benefitChecker(partnerBenefits);
      //if (firstPartnerBenefit === "aa") {
      //  res.render('lis/6/partner/benefits/aa');
      //} else if (firstPartnerBenefit === "ctc") {
      //  res.render('lis/6/partner/benefits/ctc');
      //} else 
      if (firstPartnerBenefit === "dla") {
        res.render('lis/6/partner/benefits/dla');
      } else if (firstPartnerBenefit === "pip") {
        res.render('lis/6/partner/benefits/pip');
      } else {
        res.render('lis/6/partner/benefits/benefit4');
      }
    });

    //6 attendance allowance 
    app.get('/lis/6/partner/benefits/attendance-allowance-handler', function (req, res) {
      if (partner.childTaxCredits === true) {
        res.render('lis/6/partner/benefits/ctc');
      } else if (partner.disabilityLivingAllowance === true) {
        res.render('lis/6/partner/benefits/dla');
      } else if (partner.personalIndependence === true) {
        res.render('lis/6/partner/benefits/pip');
      } else {
        res.render('lis/6/partner/benefits/benefit4');
      }
    });
    
    //6 partner child tax credit 
    app.get('/lis/6/partner/benefits/ctc-handler', function (req, res) {
      if (partner.disabilityLivingAllowance === true) {
        res.render('lis/6/partner/benefits/dla');
      } else if (partner.personalIndependence === true) {
        res.render('lis/6/partner/benefits/pip');
      } else {
        res.render('lis/6/partner/benefits/benefit4');
      }
    });

    //6 partner disability living allowance
    app.get('/lis/6/partner/benefits/dla-handler', function (req, res) {
      if (partner.personalIndependence === true) {
        res.render('lis/6/partner/benefits/pip');
      } else {
        res.render('lis/6/partner/benefits/benefit4');
      }
    });
 
    //6) householder
                    
    //6) people-handler
    app.get('/lis/6/live/others/people-list', function (req, res) {
      res.render('lis/6/live/others/people-list', {
        'partnerlivetext' : partnerLiveText,
        'peoplelist' : peopleList
      });
    });
    
    //6) people-handler
    app.get('/lis/6/live/others/people', function (req, res) {
      res.render('lis/6/live/others/people', {
        'partnerlivetext' : partnerLiveText
      });
    });
    
    //6) persons details
    app.get('/lis/6/live/others/name', function (req, res) {
      householder.resetHouseHolder();
      res.render('lis/6/live/others/name');
    });
    
    //6) people-handler
    app.get('/lis/6/live/others/people-handler', function (req, res) {
      if (req.query.people === 'yes') {
        res.redirect('/lis/6/live/others/name');
      } else {
        res.redirect('/lis/6/live/living-summary');
      }
    });
    
    //6 others details
    app.get('/lis/6/live/others/others-details', function (req, res) {
      householder.firstName = (req.query.firstname);
      householder.lastName = (req.query.lastname);
      var bigname = householder.firstName + " " + householder.lastName;
      peopleList.push(bigname);
      householder.age = (2016 - req.query.dob);
      householder.ageRange();
      if (householder.overNineteen) {
        res.render('lis/6/live/others/boarder');
      } else {
        res.render('lis/6/live/others/relationship');
      }
    });

    //6) relationship-handler
    app.get('/lis/6/live/others/relationship-handler', function (req, res) {
      householder.relationship = req.query.relationship;
      if (householder.underFifteen === true) {
        //child || none underFifteen = people
        res.render('lis/6/live/others/people-list', {
          'partnerlivetext' : partnerLiveText,
          'peoplelist' : peopleList
        });
      } else if (householder.relationship === 'child' && householder.sixteenToNineteen === true) {
        //child sixteenToNineteen = education
        res.render('lis/6/live/others/alevel');
      } else if (householder.relationship === 'none' && householder.sixteenToNineteen === true) {
        //none sixteenToNineteen = boarder
        res.render('lis/6/live/others/boarder');
      } else if (householder.relationship === 'child' && householder.overNineteen === true) {
        //child overNineteen = full time-education
        res.render('lis/6/live/others/ft-student');
      } else if (householder.relationship === 'none' && householder.overNineteen === true) {
        //none overNineteen = boarder
        res.render('lis/6/live/others/boarder');
      }
    });
    
    //6) others-work-handler
    app.get('/lis/6/live/others/others-work-handler', function (req, res) {
      if (req.query.work === 'yes') {
        res.render('lis/6/live/others/hours');
      } else {
        if (householder.sixteenToNineteen) {
          res.render('lis/6/live/others/benefits-reduced');
        } else {
          res.render('lis/6/live/others/benefits');
        }
      }
    });
    
    //6) others-education-handler
    app.get('/lis/6/live/others/others-education-handler', function (req, res) {
      if (req.query.education === 'yes') {
        res.render('lis/6/live/others/people-list', {
          'partnerlivetext' : partnerLiveText
        });
      } else {
        res.render('lis/6/live/others/training');
      }
    });
    
    //6) others-training-handler
    app.get('/lis/6/live/others/others-training-handler', function (req, res) {
      if (req.query.training === 'yes') {
        res.redirect('/lis/6/live/others/people-list');
      } else {
        res.redirect('/lis/6/live/others/he-student');
      }
    });
    
    //6) boarder-handler
    app.get('/lis/6/live/others/boarder-handler', function (req, res) {
      if (req.query.boarder === 'yes') {
        res.redirect('/lis/6/live/others/boarder-detail');
      } else {
        res.redirect('/lis/6/live/others/ft-student');
      }
    });
    
    
    //LIS sprint 5

    app.get('/lis/5/sc/savings-sc-kickout-handler', function (req, res) {
      if (req.query.savings === 'yes') {
        res.redirect('/lis/5/savings-kickout');
      } else {
        res.redirect('/lis/5/need-to-know');
      }
    });
        
    app.get('/lis/5/', function (req, res) {
      res.render('lis/5/', {
        'partnerortext' : partnerOrText,
        'partnerandtext' : applicant.partnerAndText
      });
    });
    
    app.get('/lis/5/assets/money', function (req, res) {
      res.render('lis/5/assets/money', {
        'partnerortext' : partnerOrText,
        'partnerandtext' : applicant.partnerAndText
      });
    });
    
    app.get('/lis/5/assets/accounts', function (req, res) {
      res.render('lis/5/assets/accounts', {
        'partnerortext' : partnerOrText,
        'partnerandtext' : applicant.partnerAndText
      });
    });

    app.get('/lis/5/guacredit-kickout-handler', function (req, res) {
      if (req.query.guacredit === 'yes') {
        res.redirect('/lis/5/kickout');
      } else {
        res.redirect('/lis/5/need-to-know');
      }
    });
    
    //5) about you summary
    app.get('/lis/5/partner/summary', function (req, res) {
      res.render('lis/5/partner/summary');
    });
    
    //5) partner handler
    app.get('/lis/5/partner/partner-handler', function (req, res) {
      aboutPartnerStatus = "Started";
      aboutPartnerLink = continueText;
      if (req.query.partner === 'yes') {
        applicant.partner = true;
        setPartnerText();
        res.render('lis/5/partner/basic');
      } else if (req.query.partner === 'no') {
        applicant.partner = false;
        setPartnerText();
        res.render('lis/5/partner/summary-no');
      }
    });
    
    //5) partner summary
    app.get('/lis/5/partner/summary', function (req, res) {
      res.render('lis/5/partner/summary');
    });

    //5) about you summary
    app.get('/lis/5/you/about-you-summary', function (req, res) {
      res.render('lis/5/you/about-you-summary', {
        'myWork' : myWork,
        'applicantFullName' : applicant.fullName()
      });
    });
    
    //5) registration-handler
    app.get('/lis/5/you/registration-handler', function (req, res) {
      aboutYouStatus = "Started";
      aboutYouLink = continueText;
      applicant.firstName = req.query.firstname;
      applicant.lastName = req.query.lastname;
      res.render('lis/5/you/contact', {
        'applicantFirstName' : applicant.firstName
      });
    });

    //5) benefit handler
    app.get('/lis/5/you/benefits/sprint3-benefit-handler', function (req, res) {
      applicant.resetBenefits();
      benefits = req.query.sprint3benefits;
      firstBenefit = applicant.benefitChecker(benefits);
      if (firstBenefit === "aa") {
        res.render('lis/5/you/benefits/aa');
      } else if (firstBenefit === "ctc") {
        res.render('lis/5/you/benefits/ctc');
      } else if (firstBenefit === "dla") {
        res.render('lis/5/you/benefits/dla');
      } else if (firstBenefit === "pip") {
        res.render('lis/5/you/benefits/pip');
      } else {
        res.render('lis/5/you/benefits/benefit7');
      }
    });
        
    //5 attendance allowance 
    app.get('/lis/5/you/benefits/attendance-allowance-handler', function (req, res) {
      if (applicant.childTaxCredits === true) {
        res.render('lis/5/you/benefits/ctc');
      } else if (applicant.disabilityLivingAllowance === true) {
        res.render('lis/5/you/benefits/dla');
      } else if (applicant.personalIndependence === true) {
        res.render('lis/5/you/benefits/pip');
      } else {
        res.render('lis/5/you/benefits/benefit7');
      }
    });
        
    //5 child tax credit 
    app.get('/lis/5/you/benefits/ctc-handler', function (req, res) {
      if (applicant.disabilityLivingAllowance === true) {
        res.render('lis/5/you/benefits/dla');
      } else if (applicant.personalIndependence === true) {
        res.render('lis/5/you/benefits/pip');
      } else {
        res.render('lis/5/you/benefits/benefit7');
      }
    });

    //5 disability living allowance
    app.get('/lis/5/you/benefits/dla-handler', function (req, res) {
      if (applicant.personalIndependence === true) {
        res.render('lis/5/you/benefits/pip');
      } else {
        res.render('lis/5/you/benefits/benefit7');
      }
    });
            
    //5) home
    app.get('/lis/5/live/home', function (req, res) {
      applicant.resetLivingSituation();
      res.render('lis/5/live/home');
    });

    //5) mortgaged/joint
    app.get('/lis/5/live/mortgaged/joint', function (req, res) {
      res.render('lis/5/live/mortgaged/joint', {
        'jointownertext' : jointOwnerText
      });
    });
    
    //5) tenant/joint
    app.get('/lis/5/live/mortgaged/joint', function (req, res) {
      res.render('lis/5/live/mortgaged/joint', {
        'partnerortext' : partnerOrText
      });
    });
    
    //5) tenant/joint
    app.get('/lis/5/live/joint', function (req, res) {
      res.render('lis/5/live/joint', {
        'jointTennantText' : jointTennantText
      });
    });

    //5) where you live
    app.get('/lis/5/live/home-handler', function (req, res) {
      if (req.query.home === 'own') {
        applicant.homeOwner = true;
        res.redirect('/lis/5/live/mortgaged/joint');
      } else if (req.query.home === 'rented') {
        applicant.tennant = true;
        res.redirect('/lis/5/live/joint');
      } else {
        res.redirect('/lis/5/live/joint');
      }
    });

    //5) pension-handler
    app.get('/lis/5/you/pension/pension-handler', function (req, res) {
      if (req.query.pension === 'yes') {
        res.redirect('/lis/5/you/pension/pension-type');
      } else {
        res.redirect('/lis/5/you/benefits/benefit-sprint3');
      }
    });

    //5) pension-type-handler
    app.get('/lis/5/you/pension/pension-type-handler', function (req, res) {
      applicant.resetPension();
      pensions = req.query.pensiontype;
      if (pensions === 'state') {
        applicant.statePension = true;
        res.render('lis/5/you/pension/pension-amount');
      } else if (pensions === 'private') {
        applicant.privatePension = true;
        res.render('lis/5/you/pension/private-pension-amount');
      } else if (pensions === 'employment') {
        applicant.employmentPension = true;
        res.render('lis/5/you/pension/employment-pension-amount');
      } else if (pensions === 'wardisablement') {
        applicant.warPension = true;
        res.render('lis/5/you/pension/war-pension');
      } else if (pensions === 'warwidow') {
        applicant.warWidowPension = true;
        res.render('lis/5/you/pension/war-widow-pension');
      } else {
        applicant.pensionChecker(pensions);
        if (applicant.statePension === true) {
          res.render('lis/5/you/pension/pension-amount');
        } else if (applicant.privatePension === true) {
          res.render('lis/5/you/pension/private-pension-amount');
        } else if (applicant.employmentPension === true) {
          res.render('lis/5/you/pension/employment-pension-amount');
        } else if (applicant.warPension === true) {
          res.render('lis/5/you/pension/war-pension');
        } else if (applicant.warWidowPension === true) {
          res.render('lis/5/you/pension/war-widow-pension');
        } else {
          res.render('lis/5/you/pension/pension-credit');
        }
      }
    });
    
    //5) state-pension-handler
    app.get('/lis/5/you/pension/state-pension-handler', function (req, res) {
      if (applicant.privatePension === true) {
        res.redirect('/lis/5/you/pension/private-pension-amount');
      } else if (applicant.employmentPension === true) {
        res.redirect('/lis/5/you/pension/employment-pension-amount');
      } else {
        res.redirect('/lis/5/you/pension/pension-credit');
      }
    });

    //5) private-pension-handler
    app.get('/lis/5/you/pension/private-pension-handler', function (req, res) {
      if (applicant.employmentPension === true) {
        res.redirect('/lis/5/you/pension/employment-pension-amount');
      } else if (applicant.employmentPension === false) {
        res.redirect('/lis/5/you/pension/pension-credit');
      }
    });

    //5) employment-pension-handler
    app.get('/lis/5/you/pension/employment-pension-handler', function (req, res) {
      if (applicant.warPension === true) {
        res.redirect('/lis/5/you/pension/war-pension');
      } else if (applicant.warPension === false) {
        res.redirect('/lis/5/you/pension/pension-credit');
      }
    });

    //5) war-pension-handler
    app.get('/lis/5/you/pension/war-pension-handler', function (req, res) {
      if (applicant.warWidowPension === true) {
        res.redirect('/lis/5/you/pension/war-widow-pension');
      } else if (applicant.warWidowPension === false) {
        res.redirect('/lis/5/you/pension/pension-credit');
      }
    });

    //5) kickout-handler
    app.get('/lis/5/kickout-handler', function (req, res) {
      if (req.query.kickout === 'continue') {
        res.redirect('/lis/5/care-home');
      } else {
        res.redirect('/lis/5/kickout');
      }
    });
    
    //5) bank account handler
    app.get('/lis/5/assets/account-type-handler', function (req, res) {
      applicant.resetAccounts();
      accounts = req.query.banktype;
      firstSavingsAcc = applicant.savingChecker(accounts);
      if (firstSavingsAcc === 'bank') {
        res.render('lis/5/assets/accounts', {
          'partnerortext' : partnerOrText,
          'partnerandtext' : applicant.partnerAndText
        });
      } else if (firstSavingsAcc === 'pb') {
        res.render('lis/5/assets/premium-bonds', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : applicant.partnerAndText
        });
      } else {
        res.render('lis/5/', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : applicant.partnerAndText
        });
      }
    });
        
    //5)
    app.get('/lis/5/assets/bank-savings-handler', function (req, res) {
      if (applicant.premiumBonds === true) {
        res.render('lis/5/assets/premium-bonds');
      } else {
        res.render('lis/5/', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : applicant.partnerAndText
        });
      }
    });
        
    //5)
    app.get('/lis/5/assets/premium-bond-handler', function (req, res) {
      res.render('lis/5/', {
        'partnerortext' : partnerOrText,
        'partnerandrext' : applicant.partnerAndText
      });
    });
                
    //work
    app.get('/lis/1/you/work-handler', function (req, res) {
      if (req.query.work === 'yes') {
        myWork = 'Yes';
        res.redirect('/lis/1/you/education');
      } else {
        myWork = 'No';
        res.redirect('/lis/1/you/education');
      }
    });
    
    //2) work
    app.get('/lis/5/you/work-handler', function (req, res) {
      if (req.query.work === 'yes') {
        res.redirect('/lis/5/you/education');
      } else {
        res.redirect('/lis/5/you/education');
      }
    });
 
    // 5) partner handlers
  
    //5) partner pension-handler
    app.get('/lis/5/partner/pension/pension-handler', function (req, res) {
      if (req.query.pension === 'yes') {
        res.redirect('/lis/5/partner/pension/pension-type');
      } else {
        res.redirect('/lis/5/partner/benefits/benefit-sprint3');
      }
    });

    //5) partner pension-type-handler
    app.get('/lis/5/partner/pension/pension-type-handler', function (req, res) {
      partner.resetPension();
      pensions = req.query.pensiontype;
      if (pensions === 'state') {
        partner.statePension = true;
        res.render('lis/5/partner/pension/pension-amount');
      } else if (pensions === 'private') {
        partner.privatePension = true;
        res.render('lis/5/partner/pension/private-pension-amount');
      } else if (pensions === 'employment') {
        partner.employmentPension = true;
        res.render('lis/5/partner/pension/employment-pension-amount');
      } else {
        partner.pensionChecker(pensions);
        if (partner.statePension === true) {
          res.render('lis/5/partner/pension/pension-amount');
        } else if (partner.privatePension === true) {
          res.render('lis/5/partner/pension/private-pension-amount');
        } else if (partner.employmentPension === true) {
          res.render('lis/5/partner/pension/employment-pension-amount');
        } else {
          res.render('lis/5/partner/pension/pension-credit');
        }
      }
    });
    
    //5) partner state-pension-handler
    app.get('/lis/5/partner/pension/state-pension-handler', function (req, res) {
      if (partner.privatePension === true) {
        res.redirect('/lis/5/partner/pension/private-pension-amount');
      } else if (partner.employmentPension === true) {
        res.redirect('/lis/5/partner/pension/employment-pension-amount');
      } else {
        res.redirect('/lis/5/partner/pension/pension-credit');
      }
    });

    //5) partner private-pension-handler
    app.get('/lis/5/partner/pension/private-pension-handler', function (req, res) {
      if (partner.employmentPension === true) {
        res.redirect('/lis/5/partner/pension/employment-pension-amount');
      } else if (partner.employmentPension === false) {
        res.redirect('/lis/5/partner/pension/pension-credit');
      }
    });
    
    //5) partner benefit handler
    app.get('/lis/5/partner/benefits/sprint3-benefit-handler', function (req, res) {
      partner.resetBenefits();
      partnerBenefits = req.query.sprint3benefits;
      firstPartnerBenefit = partner.benefitChecker(partnerBenefits);
      if (firstPartnerBenefit === "aaaa") {
        res.render('lis/5/partner/benefits/aa');
      } else if (firstPartnerBenefit === "ctc") {
        res.render('lis/5/partner/benefits/ctc');
      } else if (firstPartnerBenefit === "dla") {
        res.render('lis/5/partner/benefits/dla');
      } else if (firstPartnerBenefit === "pip") {
        res.render('lis/5/partner/benefits/pip');
      } else if (firstPartnerBenefit === "none") {
        res.render('lis/5/partner/benefits/benefit7');
      }
    });

    //5 attendance allowance 
    app.get('/lis/5/partner/benefits/attendance-allowance-handler', function (req, res) {
      if (partner.childTaxCredits === true) {
        res.render('lis/5/partner/benefits/ctc');
      } else if (partner.disabilityLivingAllowance === true) {
        res.render('lis/5/partner/benefits/dla');
      } else if (partner.personalIndependence === true) {
        res.render('lis/5/partner/benefits/pip');
      } else {
        res.render('lis/5/partner/benefits/benefit7');
      }
    });
    
    //5 partner child tax credit 
    app.get('/lis/5/partner/benefits/ctc-handler', function (req, res) {
      if (partner.disabilityLivingAllowance === true) {
        res.render('lis/5/partner/benefits/dla');
      } else if (partner.personalIndependence === true) {
        res.render('lis/5/partner/benefits/pip');
      } else {
        res.render('lis/5/partner/benefits/benefit7');
      }
    });

    //5 partner disability living allowance
    app.get('/lis/5/partner/benefits/dla-handler', function (req, res) {
      if (partner.personalIndependence === true) {
        res.render('lis/5/partner/benefits/pip');
      } else {
        res.render('lis/5/partner/benefits/benefit7');
      }
    });
 
    // 5) householder
    
    //5) people-handler
    app.get('/lis/5/live/others/people', function (req, res) {
      res.render('lis/5/live/others/people', {
        'partnerlivetext' : partnerLiveText
      });
    });
    
    //5) persons details
    app.get('/lis/5/live/others/name', function (req, res) {
      householder.resetHouseHolder();
      res.render('lis/5/live/others/name');
    });
    
    //5) people-handler
    app.get('/lis/5/live/others/people-handler', function (req, res) {
      if (req.query.people === 'yes') {
        res.redirect('/lis/5/live/others/name');
      } else {
        res.redirect('/lis/5/live/living-summary');
      }
    });
    
    //5 others details
    app.get('/lis/5/live/others/others-details', function (req, res) {
      householder.age = (2016 - req.query.dob);
      householder.ageRange();
      res.render('lis/5/live/others/relationship');
    });

    //5) relationship-handler
    app.get('/lis/5/live/others/relationship-handler', function (req, res) {
      householder.relationship = req.query.relationship;
      if (householder.underFifteen === true) {
        //child || none underFifteen = people
        res.render('lis/5/live/others/people', {
          'partnerlivetext' : partnerLiveText
        });
      } else if (householder.relationship === 'child' && householder.sixteenToNineteen === true) {
        res.render('lis/5/live/others/alevel');
      } else if (householder.relationship === 'none' && householder.sixteenToNineteen === true) {
        res.render('lis/5/live/others/boarder');
      } else if (householder.relationship === 'child' && householder.overNineteen === true) {
        res.render('lis/5/live/others/ft-student');
      } else if (householder.relationship === 'none' && householder.overNineteen === true) {
        res.render('lis/5/live/others/boarder');
      }
    });
    
    //5) others-work-handler
    app.get('/lis/5/live/others/others-work-handler', function (req, res) {
      if (req.query.work === 'yes') {
        res.render('lis/5/live/others/hours');
      } else {
        if (householder.sixteenToNineteen) {
          res.render('lis/5/live/others/benefits-reduced');
        } else {
          res.render('lis/5/live/others/benefits');
        }
      }
    });
    
    //5) others-education-handler
    app.get('/lis/5/live/others/others-education-handler', function (req, res) {
      if (req.query.education === 'yes') {
        res.render('lis/5/live/others/people', {
          'partnerlivetext' : partnerLiveText
        });
      } else {
        res.render('lis/5/live/others/training');
      }
    });
    
    //5) others-training-handler
    app.get('/lis/5/live/others/others-training-handler', function (req, res) {
      if (req.query.training === 'yes') {
        res.redirect('/lis/5/live/others/people');
      } else {
        res.redirect('/lis/5/live/others/he-student');
      }
    });
    
    //5) boarder-handler
    app.get('/lis/5/live/others/boarder-handler', function (req, res) {
      if (req.query.boarder === 'yes') {
        res.redirect('/lis/5/live/others/boarder-detail');
      } else {
        res.redirect('/lis/5/live/others/ft-student');
      }
    });
    
    
    */

//LIS sprint 4
    
    app.get(/other-property/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/' + sprint + '/assets/other-property', {
        'partnerortext' : partnerOrText,
        'partnerandext' : applicant.partnerAndText
      });
    });

    app.get('/lis/4/', function (req, res) {
      res.render('lis/4/assets/money', {
        'partnerortext' : partnerOrText,
        'partnerandtext' : applicant.partnerAndText
      });
    });
    
    app.get('/lis/4/assets/money', function (req, res) {
      res.render('lis/4/assets/money', {
        'partnerortext' : partnerOrText,
        'partnerandtext' : applicant.partnerAndText
      });
    });
    
    app.get('/lis/4/assets/accounts', function (req, res) {
      res.render('lis/4/assets/accounts', {
        'partnerortext' : partnerOrText,
        'partnerandtext' : applicant.partnerAndText
      });
    });
    
    app.get('/lis/4/savings-kickout-handler', function (req, res) {
      if (req.query.savings === 'yes') {
        res.redirect('/lis/4/savings-kickout');
      } else {
        res.redirect('/lis/4/need-to-know');
      }
    });
    
    //4) about you summary
    app.get('/lis/4/partner/summary', function (req, res) {
      res.render('lis/4/partner/summary');
    });
    
    //4) partner handler
    app.get('/lis/4/partner/partner-handler', function (req, res) {
      aboutPartnerStatus = "Started";
      aboutPartnerLink = continueText;
      if (req.query.partner === 'yes') {
        applicant.partner = true;
        setPartnerText(applicant.partner);
        res.render('lis/4/partner/basic');
      } else if (req.query.partner === 'no') {
        applicant.partner = false;
        setPartnerText(applicant.partner);
        res.render('lis/4/partner/summary-no');
      }
    });
    
    //4) partner summary
    app.get('/lis/4/partner/summary', function (req, res) {
      res.render('lis/4/partner/summary');
    });

    //4) about you summary
    app.get('/lis/4/you/about-you-summary', function (req, res) {
      res.render('lis/4/you/about-you-summary', {
        'myWork' : myWork,
        'applicantFullName' : applicant.fullName()
      });
    });
    
    //4) registration-handler
    app.get('/lis/4/you/registration-handler', function (req, res) {
      aboutYouStatus = "Started";
      aboutYouLink = continueText;
      applicant.firstName = req.query.firstname;
      applicant.lastName = req.query.lastname;
      res.render('lis/4/you/contact', {
        'applicantFirstName' : applicant.firstName
      });
    });

    //4) benefit handler
    app.get('/lis/4/you/benefits/sprint3-benefit-handler', function (req, res) {
      applicant.resetBenefits();
      benefits = req.query.sprint3benefits;
      firstBenefit = applicant.benefitChecker(benefits);
      if (firstBenefit === "aa") {
        res.render('lis/4/you/benefits/aa');
      } else if (firstBenefit === "ctc") {
        res.render('lis/4/you/benefits/ctc');
      } else if (firstBenefit === "dla") {
        res.render('lis/4/you/benefits/dla');
      } else if (firstBenefit === "pip") {
        res.render('lis/4/you/benefits/pip');
      } else {
        res.render('lis/4/you/benefits/benefit7');
      }
    });
    
    //4 Armed forces independence payment = single amount 
    
    //4 attendance allowance 
    app.get('/lis/4/you/benefits/attendance-allowance-handler', function (req, res) {
      if (applicant.childTaxCredits === true) {
        res.render('lis/4/you/benefits/ctc');
      } else if (applicant.disabilityLivingAllowance === true) {
        res.render('lis/4/you/benefits/dla');
      } else if (applicant.personalIndependence === true) {
        res.render('lis/4/you/benefits/pip');
      } else {
        res.render('lis/4/you/benefits/benefit7');
      }
    });
    
    //4 Carers allowance = single amount 
    
    //4 child tax credit 
    app.get('/lis/4/you/benefits/ctc-handler', function (req, res) {
      if (applicant.disabilityLivingAllowance === true) {
        res.render('lis/4/you/benefits/dla');
      } else if (applicant.personalIndependence === true) {
        res.render('lis/4/you/benefits/pip');
      } else {
        res.render('lis/4/you/benefits/benefit7');
      }
    });

    //4 disability living allowance
    app.get('/lis/4/you/benefits/dla-handler', function (req, res) {
      if (applicant.personalIndependence === true) {
        res.render('lis/4/you/benefits/pip');
      } else {
        res.render('lis/4/you/benefits/benefit7');
      }
    });
    
    //4) home
    app.get('/lis/4/live/home', function (req, res) {
      applicant.resetLivingSituation();
      res.render('lis/4/live/home');
    });

    //4) mortgaged/joint
    app.get('/lis/4/live/mortgaged/joint', function (req, res) {
      res.render('lis/4/live/mortgaged/joint', {
        'partnerortext' : partnerOrText
      });
    });
    
    //4) tenant/joint
    app.get('/lis/4/live/mortgaged/joint', function (req, res) {
      res.render('lis/4/live/mortgaged/joint', {
        'partnerortext' : partnerOrText
      });
    });

    //4) where you live
    app.get('/lis/4/live/home-handler', function (req, res) {
      if (req.query.home === 'own') {
        applicant.homeOwner = true;
        res.redirect('/lis/4/live/mortgaged/joint');
      } else if (req.query.home === 'rented') {
        applicant.tennant = true;
        res.redirect('/lis/4/live/joint');
      } else {
        res.redirect('/lis/4/live/joint');
      }
    });

    //4) pension-handler
    app.get('/lis/4/you/pension/pension-handler', function (req, res) {
      if (req.query.pension === 'yes') {
        res.redirect('/lis/4/you/pension/pension-credit');
      } else {
        res.redirect('/lis/4/you/benefits/benefit-sprint3');
      }
    });

    //4) pension-type-handler
    app.get('/lis/4/you/pension/pension-type-handler', function (req, res) {
      applicant.resetPension();
      pensions = req.query.pensiontype;
      if (pensions === 'state') {
        applicant.statePension = true;
        res.render('lis/4/you/pension/pension-amount');
      } else if (pensions === 'private') {
        applicant.privatePension = true;
        res.render('lis/4/you/pension/private-pension-amount');
      } else {
        applicant.pensionChecker(pensions);
        if (applicant.statePension === true) {
          res.render('lis/4/you/pension/pension-amount');
        } else if (applicant.privatePension === true) {
          res.render('lis/4/you/pension/private-pension-amount');
        } else {
          res.render('lis/4/you/benefits/benefit-sprint3');
        }
      }
    });
    
    //4) state-pension-handler
    app.get('/lis/4/you/pension/state-pension-handler', function (req, res) {
      if (applicant.privatePension === true) {
        res.redirect('/lis/4/you/pension/private-pension-amount');
      } else if (applicant.privatePension === false) {
        res.redirect('/lis/4/you/benefits/benefit-sprint3');
      }
    });

    //4) kickout-handler
    app.get('/lis/4/kickout-handler', function (req, res) {
      if (req.query.kickout === 'continue') {
        res.redirect('/lis/4/care-home');
      } else {
        res.redirect('/lis/4/kickout');
      }
    });
    
    //4) bank account handler
    app.get('/lis/4/assets/account-type-handler', function (req, res) {
      applicant.resetAccounts();
      accounts = req.query.banktype;
      firstSavingsAcc = applicant.savingChecker(accounts);
      if (firstSavingsAcc === 'bank') {
        res.render('lis/4/assets/accounts', {
          'partnerortext' : partnerOrText,
          'partnerandtext' : applicant.partnerAndText
        });
      } else if (firstSavingsAcc === 'pb') {
        res.render('lis/4/assets/premium-bonds', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : applicant.partnerAndText
        });
      } else {
        res.render('lis/4/', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : applicant.partnerAndText
        });
      }
    });
        
    //4)
    app.get('/lis/4/assets/bank-savings-handler', function (req, res) {
      if (applicant.premiumBonds === true) {
        res.render('lis/4/assets/premium-bonds');
      } else {
        res.render('lis/4/');
      }
    });
        
    //4)
    app.get('/lis/4/assets/premium-bond-handler', function (req, res) {
      res.render('lis/4/');
    });
                
    //work
    app.get('/lis/1/you/work-handler', function (req, res) {
      if (req.query.work === 'yes') {
        myWork = 'Yes';
        res.redirect('/lis/1/you/education');
      } else {
        myWork = 'No';
        res.redirect('/lis/1/you/education');
      }
    });
 

    // 4) partner handlers
    
    //4) partner pension-handler
    app.get('/lis/4/partner/pension/pension-handler', function (req, res) {
      if (req.query.pension === 'yes') {
        res.redirect('/lis/4/partner/pension/pension-credit');
      } else {
        res.redirect('/lis/4/partner/benefits/benefit-sprint3');
      }
    });

    //4) partner pension-type-handler
    app.get('/lis/4/partner/pension/pension-type-handler', function (req, res) {
      partner.resetPension();
      pensions = req.query.pensiontype;
      if (pensions === 'state') {
        partner.statePension = true;
        res.render('lis/4/partner/pension/pension-amount');
      } else if (pensions === 'private') {
        partner.privatePension = true;
        res.render('lis/4/partner/pension/private-pension-amount');
      } else {
        partner.pensionChecker(pensions);
        if (partner.statePension === true) {
          res.render('lis/4/partner/pension/pension-amount');
        } else if (partner.privatePension === true) {
          res.render('lis/4/partner/pension/private-pension-amount');
        } else {
          res.render('lis/4/partner/benefits/benefit-sprint3');
        }
      }
    });

    //4) partner-state-pension
    app.get('/lis/4/partner/pension/state-pension-handler', function (req, res) {
      if (partner.privatePension === true) {
        res.redirect('/lis/4/partner/pension/private-pension-amount');
      } else if (partner.privatePension === false) {
        res.redirect('/lis/4/partner/benefits/benefit-sprint3');
      }
    });
    
    //4) partner benefit handler
    app.get('/lis/4/partner/benefits/sprint3-benefit-handler', function (req, res) {
      partner.resetBenefits();
      var partnerBenefits = req.query.sprint3benefits;
      var firstPartnerBenefit = partner.benefitChecker(partnerBenefits);
      if (firstPartnerBenefit === "aaaa") {
        res.render('lis/4/partner/benefits/aa');
      } else if (firstPartnerBenefit === "ctc") {
        res.render('lis/4/partner/benefits/ctc');
      } else if (firstPartnerBenefit === "dla") {
        res.render('lis/4/partner/benefits/dla');
      } else if (firstPartnerBenefit === "pip") {
        res.render('lis/4/partner/benefits/pip');
      } else if (firstPartnerBenefit === "none") {
        res.render('lis/4/partner/benefits/benefit7');
      }
    });

    //4 attendance allowance 
    app.get('/lis/4/partner/benefits/attendance-allowance-handler', function (req, res) {
      if (partner.childTaxCredits === true) {
        res.render('lis/4/partner/benefits/ctc');
      } else if (partner.disabilityLivingAllowance === true) {
        res.render('lis/4/partner/benefits/dla');
      } else if (partner.personalIndependence === true) {
        res.render('lis/4/partner/benefits/pip');
      } else {
        res.render('lis/4/partner/benefits/benefit7');
      }
    });
    
    //4 partner child tax credit 
    app.get('/lis/4/partner/benefits/ctc-handler', function (req, res) {
      if (partner.disabilityLivingAllowance === true) {
        res.render('lis/4/partner/benefits/dla');
      } else if (partner.personalIndependence === true) {
        res.render('lis/4/partner/benefits/pip');
      } else {
        res.render('lis/4/partner/benefits/benefit7');
      }
    });

    //4 partner disability living allowance
    app.get('/lis/4/partner/benefits/dla-handler', function (req, res) {
      if (partner.personalIndependence === true) {
        res.render('lis/4/partner/benefits/pip');
      } else {
        res.render('lis/4/partner/benefits/benefit7');
      }
    });
 
    
// 4) householder

    
    //4) people-handler
    app.get('/lis/4/live/others/people', function (req, res) {
      res.render('lis/4/live/others/people');
    });
    
    //4) persons details
    app.get('/lis/4/live/others/name', function (req, res) {
      householder.resetHouseHolder();
      res.render('lis/4/live/others/name');
    });
    
    //4) people-handler
    app.get('/lis/4/live/others/people-handler', function (req, res) {
      if (req.query.people === 'yes') {
        res.redirect('/lis/4/live/others/name');
      } else {
        res.redirect('/lis/4/live/living-summary');
      }
    });
    
    //4 others details
    app.get('/lis/4/live/others/others-details', function (req, res) {
      householder.age = (2016 - req.query.dob);
      householder.ageRange();
      res.render('lis/4/live/others/relationship');
    });

    //4) relationship-handler
    app.get('/lis/4/live/others/relationship-handler', function (req, res) {
      householder.relationship = req.query.relationship;
      if (householder.underFifteen === true) {
        //child || none underFifteen = people
        res.render('lis/4/live/others/people');
      } else if (householder.relationship === 'child' && householder.sixteenToNineteen === true) {
        //child sixteenToNineteen = education
        res.render('lis/4/live/others/education');
      } else if (householder.relationship === 'none' && householder.sixteenToNineteen === true) {
        //none sixteenToNineteen = boarder
        res.render('lis/4/live/others/boarder');
      } else if (householder.relationship === 'child' && householder.overNineteen === true) {
        //child overNineteen = he-education
        res.render('lis/4/live/others/he-student');
      } else if (householder.relationship === 'none' && householder.overNineteen === true) {
        //none overNineteen = boarder
        res.render('lis/4/live/others/boarder');
      }
    });
    
    //4) relationship-handler
    app.get('/lis/4/live/others/others-work-handler', function (req, res) {
      if (req.query.work === 'yes') {
        res.render('lis/4/live/others/hours');
      } else {
        if (householder.sixteenToNineteen) {
          res.render('lis/4/live/others/benefits-reduced');
        } else {
          res.render('lis/4/live/others/benefits');
        }
      }
    });
    
    //4) others-education-handler
    app.get('/lis/4/live/others/others-education-handler', function (req, res) {
      if (req.query.education === 'yes') {
        res.redirect('/lis/4/live/others/people');
      } else {
        res.redirect('/lis/4/live/others/training');
      }
    });
    
    //4) others-training-handler
    app.get('/lis/4/live/others/others-training-handler', function (req, res) {
      if (req.query.training === 'yes') {
        res.redirect('/lis/4/live/others/people');
      } else {
        res.redirect('/lis/4/live/others/he-student');
      }
    });
    
    //4) lodger-handler
    app.get('/lis/4/live/others/boarder-handler', function (req, res) {
      if (req.query.boarder === 'yes') {
        res.redirect('/lis/4/live/others/boarder-detail');
      } else {
        res.redirect('/lis/4/live/others/he-student');
      }
    });


//LIS sprint 3
    
    app.get('/lis/3/care-home-handler', function (req, res) {
      if (req.query.carehome === 'yes') {
        res.redirect('/lis/3/carehome-kickout');
      } else {
        res.redirect('/lis/3/savings');
      }
    });
    
    app.get('/lis/3/savings-kickout-handler', function (req, res) {
      if (req.query.savings === 'yes') {
        res.redirect('/lis/3/savings-kickout');
      } else {
        res.redirect('/lis/3/need-to-know');
      }
    });

    //3) kickout-handler
    app.get('/lis/3/ko-handler', function (req, res) {
      if (req.query.kickout === 'continue') {
        res.redirect('/lis/3/care-home');
      } else {
        res.redirect('/lis/3/kickout');
      }
    });
    
    
// LIS sprint 2
    
    //2) kickout
    app.get('/lis/2/ko-handler', function (req, res) {
      if (req.query.kickout === 'continue') {
        res.redirect('/lis/2/lis-home');
      } else {
        res.redirect('/lis/2/kickout');
      }
    });
    
    
//LIS sprint 1
    
    //kickout
    app.get('/lis/1/ko-handler', function (req, res) {
      if (req.query.kickout === 'continue') {
        res.redirect('/lis/1/lis-home');
      } else {
        res.redirect('/lis/1/kickout');
      }
    });
       
  }
};