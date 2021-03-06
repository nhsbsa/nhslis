//import the person constructor
var person = require("./person.js");

var partnerLiveText,
partnerOrText,
partnerAndText,
partnerBothText,
iWe,
doNot,
jointTennantText,
jointOwnerText;
var continueText = 'Continue';
var changeText = 'View or change';
var completedText = "Completed";

var helpLevel = 3;

var peopleList;

var resetPeople = function () {
  peopleList = [];
  console.log('resetting people')
}

resetPeople();

var i,
  sprint,
  pension,
  pensions,
  benefits,
  firstBenefit,
  myWork,
  partnerBenefits,
  firstPartnerBenefit,
  accounts,
  firstSavingsAcc,
  stateP,
  privateP;

//create an application
var application = {
  aboutYouStatus : "Not started",
  aboutPartnerStatus : "Not started",
  propertyStatus : "Not started",
  whereYouLiveStatus : "Not started",
  aboutYouLink : "Start",
  aboutPartnerLink : "Start",
  propertyLink : "Start",
  whereYouLiveLink : "Start",
  resetApplication : function () {
    this.aboutYouStatus = "Not started";
    this.aboutPartnerStatus = "Not started";
    this.propertyStatus = "Not started";
    this.whereYouLiveStatus = "Not started";
    this.aboutYouLink = "Start";
    this.aboutPartnerLink = "Start";
    this.propertyLink = "Start";
    this.whereYouLiveLink = "Start";
    console.log('Resetting application...');
  },
  allComplete : function () {
    if (application.aboutYouStatus === completedText &&
        application.aboutPartnerStatus === completedText &&
        application.propertyStatus === completedText &&
        application.whereYouLiveStatus === completedText) {
      return true;
    } else {
      return false;
    }
  }
};

var wizard = {
    country : null,
    ageBand : null
};

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
  this.statePension = false,
  this.statePensionAmount = null,
  this.statePensionFrequency = null,
  this.privatePension = false,
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
  this.councilTaxFreq = null
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
  this.statePension = false,
  this.statePensionAmount = null,
  this.statePensionFrequency = null,
  this.privatePension = false,
  this.employmentPension = false,
  this.warPension = false,
  this.savings = false,
  this.premiumBonds = false,
  this.disabilityLivingAllowance = false,
  this.attendanceAllowance = false,
  this.homeOwner = false,
  this.tennant = false,
  this.guest = false,
  //this.othersAtHome = false,
  this.bankAccount = false
);

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



// change the text if the applicant has a partner
function setPartnerText() {
  if (applicant.partner === false) {
    partnerBothText = 'you';
    partnerOrText = 'you';
    partnerAndText = 'you';
    partnersText = 'your';
    partnerLiveText = 'Does anyone else live with you?';
    jointTennantText = 'Is anyone else a joint tenant of the place you live';
    jointOwnerText = 'Is anyone else a joint owner of the property you live in';
    otherThanPartner = ' ';
    iWe = 'I';
    doNot = ' ';
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
    doNot = 'do not';
  }
}

function convertFrequency(frequency) {
  if (frequency === 'fourweekly') {
    return('every four weeks');
  } else if (frequency === 'weekly') {
    return('every week');
  }
};

var convertMonth = function(monthInt) {
  monthInt = Number(monthInt);
  if (monthInt === 1){
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

var boolToString = function(myBool) {
  if(myBool === true) {
    return 'Yes';
  } else if (myBool === false) {
    return 'No';
  }
};

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
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

    setPartnerText();

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
      application.resetApplication();
    });




    // -------------
    // Pre questions
    // -------------

    // partner handler v2
    app.get(/p2-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      if (req.query.partner === 'yes') {
        applicant.partner = true;
        //application.aboutPartnerStatus = "Started";
        //application.aboutPartnerLink = continueText;
      } else if (req.query.partner === 'no') {
        applicant.partner = false;
        //application.aboutPartnerStatus = completedText;
        //application.aboutPartnerLink = changeText;
      }
      setPartnerText();
      res.render('lis/'+ sprint +'//ko', {
        'partnerortext' : partnerOrText,
        'iwe' : iWe
      });
    });

    // kickout-handler
    app.get(/kickout-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      if (req.query.kickout === 'continue') {
        res.render('lis/'+ sprint +'/guarantee-credit', {
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
        res.render('lis/'+ sprint +'/tax-credits', {
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
        res.render('lis/'+ sprint +'/savings', {
          'partnerbothtext' : partnerBothText
        });
      }
    });

    // hospital-handler
    app.get(/hospital2-handler/, function (req, res) {
      res.render('lis/'+ sprint +'/savings', {
        'partnerbothtext' : partnerBothText
      })
    });

     // carehome-handler v2
    app.get(/carehome-v2-handler/, function (req, res) {
      if (req.query.carehome === 'yes') {
        res.redirect('../sc/authority-assessed');
      } else {
        res.render('lis/'+ sprint +'/hospital', {
          'partnerortext' : partnerOrText
        });
      }
    });

    app.get(/saving-ch/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/'+ sprint +'/sc/saving-ch', {
        'partnerbothtext' : partnerBothText
      });
    });

    // tax credits cert-handler
    app.get(/tce-handler/, function (req, res) {
    sprint = req.url.charAt(5);
      if (req.query.taxcredits === 'yes') {
        res.redirect('../tce-kickout');
      } else {
        res.render('lis/'+sprint+'/care-home', {
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
      res.render('lis/'+ sprint +'/need-to-know', {
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
      res.render('lis/'+ sprint +'/save-continue/code', {
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
      console.log(req.url);
      res.render('lis/' + sprint + '/lis-home', {
        'aboutYouStatus' : application.aboutYouStatus,
        'aboutPartnerStatus' : application.aboutPartnerStatus,
        'propertyStatus' : application.propertyStatus,
        'whereYouLiveStatus' : application.whereYouLiveStatus,
        'aboutYouLink' : application.aboutYouLink,
        'aboutPartnerLink' : application.aboutPartnerLink,
        'propertyLink' : application.propertyLink,
        'whereYouLiveLink' : application.whereYouLiveLink
      });
    });

    // home updated
    app.get(/home-updated/, function (req, res) {
      sprint = req.url.charAt(5);
      console.log(req.url);
      res.render('lis/' + sprint + '/home-updated', {
        'aboutYouStatus' : application.aboutYouStatus,
        'aboutPartnerStatus' : application.aboutPartnerStatus,
        'propertyStatus' : application.propertyStatus,
        'whereYouLiveStatus' : application.whereYouLiveStatus,
        'aboutYouLink' : application.aboutYouLink,
        'aboutPartnerLink' : application.aboutPartnerLink,
        'propertyLink' : application.propertyLink,
        'whereYouLiveLink' : application.whereYouLiveLink
      });
    });


    // ---------
    // About you
    // ---------

    // registration-handler
    app.get(/registration-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      application.aboutYouStatus = "Started";
      application.aboutYouLink = continueText;
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
      application.aboutYouStatus = "Started";
      application.aboutYouLink = continueText;
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
      res.render('lis/'+ sprint +'/you/contact-prefs', {
        'applicantFirstName' : applicant.firstName
      });
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
        applicant.contactPref ='telephone';
        res.redirect('../telephone');
      } else if (req.query.contact === "both") {
        applicant.contactPref ='both';
        res.redirect('../email');
      } else {
        applicant.contactPref ='none';
        res.redirect('../work');
      }
    });
<<<<<<< HEAD

    // email-address-handler
    app.get(/mail-handler/, function (req, res) {
      if (req.query.email != '') {
        applicant.email = req.query.email;
        console.log(applicant.email);
      }
      res.redirect('../work');
    });

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
      res.render('lis/'+ sprint +'/exemption/send-mail', {
        'helplevel' : helpLevel
      });
    });

    // mail-confirm
    app.get(/mail-confirm/, function (req, res) {
=======

    // email address
    app.get(/email/, function (req, res) {
>>>>>>> github/master
      sprint = req.url.charAt(5);
      res.render('lis/'+ sprint +'/you/email', {
          'email' : applicant.email
        });
    });

<<<<<<< HEAD
//LIS sprint 7


    //7)
    app.get(/carehome-handler/, function (req, res) {
      if (req.query.carehome === 'yes') {
        res.redirect('../sc/authority-assessed');
=======
    // email handler
    app.get(/mail-handler/, function (req, res) {
      if(applicant.contactPref === 'both') {
        res.redirect('../telephone');
>>>>>>> github/master
      } else {
        res.redirect('../work');
      }
    });
<<<<<<< HEAD


    //7) post
    app.get('/lis/7/exemption/post', function (req, res) {
      helpLevel = req.query.helplevel;
      console.log(helpLevel);
      res.render('lis/7/exemption/post', {
        'helplevel' : helpLevel
      });
    });

    //7) post-confirm
    app.get('/lis/7/exemption/post-confirm', function (req, res) {
      res.render('lis/7/exemption/post-confirm', {
        'helplevel' : helpLevel
      });
    });



    //7)
    app.get('/lis/7/sc/authority-assessed-handler', function (req, res) {
      console.log(req.query);
      if (req.query.authority === 'yes') {
        res.redirect('/lis/7/sc/about-you');
      } else {
        res.redirect('/lis/7/sc/savings');
      }
    });

    //7)
    app.get('/lis/7/assets/property', function (req, res) {
      console.log(partnerOrText);
      res.render('lis/7/assets/property', {
        'partnerortext' : partnerOrText,
        'partnerandext' : partnerAndText
      });
    });

    //7)
    app.get('/lis/7/assets/other', function (req, res) {
      console.log(partnerOrText);
      res.render('lis/7/assets/other', {
        'partnerortext' : partnerOrText,
        'partnerandtext' : partnerAndText
      });
    });

    //7)
    app.get('/lis/7/assets/money', function (req, res) {
      res.render('lis/7/assets/money', {
        'partnerortext' : partnerOrText,
        'partnerandText' : partnerAndText
      });
    });

    //7)
    app.get('/lis/7/assets/accounts', function (req, res) {
      res.render('lis/7/assets/accounts', {
        'partnerortext' : partnerOrText,
        'partnerandText' : partnerAndText
      });
    });

    //7)
    app.get('/lis/7/guacredit-kickout-handler', function (req, res) {
      console.log(req.query);
      if (req.query.guacredit === 'yes') {
        res.redirect('/lis/7/kickout');
      } else {
        res.redirect('/lis/7/need-to-know');
      }
    });

    //7) about you summary
    app.get('/lis/7/partner/summary', function (req, res) {
      res.render('lis/7/partner/summary');
    });

    //7) partner handler
    app.get('/lis/7/partner/partner-handler', function (req, res) {
      application.aboutPartnerStatus = "Started";
      application.aboutPartnerLink = continueText;
      if (req.query.partner === 'yes') {
        applicant.partner = true;
        setPartnerText();
        res.render('lis/7/partner/basic');
      } else if (req.query.partner === 'no') {
        applicant.partner = false;
        setPartnerText();
        console.log(applicant.partner);
        res.render('lis/7/partner/summary-no');
      }
    });

    //7) partner summary
    app.get('/lis/7/partner/summary', function (req, res) {
      res.render('lis/7/partner/summary');
    });

    //7) about you summary
    app.get('/lis/7/you/about-you-summary', function (req, res) {
=======

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
>>>>>>> github/master
      var contactText = 'Email address';
      var contactValue = applicant.email;
      if (applicant.contactPref == 'telephone') {
        contactText = 'Telephone number';
        contactValue = applicant.telephone;
      };
      if (applicant.contactPref != undefined) {
        applicant.contactPref = applicant.contactPref.toProperCase();
      };
      if (applicant.statePensionFrequency != undefined) {
        var frequency = convertFrequency(applicant.statePensionFrequency);
      };
      res.render('lis/'+ sprint +'/you/about-you-summary', {
        'mywork' : myWork,
        'applicantFullName' : applicant.fullName(),
        'dobday' : applicant.dobDay,
        'dobmonth' : applicant.dobMonth,
        'dobyear' : applicant.dobYear,
        'contact' : applicant.contactPref,
        'contacttext' : contactText,
        'contactValue' : contactValue,
        'savingscredit' : boolToString(applicant.savingsCredit),
        'statepensionamount' : applicant.statePensionAmount,
        'statepensionfrequency' : frequency
      });
    });


    // -------
    // Pension
    // -------

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
      firstBenefit = applicant.benefitChecker(benefits);
      //if (firstBenefit === "aa") {
      //  res.render('lis/'+ sprint +'/you/benefits/aa');
      //} else
      //if (firstBenefit === "ctc") {
      //  res.render('lis/'+ sprint +'/you/benefits/ctc');
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
      res.render('lis/'+ sprint +'/you/benefits/care-allowance', {
        'otherthanartner' : otherThanPartner
      });
    });

    // partner care-allowance
    app.get(/partnercare-allowance/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/'+ sprint +'/partner/benefits/partner-careallowance', {
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
      application.aboutYouStatus = completedText;
      application.aboutYouLink = changeText;
      if (application.allComplete() === true) {
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
      res.render('lis/'+ sprint +'/partner/p-status', {
          'partnerstatus' : applicant.partner
      });
    });

    // partner handler
    app.get(/partner-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      application.aboutPartnerStatus = "Started";
      application.aboutPartnerLink = continueText;
      if (req.query.partner === 'yes') {
        applicant.partner = true;
        setPartnerText();
        res.redirect('../basic');
      } else if (req.query.partner === 'no') {
        applicant.partner = false;
        setPartnerText();
        res.redirect('../summary-no');
      }
    });

     // partner summary
    app.get(/summary-full/, function (req, res) {
      res.render('../summary-full');
    });

    // updates the home page when the partner section is completed
    app.get(/partner-done/, function (req, res) {
      application.aboutPartnerStatus = completedText;
      application.aboutPartnerLink = changeText;
      if (application.allComplete() === true) {
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
      res.render('lis/'+ sprint +'/assets/property', {
        'partnerortext' : partnerOrText,
        'partnerandext' : partnerAndText
      });
    });

    // property handler
    app.get(/land-handler/, function (req, res) {
      application.propertyStatus = "Started";
      application.propertyLink = continueText;
      if (req.query.property === "yes") {
        res.redirect('../second-address');
      } else {
        res.redirect('../accounts');
      }
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
      res.render('lis/'+ sprint +'/assets/accounts', {
        'partnerortext' : partnerOrText,
        'partnerandText' : partnerAndText
      });
    });

    // accounts
    app.get(/accounts/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/'+ sprint +'/assets/accounts', {
        'partnerortext' : partnerOrText,
        'partnerandText' : partnerAndText
      });
    });

    // account-type-handler
    app.get(/account-type-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      applicant.resetAccounts();
      accounts = req.query.banktype;
      firstSavingsAcc = applicant.savingChecker(accounts);
      if (firstSavingsAcc === 'bank') {
        res.render('lis/'+ sprint +'/assets/bank', {
          'partnerortext' : partnerOrText,
          'partnerandtext' : partnerAndText
        });
      } else if (firstSavingsAcc === 'pb') {
        res.render('lis/'+ sprint +'/assets/premium-bonds', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : partnerAndText
        });
      } else {
        res.render('lis/'+ sprint +'/assets/assets-other', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : partnerAndText
        });
      }
    });

    // bank accounts handler
    app.get(/bank-savings-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      console.log('here');
      if (applicant.premiumBonds === true) {
        res.render('lis/'+ sprint +'/assets/premium-bonds');
      } else {
        res.render('lis/'+ sprint +'/assets/assets-other', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : partnerAndText
        });
      }
    });

    //p remium-bond-handler
    app.get(/premium-bond-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/'+ sprint +'/assets/assets-other', {
        'partnerortext' : partnerOrText,
        'partnerandrext' : partnerAndText
      });
    });

    // assets/other
    app.get(/assets-other/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('../assets-other', {
        'partnerortext' : partnerOrText,
        'partnerandtext' : partnerAndText
      });
    });

    // updates the home page when the assets section is completed
    app.get(/assets-done/, function (req, res) {
      application.propertyStatus = completedText;
      application.propertyLink = changeText;
      if (application.allComplete() === true) {
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
      application.whereYouLiveStatus = "Started";
      application.whereYouLiveLink = continueText;
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

    // home
    app.get(/your-home/, function (req, res) {
      applicant.resetLivingSituation();
      res.redirect('../your-home');
    });


    // mortgaged/joint
    app.get(/joint-own/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/'+ sprint +'/live/mortgaged/joint-own', {
        'jointownertext' : jointOwnerText
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
    res.render('lis/'+ sprint +'/live/tax-amount', {
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
      res.render('lis/'+ sprint +'/live/others/people-list', {
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
      res.render('lis/'+ sprint +'/live/others/people', {
        'partnerlivetext' : partnerLiveText
      });
    });

    // persons details
    app.get(/name/, function (req, res) {
      sprint = req.url.charAt(5);
      householder.resetHouseHolder();
      res.render('lis/'+ sprint +'/live/others/name');
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
        res.render('lis/'+ sprint +'/live/others/boarder');
      } else {
        res.render('lis/'+ sprint +'/live/others/relationship');
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
        res.render('lis/'+ sprint +'/live/others/people-list', {
          'partnerlivetext' : partnerLiveText
        });
      } else {
        res.redirect('../training');
      }
    });

//<<<<<<< HEAD
//    //7) region-handler
//    app.get('/lis/7/wizard/region-handler', function (req, res) {
//      console.log(req.query);
//        wizard.country = req.query.country;
//        console.log('country is', wizard.country);
//      if (req.query.eligibility === 'uk') {
//        res.render('lis/7/wizard/dla');
//      } else if (req.query.eligibility === 'eu') {
//        res.render('lis/7/wizard/eu');
//=======
    // others-training-handler
    app.get(/others-training-handler/, function (req, res) {
      if (req.query.training === 'yes') {
        res.redirect('../people-list');
      } else {
        res.redirect('../he-student');
      }
    });


////7) date-of-birth-handler
//    app.get('/lis/7/wizard/date-of-birth', function (req, res) {
//      console.log('hi');
//        res.render('lis/7/wizard/date-of-birth', {'country' : wizard.country});
//
//    });
//
//    //7) eligibility-handler
//    app.get('/lis/7/wizard/eligibility-handler', function (req, res) {
//      console.log(req.query);
//        // do something with date
//      if (req.query.kickout === 'continue') {
//        res.redirect('/lis/7/wizard/lis');
//      } else {
//        res.redirect('/lis/7/wizard/passported-benefits');
//      }
//    });
//
//    //7) benefitsv2-handler
//    app.get('/lis/7/wizard/benefitsv2-handler', function (req, res) {
//        console.log("thing");
//      console.log(req.query);
//      if (req.query.kickout === 'continue') {
//        res.redirect('/lis/7/wizard/tax-credits-exemption');
//=======
     // relationship-handler
    app.get(/relationship-handler/, function (req, res) {
      sprint = req.url.charAt(5);
      householder.relationship = req.query.relationship;
      console.log(householder.relationship);
      if (householder.underFifteen === true) {
        //child || none underFifteen = people
        res.render('lis/'+ sprint +'/live/others/people-list', {
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
      application.whereYouLiveStatus = completedText;
      application.whereYouLiveLink = changeText;
      if (application.allComplete() === true) {
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
      res.render('lis/'+ sprint +'/exemption/send-mail', {
        'helplevel' : helpLevel
      });
    });

    // mail-confirm
    app.get(/mail-confirm/, function (req, res) {
      sprint = req.url.charAt(5);
      res.render('lis/'+ sprint +'/exemption/mail-confirm', {
        'helplevel' : helpLevel
      });
    });

    // post cert
    app.get(/post-cert/, function (req, res) {
      helpLevel = req.query.helplevel;
      sprint = req.url.charAt(5);
      console.log(helpLevel);
      res.render('lis/'+ sprint +'/exemption/post-cert', {
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
        'partnerandtext' : partnerAndText
      });
    });

    //6)
    app.get('/lis/6/assets/money', function (req, res) {
      res.render('lis/6/assets/money', {
        'partnerortext' : partnerOrText,
        'partnerandText' : partnerAndText
      });
    });

    //6)
    app.get('/lis/6/assets/accounts', function (req, res) {
      res.render('lis/6/assets/accounts', {
        'partnerortext' : partnerOrText,
        'partnerandText' : partnerAndText
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
      application.aboutPartnerStatus = "Started";
      application.aboutPartnerLink = continueText;
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
      application.aboutYouStatus = "Started";
      application.aboutYouLink = continueText;
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
        'jointtennanttext' : jointTennantText
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
          'partnerandtext' : partnerAndText
        });
      } else if (firstSavingsAcc === 'pb') {
        res.render('lis/6/assets/premium-bonds', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : partnerAndText
        });
      } else {
        res.render('lis/6/', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : partnerAndText
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
          'partnerandrext' : partnerAndText
        });
      }
    });

    //6)
    app.get('/lis/6/assets/premium-bond-handler', function (req, res) {
      res.render('lis/6/', {
        'partnerortext' : partnerOrText,
        'partnerandrext' : partnerAndText
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
<<<<<<< HEAD

    app.get('/lis/5/sc/authority-assessed-handler', function (req, res) {
      if (req.query.authority === 'yes') {
        res.redirect('/lis/5/sc/about-you');
      } else {
        res.redirect('/lis/5/sc/savings');
      }
    });
=======
>>>>>>> github/master

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
        'partnerandtext' : partnerAndText
      });
    });

    app.get('/lis/5/assets/money', function (req, res) {
      res.render('lis/5/assets/money', {
        'partnerortext' : partnerOrText,
        'partnerandText' : partnerAndText
      });
    });

    app.get('/lis/5/assets/accounts', function (req, res) {
      res.render('lis/5/assets/accounts', {
        'partnerortext' : partnerOrText,
        'partnerandText' : partnerAndText
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
      application.aboutPartnerStatus = "Started";
      application.aboutPartnerLink = continueText;
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
      application.aboutYouStatus = "Started";
      application.aboutYouLink = continueText;
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
        'jointtennanttext' : jointTennantText
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
          'partnerandtext' : partnerAndText
        });
      } else if (firstSavingsAcc === 'pb') {
        res.render('lis/5/assets/premium-bonds', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : partnerAndText
        });
      } else {
        res.render('lis/5/', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : partnerAndText
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
          'partnerandrext' : partnerAndText
        });
      }
    });

    //5)
    app.get('/lis/5/assets/premium-bond-handler', function (req, res) {
      res.render('lis/5/', {
        'partnerortext' : partnerOrText,
        'partnerandrext' : partnerAndText
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
        'partnerandext' : partnerAndText
      });
    });
<<<<<<< HEAD

    app.get('/lis/4/assets/property', function (req, res) {
      res.render('lis/4/assets/property', {
        'partnerortext' : partnerOrText,
        'partnerandext' : partnerAndText
      });
    });

    app.get('/lis/4/assets/other', function (req, res) {
=======

    app.get('/lis/4/', function (req, res) {
>>>>>>> github/master
      res.render('lis/4/assets/money', {
        'partnerortext' : partnerOrText,
        'partnerandtext' : partnerAndText
      });
    });

    app.get('/lis/4/assets/money', function (req, res) {
      res.render('lis/4/assets/money', {
        'partnerortext' : partnerOrText,
        'partnerandText' : partnerAndText
      });
    });

    app.get('/lis/4/assets/accounts', function (req, res) {
      res.render('lis/4/assets/accounts', {
        'partnerortext' : partnerOrText,
        'partnerandText' : partnerAndText
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
      application.aboutPartnerStatus = "Started";
      application.aboutPartnerLink = continueText;
      if (req.query.partner === 'yes') {
        applicant.partner = true;
        setPartnerText();
        res.render('lis/4/partner/basic');
      } else if (req.query.partner === 'no') {
        applicant.partner = false;
        setPartnerText();
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
      application.aboutYouStatus = "Started";
      application.aboutYouLink = continueText;
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
          'partnerandtext' : partnerAndText
        });
      } else if (firstSavingsAcc === 'pb') {
        res.render('lis/4/assets/premium-bonds', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : partnerAndText
        });
      } else {
        res.render('lis/4/', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : partnerAndText
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

    //2) work
    app.get('/lis/4/you/work-handler', function (req, res) {
      if (req.query.work === 'yes') {
        res.redirect('/lis/4/you/education');
      } else {
        res.redirect('/lis/4/you/education');
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
      partnerBenefits = req.query.sprint3benefits;
      firstPartnerBenefit = partner.benefitChecker(partnerBenefits);
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

    app.get('/lis/3/', function (req, res) {
      res.render('lis/3/assets/money', {
        'partnerortext' : partnerOrText,
        'partnerandtext' : partnerAndText
      });
    });

    app.get('/lis/3/assets/money', function (req, res) {
      res.render('lis/3/assets/money', {
        'partnerortext' : partnerOrText,
        'partnerandText' : partnerAndText
      });
    });

    app.get('/lis/3/assets/accounts', function (req, res) {
      res.render('lis/3/assets/accounts', {
        'partnerortext' : partnerOrText,
        'partnerandText' : partnerAndText
      });
    });

    app.get('/lis/3/savings-kickout-handler', function (req, res) {
      if (req.query.savings === 'yes') {
        res.redirect('/lis/3/savings-kickout');
      } else {
        res.redirect('/lis/3/need-to-know');
      }
    });

    //3) about you summary
    app.get('/lis/3/partner/summary', function (req, res) {
      res.render('lis/3/partner/summary');
    });

    //3) partner handler
    app.get('/lis/3/partner/partner-handler', function (req, res) {
      if (req.query.partner === 'yes') {
        applicant.partner = true;
        setPartnerText();
        res.render('lis/3/partner/basic');
      } else if (req.query.partner === 'no') {
        applicant.partner = false;
        res.render('lis/3/partner/summary-no');
      }
    });

    //3) partner summary
    app.get('/lis/3/partner/summary', function (req, res) {
      res.render('lis/3/partner/summary');
    });

    //3) about you summary
    app.get('/lis/3/you/about-you-summary', function (req, res) {
      res.render('lis/3/you/about-you-summary', {
        'myWork' : myWork,
        'applicantFullName' : applicant.fullName()
      });
    });

    //3) registration-handler
    app.get('/lis/3/you/registration-handler', function (req, res) {
      applicant.firstName = req.query.firstname;
      applicant.lastName = req.query.lastname;
      res.render('lis/3/you/contact', {
        'applicantFirstName' : applicant.firstName
      });
    });

    //3) benefit handler
    app.get('/lis/3/you/benefits/sprint3-benefit-handler', function (req, res) {
      applicant.resetBenefits();
      benefits = req.query.sprint3benefits;
      firstBenefit = applicant.benefitChecker(benefits);
      if (firstBenefit === "aa") {
        res.render('lis/3/you/benefits/aa');
      } else if (firstBenefit === "ctc") {
        res.render('lis/3/you/benefits/ctc');
      } else if (firstBenefit === "dla") {
        res.render('lis/3/you/benefits/dla');
      } else if (firstBenefit === "pip") {
        res.render('lis/3/you/benefits/pip');
      } else if (firstBenefit === "none") {
        res.render('lis/3/you/benefits/benefit7');
      }
    });

    //3 attendance allowance
    app.get('/lis/3/you/benefits/attendance-allowance-handler', function (req, res) {
      if (applicant.childTaxCredits === true) {
        res.render('lis/3/you/benefits/ctc');
      } else if (applicant.disabilityLivingAllowance === true) {
        res.render('lis/3/you/benefits/dla');
      } else if (applicant.personalIndependence === true) {
        res.render('lis/3/you/benefits/pip');
      } else {
        res.render('lis/3/you/benefits/benefit7');
      }
    });

    //3 child tax credit
    app.get('/lis/3/you/benefits/ctc-handler', function (req, res) {
      if (applicant.disabilityLivingAllowance === true) {
        res.render('lis/3/you/benefits/dla');
      } else if (applicant.personalIndependence === true) {
        res.render('lis/3/you/benefits/pip');
      } else {
        res.render('lis/3/you/benefits/benefit7');
      }
    });

    //3 disability living allowance
    app.get('/lis/3/you/benefits/dla-handler', function (req, res) {
      if (applicant.personalIndependence === true) {
        res.render('lis/3/you/benefits/pip');
      } else {
        res.render('lis/3/you/benefits/benefit7');
      }
    });

    //3 relationship
    app.get('/lis/3/live/others/relationship', function (req, res) {
      res.render('lis/3/live/others/relationship');
    });

    //3) relationship-handler
    app.get('/lis/3/live/others/relationship-handler', function (req, res) {
      if (req.query.relationship === 'none' && applicant.tennant === true) {
        res.render('lis/3/live/others/subtenant');
      } else if (req.query.relationship === 'none' && applicant.homeOwner === true) {
        res.render('lis/3/live/others/boarder');
      } else {
        res.render('lis/3/live/others/work');
      }
    });

    //3) people-handler
    app.get('/lis/3/live/others/people-handler', function (req, res) {
      if (req.query.people === 'yes') {
        res.redirect('/lis/3/live/others/name');
      } else {
        res.redirect('/lis/3/live/living-summary');
      }
    });

    //3) home
    app.get('/lis/3/live/home', function (req, res) {
      applicant.resetLivingSituation();
      res.render('lis/3/live/home');
    });

    //3) where you live
    app.get('/lis/3/live/home-handler', function (req, res) {
      if (req.query.home === 'own') {
        applicant.homeOwner = true;
        res.redirect('/lis/3/live/mortgaged/joint');
      } else if (req.query.home === 'rented') {
        applicant.tennant = true;
        res.redirect('/lis/3/live/joint');
      } else {
        res.redirect('/lis/3/live/joint');
      }
    });

    //3) pension-handler
    app.get('/lis/3/you/pension/pension-handler', function (req, res) {
      if (req.query.pension === 'yes') {
        res.redirect('/lis/3/you/pension/pension-credit');
      } else {
        res.redirect('/lis/3/you/benefits/benefit-sprint3');
      }
    });

    //3) pension-type-handler
    app.get('/lis/3/you/pension/pension-type-handler', function (req, res) {
      pensions = req.query.pensiontype;
      if (pensions === 'state') {
        applicant.statePension = true;
        res.render('lis/3/you/pension/pension-amount');
      } else if (pensions === 'private') {
        applicant.privatePension = true;
        res.render('lis/3/you/pension/private-pension-amount');
      } else {
        applicant.pensionChecker(pensions);
        if (applicant.statePension === true) {
          res.render('lis/3/you/pension/pension-amount');
        } else if (applicant.privatePension === true) {
          res.render('lis/3/you/pension/private-pension-amount');
        } else {
          res.render('lis/3/you/benefits/benefit-sprint3');
        }
      }
    });

    //3) state-pension-handler
    app.get('/lis/3/you/pension/state-pension-handler', function (req, res) {
      if (applicant.privatePension === true) {
        res.redirect('/lis/3/you/pension/private-pension-amount');
      } else if (applicant.privatePension === false) {
        res.redirect('/lis/3/you/benefits/benefit-sprint3');
      }
    });

    //3) kickout-handler
    app.get('/lis/3/kickout-handler', function (req, res) {
      if (req.query.kickout === 'continue') {
        res.redirect('/lis/3/care-home');
      } else {
        res.redirect('/lis/3/kickout');
      }
    });

    //3) bank account handler
    app.get('/lis/3/assets/account-type-handler', function (req, res) {
      applicant.resetAccounts();
      accounts = req.query.banktype;
      firstSavingsAcc = applicant.savingChecker(accounts);
      if (firstSavingsAcc === 'bank') {
        res.render('lis/3/assets/accounts', {
          'partnerortext' : partnerOrText,
          'partnerandtext' : partnerAndText
        });
      } else if (firstSavingsAcc === 'pb') {
        res.render('lis/3/assets/premium-bonds', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : partnerAndText
        });
      } else {
        res.render('lis/4/', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : partnerAndText
        });
      }
    });

    //3)
    app.get('/lis/3/assets/bank-savings-handler', function (req, res) {
      if (applicant.premiumBonds === true) {
        res.render('lis/3/assets/premium-bonds');
      } else {
        res.render('lis/3/');
      }
    });

    //3)
    app.get('/lis/3/assets/premium-bond-handler', function (req, res) {
      res.render('lis/3/');
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
    app.get('/lis/3/you/work-handler', function (req, res) {
      if (req.query.work === 'yes') {
        res.redirect('/lis/3/you/education');
      } else {
        res.redirect('/lis/3/you/education');
      }
    });

    //3) partner pension-handler
    app.get('/lis/3/partner/pension/pension-handler', function (req, res) {
      if (req.query.pension === 'yes') {
        res.redirect('/lis/3/partner/pension/pension-credit');
      } else {
        res.redirect('/lis/3/partner/benefits/benefit-sprint3');
      }
    });

    //3) partner pension-type-handler
    app.get('/lis/3/partner/pension/pension-type-handler', function (req, res) {
      pensions = req.query.pensiontype;
      if (pensions === 'state') {
        partner.statePension = true;
        res.render('lis/3/partner/pension/pension-amount');
      } else if (pensions === 'private') {
        partner.privatePension = true;
        res.render('lis/3/partner/pension/private-pension-amount');
      } else {
        partner.pensionChecker(pensions);
        if (partner.statePension === true) {
          res.render('lis/3/partner/pension/pension-amount');
        } else if (partner.privatePension === true) {
          res.render('lis/3/partner/pension/private-pension-amount');
        } else {
          res.render('lis/3/partner/benefits/benefit-sprint3');
        }
      }
    });

    //3) partner-state-pension
    app.get('/lis/3/partner/pension/state-pension-handler', function (req, res) {
      if (partner.privatePension === true) {
        res.redirect('/lis/3/partner/pension/private-pension-amount');
      } else if (partner.privatePension === false) {
        res.redirect('/lis/3/partner/benefits/benefit-sprint3');
      }
    });

    //3) partner benefit handler
    app.get('/lis/3/partner/benefits/sprint3-benefit-handler', function (req, res) {
      partner.resetBenefits();
      partnerBenefits = req.query.sprint3benefits;
      firstPartnerBenefit = partner.benefitChecker(partnerBenefits);
      if (firstPartnerBenefit === "aaaa") {
        res.render('lis/3/partner/benefits/aa');
      } else if (firstPartnerBenefit === "ctc") {
        res.render('lis/3/partner/benefits/ctc');
      } else if (firstPartnerBenefit === "dla") {
        res.render('lis/3/partner/benefits/dla');
      } else if (firstPartnerBenefit === "pip") {
        res.render('lis/3/partner/benefits/pip');
      } else if (firstPartnerBenefit === "none") {
        res.render('lis/3/partner/benefits/benefit7');
      }
    });

    //3 attendance allowance
    app.get('/lis/3/partner/benefits/attendance-allowance-handler', function (req, res) {
      if (partner.childTaxCredits === true) {
        res.render('lis/3/partner/benefits/ctc');
      } else if (partner.disabilityLivingAllowance === true) {
        res.render('lis/3/partner/benefits/dla');
      } else if (partner.personalIndependence === true) {
        res.render('lis/3/partner/benefits/pip');
      } else {
        res.render('lis/3/partner/benefits/benefit7');
      }
    });

    //3 partner child tax credit
    app.get('/lis/3/partner/benefits/ctc-handler', function (req, res) {
      if (partner.disabilityLivingAllowance === true) {
        res.render('lis/3/partner/benefits/dla');
      } else if (partner.personalIndependence === true) {
        res.render('lis/3/partner/benefits/pip');
      } else {
        res.render('lis/3/partner/benefits/benefit7');
      }
    });

    //3 partner disability living allowance
    app.get('/lis/3/partner/benefits/dla-handler', function (req, res) {
      if (partner.personalIndependence === true) {
        res.render('lis/3/partner/benefits/pip');
      } else {
        res.render('lis/3/partner/benefits/benefit7');
      }
    });


// LIS sprint 2


    //2) other people living in your home
    app.get('/lis/2/live/others/people-handler', function (req, res) {
      if (req.query.people === 'yes') {
        res.redirect('/lis/2/live/others/name');
      } else {
        res.redirect('/lis/2/live/living-summary');
      }
    });

    //2) where you live
    app.get('/lis/2/live/home-handler', function (req, res) {
      if (req.query.home === 'own') {
        res.redirect('/lis/2/live/mortgaged/joint');
      } else {
        res.redirect('/lis/2/live/joint');
      }
    });

    //2) pension
    app.get('/lis/2/you/pension/pension-handler', function (req, res) {
      if (req.query.pension === 'no') {
        res.redirect('/lis/2/you/benefits/benefit-group1');
      } else {
        res.redirect('/lis/2/you/pension/pension-credit');
      }
    });

    //2) pension-type
    app.get('/lis/2/you/pension/pension-type-handler', function (req, res) {
      pensions = req.query.pensiontype;
      if (pensions === 'state') {
        stateP = true;
        res.render('lis/2/you/pension/pension-amount');
      } else if (pensions === 'private') {
        privateP = true;
        res.render('lis/2/you/pension/private-pension-amount');
      } else {
        for (i = 0; i < pensions.length; i += 1) {
          if (pensions[i] === 'state') {
            stateP = true;
          } else if (pensions[i] === 'private') {
            privateP = true;
          }
        }
        if (stateP === true) {
          res.render('lis/2/you/pension/pension-amount');
        } else if (privateP === true) {
          res.render('lis/2/you/pension/private-pension-amount');
        }
      }
    });

    //2) state-pension
    app.get('/lis/2/you/pension/state-pension-handler', function (req, res) {
      if (privateP === true) {
        res.render('lis/2/you/pension/private-pension-amount', {'privateP' : privateP });
      } else if (privateP === false) {
        res.render('lis/2/you/benefits/benefit-group1', {'privateP' : privateP });
      }
    });

    //2) kickout
    app.get('/lis/2/kickout-handler', function (req, res) {
      if (req.query.kickout === 'continue') {
        res.redirect('/lis/2/lis-home');
      } else {
        res.redirect('/lis/2/kickout');
      }
    });

    //2) about you summary
    app.get('/lis/2/you/about-you-summary', function (req, res) {
      res.render('lis/2/you/about-you-summary', {
        'myWork' : myWork
      });
    });

    //2) work
    app.get('/lis/2/you/work-handler', function (req, res) {
      if (req.query.work === 'yes') {
        myWork = 'Yes';
        res.redirect('/lis/2/you/education');
      } else {
        myWork = 'No';
        res.redirect('/lis/2/you/education');
      }
    });

    //2) benefits
    app.get('/lis/2/you/benefits/benefit-handler', function (req, res) {
      if (req.query.benefit === 'no') {
        res.redirect('/lis/2/you/benefits/other-money');
      } else {
        res.redirect('/lis/2/you/benefits/benefit-group1');
      }
    });

    //2) bank accounts
    app.get('/lis/2/assets/account-type-handler', function (req, res) {
      if (req.query.banktype === 'bank') {
        res.redirect('/lis/2/assets/accounts');
      } else {
        res.redirect('/lis/2/');
      }
    });


//LIS sprint 1


    //kickout
    app.get('/lis/1/kickout-handler', function (req, res) {
      if (req.query.kickout === 'continue') {
        res.redirect('/lis/1/lis-home');
      } else {
        res.redirect('/lis/1/kickout');
      }
    });

    //about you summary
    app.get('/lis/1/you/about-you-summary', function (req, res) {
      res.render('lis/1/you/about-you-summary', {
        'myWork' : myWork
      });
    });

    //partner
    app.get('/lis/1/partner/partner-handler', function (req, res) {
      if (req.query.partner === 'yes') {
        res.render('lis/1/partner/summary');
      } else {
        res.render('lis/1/partner/summary');
      }
    });

    //education
    app.get('/lis/1/you/education-handler', function (req, res) {
      if (req.query.education === 'yes') {
        res.redirect('/lis/1/you/pension/pension');
      } else {
        res.redirect('/lis/1/you/pension/pension');
      }
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

    //pension
    app.get('/lis/1/you/pension/pension-handler', function (req, res) {
      if (req.query.pension === 'no') {
        res.redirect('/lis/1/you/benefits/benefit-group1');
      } else {
        res.redirect('/lis/1/you/pension/pension-credit');
      }
    });

    //benefits
    app.get('/lis/1/you/benefits/benefit-handler', function (req, res) {
      if (req.query.benefit === 'no') {
        res.redirect('/lis/1/you/benefits/other-money');
      } else {
        res.redirect('/lis/1/you/benefits/benefit-group1');
      }
    });


//LIS sprint 0


    app.get('/lis/0', function (req, res) {
      res.render('lis/0/');
    });

    //partner
    app.get('/lis/0/registration/partner-handler', function (req, res) {
      if (req.query.partner === 'yes') {
        res.redirect('/lis/0/registration/partners-details');
      } else {
        res.redirect('/lis/0/registration/registration-summary');
      }
    });

    //about you summary
    app.get('/lis/0/you/about-you-summary', function (req, res) {
      res.render('lis/0/you/about-you-summary', {
        'myWork' : myWork
      });
    });

    //education
    app.get('/lis/0/you/education-handler', function (req, res) {
      if (req.query.education === 'yes') {
        res.redirect('/lis/0/you/course');
      } else {
        res.redirect('/lis/0/you/work');
      }
    });

    //work
    app.get('/lis/0/you/work-handler', function (req, res) {
      if (req.query.work === 'yes') {
        myWork = 'Yes';
        res.redirect('/lis/0/you/work-type');
      } else {
        myWork = 'No';
        res.redirect('/lis/0/you/benefits/pension');
      }
    });

    //pension
    app.get('/lis/0/you/benefits/pension-handler', function (req, res) {
      if (req.query.pension === 'no') {
        res.redirect('/lis/0/you/benefits/benefits');
      } else {
        res.redirect('/lis/0/you/benefits/pension-type');
      }
    });

    //benefits
    app.get('/lis/0/you/benefits/benefit-handler', function (req, res) {
      if (req.query.benefit === 'no') {
        res.redirect('/lis/0/you/benefits/other-money');
      } else {
        res.redirect('/lis/0/you/benefits/benefit-group1');
      }
    });

  }
};

//3967
