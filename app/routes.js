//import the person constructor
var person = require("./person.js");

var partnerLiveText;
var partnerOrText;
var partnerAndText;
var continueText = 'Continue';
var changeText = 'View or change';
var jointTennantText;
var jointOwnerText;
var completedText = "Completed";

var helpLevel = 3;

var peopleList;

var resetPeople = function () {
  peopleList = [];
  console.log('resetting people')
}

resetPeople();

var i,
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
  this.contactPref = null
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
  this.othersAtHome = false,
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
    partnerOrText = 'you';
    partnerAndText = 'you';
    partnerLiveText = 'Does anyone else live in your home with you?';
    jointTennantText = 'Is anyone else a joint tenant of the place you live';
    jointOwnerText = 'Is anyone else a joint owner of the place you live';
  } else {
    partnerOrText = 'you or your partner';
    partnerAndText = 'you and your partner';
    partnerLiveText = 'Does anyone else other than your partner live in your home with you?';
    jointTennantText = 'Is anyone else other than your partner a joint tenant of the place you live';
    jointOwnerText = 'Is anyone else other than your partner a joint owner of the place you live';
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


    // council-tax-handler
    app.get(/ctax-handler/, function (req, res) {
      if (req.query.counciltax === 'yes') {
        res.redirect('../tax-amount');
      } else {
        res.redirect('../ground-rent');
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
    
    // mortgaged-handler
    app.get(/mortgaged-handler/, function (req, res) {
      if (req.query.mortgaged === 'yes') {
        res.redirect('../mortgage-amount');
      } else {
        res.redirect('../../services');
      }
    });
    
    // hospital-handler
    app.get(/hospital-handler/, function (req, res) {
      application.whereYouLiveStatus = "Started";
      application.whereYouLiveLink = continueText;
      res.redirect('../home');
    });

    // updates the home page when the you section is completed
    app.get(/you-done/, function (req, res) {
      application.aboutYouStatus = completedText;
      application.aboutYouLink = changeText;
      if (application.allComplete() === true) {
        res.redirect('../../lis-home-updated');
      } else {
        res.redirect('../../lis-home');
      }
    });
    
    // updates the home page when the partner section is completed
    app.get(/partner-done/, function (req, res) {
      application.aboutPartnerStatus = completedText;
      application.aboutPartnerLink = changeText;
      if (application.allComplete() === true) {
        res.redirect('../../lis-home-updated');
      } else {
        res.redirect('../../lis-home');
      }
    });
    
    // updates the home page when the assets section is completed
    app.get(/assets-done/, function (req, res) {
      application.propertyStatus = completedText;
      application.propertyLink = changeText;
      if (application.allComplete() === true) {
        res.redirect('../../lis-home-updated');
      } else {
        res.redirect('../../lis-home');
      }
    });

    // updates the home page when the living section is completed
    app.get(/live-done/, function (req, res) {
      application.whereYouLiveStatus = completedText;
      application.whereYouLiveLink = changeText;
      if (application.allComplete() === true) {
        res.redirect('../../lis-home-updated');
      } else {
        res.redirect('../../lis-home');
      }
    });
    
    // savings kickout handler
    app.get(/savings-ko-handler/, function (req, res) {
      if (req.query.savings === 'yes') {
        res.redirect('../savings-kickout');
      } else {
        res.redirect('../guarantee-credit');
      }
    });
    
    // carehome savings kickout handler
    app.get(/carehome-savings-handler/, function (req, res) {
      if (req.query.savings === 'yes') {
        res.redirect('../../savings-kickout');
      } else {
        res.redirect('../../guarantee-credit');
      }
    });
    
    // property handler
    app.get(/property-handler/, function (req, res) {
      application.propertyStatus = "Started";
      application.propertyLink = continueText;
      if (req.query.property === "yes") {
        res.redirect('../second-address');
      } else {
        res.redirect('../money');
      }
    });

    
    
    
    
    // get a request for a url
    // serve the file located in that folder
    
    app.get(/tester/, function (req, res) {
      console.log(req.query);
      res.redirect('../testing2');
    });  

    //LIS exemption

    app.get('/lis/exemption/hc2certificate', function (req, res) {
      res.render('lis/exemption/hc2certificate', {
        'cert-title' : 'HC2'
      });
    });
    
    
//LIS sprint 7
    
    //7) telephone-number-handler
    app.get('/lis/7/save-continue/telephone-number-handler', function (req, res) {
      applicant.telephone = req.query.telephone;
      console.log(applicant.telephone);
      res.redirect('/lis/7/save-continue/code');
    });
    
    //7) save-continue/code
    app.get('/lis/7/save-continue/code', function (req, res) {
      res.render('lis/7/save-continue/code', {
      'telephone' : applicant.telephone
      });
    });
    
    //7) ref-email-handler
    app.get('/lis/7/save-continue/ref-email-handler', function (req, res) {
      if (req.query.email != '') {
        applicant.email = req.query.email;
      }
      res.redirect('/lis/7/save-continue/mem-word');
    });
    
    //7) email-address-handler
    app.get('/lis/7/you/email-address-handler', function (req, res) {
      if (req.query.email != '') {
        applicant.email = req.query.email;
      }
      res.redirect('/lis/7/you/work');
    });
    
    //7)
    app.get('/lis/7/you/email', function (req, res) {
      res.render('lis/7/you/email', {
          'email' : applicant.email
        });
    });

    //7) contact-handler
    app.get('/lis/7/you/contact-handler', function (req, res) {
      applicant.contactPref = req.query.contact;
      console.log(applicant.contactPref);
      if (applicant.contactPref === 'email' || applicant.contactPref === 'both') {
        if (applicant.email != null) {
          res.render('lis/7/you/email', {
            'email' : applicant.email
          });
        } else {
          res.render('lis/7/you/email-new');
        }
      } else if (applicant.contactPref === 'telephone') {
        res.render('lis/7/you/telephone', {
          'telephone' : applicant.telephone
        });
      }
    });
    
    //7) email handler
    app.get('/lis/7/you/email-handler', function (req, res) {
      if(applicant.contactPref === 'both') {
        res.render('lis/7/you/telephone', {
          'telephone' : applicant.telephone
        });
      } else {
        res.render('lis/7/you/work');
      }
    });
    
    //7) email-me
    app.get('/lis/7/exemption/email-me', function (req, res) {
      helpLevel = req.query.helplevel;
      console.log(helpLevel);
      res.render('lis/7/exemption/email-me', {
        'helplevel' : helpLevel
      });
    });
    
    //7) email-confirm
    app.get('/lis/7/exemption/email-confirm', function (req, res) {
      res.render('lis/7/exemption/email-confirm', {
        'helplevel' : helpLevel
      });
    });
    
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
    app.get('/lis/7/lis-home', function (req, res) {
      res.render('lis/7/lis-home', {
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
    
    //7)
    app.get('/lis/7/lis-home-updated', function (req, res) {
      res.render('lis/7/lis-home-updated', {
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
        
    //7)
    app.get('/lis/7/assets/other-property', function (req, res) {
      res.render('lis/7/assets/other-property', {
        'partnerortext' : partnerOrText,
        'partnerandext' : partnerAndText
      });
    });
        
    //7)
    app.get('/lis/7/care-home-handler', function (req, res) {
      console.log(req.query);
      if (req.query.carehome === 'yes') {
        res.redirect('/lis/7/sc/authority-assessed');
      } else {
        res.redirect('/lis/7/savings');
      }
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
      res.render('lis/7/you/about-you-summary', {
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
    
    //7) registration-handler
    app.get('/lis/7/you/registration-handler', function (req, res) {
      application.aboutYouStatus = "Started";
      application.aboutYouLink = continueText;
      applicant.firstName = req.query.firstname;
      applicant.lastName = req.query.lastname;
      applicant.dobDay = req.query.day;
      applicant.dobMonth = convertMonth(req.query.month);
      applicant.dobYear = req.query.year;
      console.log(applicant.dobYear);
      res.render('lis/7/you/contact-prefs', {
        'applicantFirstName' : applicant.firstName
      });
    });

    //7) benefit handler
    app.get('/lis/7/you/benefits/sprint3-benefit-handler', function (req, res) {
      applicant.resetBenefits();
      benefits = req.query.sprint3benefits;
      console.log(typeof benefits);
      firstBenefit = applicant.benefitChecker(benefits);
      //if (firstBenefit === "aa") {
      //  res.render('lis/7/you/benefits/aa');
      //} else
      //if (firstBenefit === "ctc") {
      //  res.render('lis/7/you/benefits/ctc');
      //} else 
      if (firstBenefit === "dla") {
        res.render('lis/7/you/benefits/dla');
      } else if (firstBenefit === "pip") {
        res.render('lis/7/you/benefits/pip');
      } else {
        res.render('lis/7/you/benefits/benefit4');
      }
    });
    
    //7 Armed forces independence payment = single amount 
    
    //7 attendance allowance 
    app.get('/lis/7/you/benefits/attendance-allowance-handler', function (req, res) {
      if (applicant.childTaxCredits === true) {
        res.render('lis/7/you/benefits/ctc');
      } else if (applicant.disabilityLivingAllowance === true) {
        res.render('lis/7/you/benefits/dla');
      } else if (applicant.personalIndependence === true) {
        res.render('lis/7/you/benefits/pip');
      } else {
        res.render('lis/7/you/benefits/benefit4');
      }
    });
    
    //7 Carers allowance = single amount 
    
    //7 child tax credit 
    app.get('/lis/7/you/benefits/ctc-handler', function (req, res) {
      if (applicant.disabilityLivingAllowance === true) {
        res.render('lis/7/you/benefits/dla');
      } else if (applicant.personalIndependence === true) {
        res.render('lis/7/you/benefits/pip');
      } else {
        res.render('lis/7/you/benefits/benefit4');
      }
    });

    //7 disability living allowance
    app.get('/lis/7/you/benefits/dla-handler', function (req, res) {
      if (applicant.personalIndependence === true) {
        res.render('lis/7/you/benefits/pip');
      } else {
        res.render('lis/7/you/benefits/benefit4');
      }
    });
    
    //7 Industrial injuries disablement benefit
    
    //7 Maintenance payments
        
    //7) home
    app.get('/lis/7/live/home', function (req, res) {
      applicant.resetLivingSituation();
      res.render('lis/7/live/home');
    });

    //7) mortgaged/joint
    app.get('/lis/7/live/mortgaged/joint', function (req, res) {
      res.render('lis/7/live/mortgaged/joint', {
        'jointownertext' : jointOwnerText
      });
    });
    
    //7) tenant/joint
    app.get('/lis/7/live/mortgaged/joint', function (req, res) {
      res.render('lis/7/live/mortgaged/joint', {
        'partnerortext' : partnerOrText
      });
    });
    
    //7) tenant/joint
    app.get('/lis/7/live/joint', function (req, res) {
      res.render('lis/7/live/joint', {
        'jointtennanttext' : jointTennantText
      });
    });

    //7) where you live
    app.get('/lis/7/live/home-handler', function (req, res) {
      console.log(req.query);
      if (req.query.home === 'own') {
        applicant.homeOwner = true;
        res.redirect('/lis/7/live/mortgaged/joint');
      } else if (req.query.home === 'rented') {
        applicant.tennant = true;
        res.redirect('/lis/7/live/joint');
      } else if (req.query.home === 'guest') {
        applicant.guest = true;
        res.redirect('/lis/7/live/guest/address');
      } else {
        res.redirect('/lis/7/live/home');
      }
    });

    //7) pension credit handler
    app.get('/lis/7/you/pension/pencred-handler', function (req, res) {
      if (req.query.savingscredit === 'yes') {
        applicant.savingsCredit = true;
        res.redirect('/lis/7/you/pension/credit-amount');
      } else {
        applicant.savingsCredit = false;
        res.redirect('/lis/7/you/pension/pension-type');
      }
    });

    //7) pension-handler
    app.get('/lis/7/you/pension/pension-handler', function (req, res) {
      console.log(req.query);
      if (req.query.pension === 'yes') {
        res.redirect('/lis/7/you/pension/pension-credit');
      } else {
        res.redirect('/lis/7/you/benefits/benefit-sprint3');
      }
    });

    //7) pension-type-handler
    app.get('/lis/7/you/pension/pension-type-handler', function (req, res) {
      applicant.resetPension();
      pensions = req.query.pensiontype;
      console.log(pensions);
      if (pensions === 'state') {
        applicant.statePension = true;
        res.render('lis/7/you/pension/pension-amount');
      } else if (pensions === 'private') {
        applicant.privatePension = true;
        res.render('lis/7/you/pension/private-pension-amount');
      } else if (pensions === 'employment') {
        applicant.employmentPension = true;
        res.render('lis/7/you/pension/employment-pension-amount');
      } else if (pensions === 'wardisablement') {
        applicant.warPension = true;
        res.render('lis/7/you/pension/war-pension');
      } else if (pensions === 'warwidow') {
        applicant.warWidowPension = true;
        res.render('lis/7/you/pension/war-widow-pension');
      } else if (pensions === undefined) {
          res.redirect('/lis/7/you/pension/pension-type');
      } else {
        applicant.pensionChecker(pensions);
        if (applicant.statePension === true) {
          res.render('lis/7/you/pension/pension-amount');
        } else if (applicant.privatePension === true) {
          res.render('lis/7/you/pension/private-pension-amount');
        } else if (applicant.employmentPension === true) {
          res.render('lis/7/you/pension/employment-pension-amount');
        } else if (applicant.warPension === true) {
          res.render('lis/7/you/pension/war-pension');
        } else if (applicant.warWidowPension === true) {
          res.render('lis/7/you/pension/war-widow-pension');
        } else {
          res.redirect('/lis/7/you/benefits/benefit-sprint3');
        }
      }
    });
    
    //7) state-pension-handler
    app.get('/lis/7/you/pension/state-pension-handler', function (req, res) {
      applicant.statePensionAmount = req.query.amount;
      applicant.statePensionFrequency = req.query.frequency;
      if (applicant.privatePension === true) {
        res.redirect('/lis/7/you/pension/private-pension-amount');
      } else if (applicant.employmentPension === true) {
        res.redirect('/lis/7/you/pension/employment-pension-amount');
      } else {
        res.redirect('/lis/7/you/benefits/benefit-sprint3');
      }
    });

    //7) private-pension-handler
    app.get('/lis/7/you/pension/private-pension-handler', function (req, res) {
      if (applicant.employmentPension === true) {
        res.redirect('/lis/7/you/pension/employment-pension-amount');
      } else if (applicant.employmentPension === false) {
        res.redirect('/lis/7/you/benefits/benefit-sprint3');
      }
    });

    //7) employment-pension-handler
    app.get('/lis/7/you/pension/employment-pension-handler', function (req, res) {
      if (applicant.warPension === true) {
        res.redirect('/lis/7/you/pension/war-pension');
      } else if (applicant.warPension === false) {
        res.redirect('/lis/7/you/benefits/benefit-sprint3');
      }
    });

    //7) war-pension-handler
    app.get('/lis/7/you/pension/war-pension-handler', function (req, res) {
      if (applicant.warWidowPension === true) {
        res.redirect('/lis/7/you/pension/war-widow-pension');
      } else if (applicant.warWidowPension === false) {
        res.redirect('/lis/7/you/benefits/benefit-sprint3');
      }
    });

    //7) kickout-handler
    app.get('/lis/7/kickout-handler', function (req, res) {
      console.log(req.query);
      if (req.query.kickout === 'continue') {
        res.redirect('/lis/7/care-home');
      } else {
        res.redirect('/lis/7/kickout');
      }
    });

    //7) bank account handler
    app.get('/lis/7/assets/account-type-handler', function (req, res) {
      applicant.resetAccounts();
      accounts = req.query.banktype;
      firstSavingsAcc = applicant.savingChecker(accounts);
      if (firstSavingsAcc === 'bank') {
        res.render('lis/7/assets/accounts', {
          'partnerortext' : partnerOrText,
          'partnerandtext' : partnerAndText
        });
      } else if (firstSavingsAcc === 'pb') {
        res.render('lis/7/assets/premium-bonds', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : partnerAndText
        });
      } else {
        res.render('lis/7/assets/other', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : partnerAndText
        });
      }
    });
        
    //7)
    app.get('/lis/7/assets/bank-savings-handler', function (req, res) {
      if (applicant.premiumBonds === true) {
        res.render('lis/7/assets/premium-bonds');
      } else {
        res.render('lis/7/assets/other', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : partnerAndText
        });
      }
    });
        
    //7)
    app.get('/lis/7/assets/premium-bond-handler', function (req, res) {
      res.render('lis/7/assets/other', {
        'partnerortext' : partnerOrText,
        'partnerandrext' : partnerAndText
      });
    });
 
// 6) partner handlers
  
    //7) partner-pension-credit kickout
    app.get('/lis/7/partner/pension/pencred-handler', function (req, res) {
      console.log(req.query);
      if (req.query.prencred === 'ssp') {
        res.redirect('/lis/7/partner/pension/credit-amount');
      } else {
        res.redirect('/lis/7/partner/pension/pension-type');
      }
    });
    
    //7) partner pension-handler
    app.get('/lis/7/partner/pension/pension-handler', function (req, res) {
      console.log(req.query);
      if (req.query.pension === 'yes') {
        res.redirect('/lis/7/partner/pension/pension-credit');
      } else {
        res.redirect('/lis/7/partner/benefits/benefit-sprint3');
      }
    });
    

    //7) partner pension-type-handler
    app.get('/lis/7/partner/pension/pension-type-handler', function (req, res) {
      partner.resetPension();
      pensions = req.query.pensiontype;
      console.log(pensions);
      if (pensions === 'state') {
        partner.statePension = true;
        res.render('lis/7/partner/pension/pension-amount');
      } else if (pensions === 'private') {
        partner.privatePension = true;
        res.render('lis/7/partner/pension/private-pension-amount');
      } else if (pensions === 'employment') {
        partner.employmentPension = true;
        res.render('lis/7/partner/pension/employment-pension-amount');
      } else if (pensions === undefined) {
          res.redirect('/lis/7/partner/pension/pension-type');
      } else {
        partner.pensionChecker(pensions);
        if (partner.statePension === true) {
          res.render('lis/7/partner/pension/pension-amount');
        } else if (partner.privatePension === true) {
          res.render('lis/7/partner/pension/private-pension-amount');
        } else if (partner.employmentPension === true) {
          res.render('lis/7/partner/pension/employment-pension-amount');
        } else {
          res.redirect('/lis/7/partner/benefits/benefit-sprint3');
        }
      }
    });
    
    //7) partner state-pension-handler
    app.get('/lis/7/partner/pension/state-pension-handler', function (req, res) {
      if (partner.privatePension === true) {
        res.redirect('/lis/7/partner/pension/private-pension-amount');
      } else if (applicant.employmentPension === true) {
        res.redirect('/lis/7/partner/pension/employment-pension-amount');
      } else {
        res.redirect('/lis/7/partner/benefits/benefit-sprint3');
      }
    });

    //7) partner private-pension-handler
    app.get('/lis/7/partner/pension/private-pension-handler', function (req, res) {
      if (partner.employmentPension === true) {
        res.redirect('/lis/7/partner/pension/employment-pension-amount');
      } else if (applicant.employmentPension === false) {
        res.redirect('/lis/7/partner/benefits/benefit-sprint3');
      }
    });

    //7) partner benefit handler
    app.get('/lis/7/partner/benefits/sprint3-benefit-handler', function (req, res) {
      partner.resetBenefits();
      partnerBenefits = req.query.sprint3benefits;
      console.log(typeof partnerBenefits);
      firstPartnerBenefit = partner.benefitChecker(partnerBenefits);
      console.log(firstPartnerBenefit);
      //if (firstPartnerBenefit === "aa") {
      //  res.render('lis/7/partner/benefits/aa');
      //} else if (firstPartnerBenefit === "ctc") {
      //  res.render('lis/7/partner/benefits/ctc');
      //} else 
      if (firstPartnerBenefit === "dla") {
        res.render('lis/7/partner/benefits/dla');
      } else if (firstPartnerBenefit === "pip") {
        res.render('lis/7/partner/benefits/pip');
      } else {
        res.render('lis/7/partner/benefits/benefit4');
      }
    });

    //7 attendance allowance 
    app.get('/lis/7/partner/benefits/attendance-allowance-handler', function (req, res) {
      if (partner.childTaxCredits === true) {
        res.render('lis/7/partner/benefits/ctc');
      } else if (partner.disabilityLivingAllowance === true) {
        res.render('lis/7/partner/benefits/dla');
      } else if (partner.personalIndependence === true) {
        res.render('lis/7/partner/benefits/pip');
      } else {
        res.render('lis/7/partner/benefits/benefit4');
      }
    });
    
    //7 partner child tax credit 
    app.get('/lis/7/partner/benefits/ctc-handler', function (req, res) {
      if (partner.disabilityLivingAllowance === true) {
        res.render('lis/7/partner/benefits/dla');
      } else if (partner.personalIndependence === true) {
        res.render('lis/7/partner/benefits/pip');
      } else {
        res.render('lis/7/partner/benefits/benefit4');
      }
    });

    //7 partner disability living allowance
    app.get('/lis/7/partner/benefits/dla-handler', function (req, res) {
      if (partner.personalIndependence === true) {
        res.render('lis/7/partner/benefits/pip');
      } else {
        res.render('lis/7/partner/benefits/benefit4');
      }
    });
 
    //7) householder
                    
    //7) people-handler
    app.get('/lis/7/live/others/people-list', function (req, res) {
      res.render('lis/7/live/others/people-list', {
        'partnerlivetext' : partnerLiveText,
        'peoplelist' : peopleList
      });
    });
    
    //7) people-handler
    app.get('/lis/7/live/others/people', function (req, res) {
      res.render('lis/7/live/others/people', {
        'partnerlivetext' : partnerLiveText
      });
    });
    
    //7) persons details
    app.get('/lis/7/live/others/name', function (req, res) {
      householder.resetHouseHolder();
      res.render('lis/7/live/others/name');
    });
    
    //7) people-handler
    app.get('/lis/7/live/others/people-handler', function (req, res) {
      if (req.query.people === 'yes') {
        res.redirect('/lis/7/live/others/name');
      } else {
        res.redirect('/lis/7/live/living-summary');
      }
    });
    
    //7 others details
    app.get('/lis/7/live/others/others-details', function (req, res) {
      householder.firstName = (req.query.firstname);
      console.log(householder.firstName);
      householder.lastName = (req.query.lastname);
      var bigname = householder.firstName + " " + householder.lastName;
      peopleList.push(bigname);
      householder.age = (2016 - req.query.dob);
      console.log(householder.age);
      householder.ageRange();
      if (householder.overNineteen) {
        res.render('lis/7/live/others/boarder');
      } else {
        res.render('lis/7/live/others/relationship');
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


    //7) relationship-handler
    app.get('/lis/7/live/others/relationship-handler', function (req, res) {
      householder.relationship = req.query.relationship;
      console.log(householder.relationship);
      if (householder.underFifteen === true) {
        //child || none underFifteen = people
        res.render('lis/7/live/others/people-list', {
          'partnerlivetext' : partnerLiveText,
          'peoplelist' : peopleList
        });
      } else if (householder.relationship === 'child' && householder.sixteenToNineteen === true) {
        //child sixteenToNineteen = education
        res.render('lis/7/live/others/alevel');
      } else if (householder.relationship === 'none' && householder.sixteenToNineteen === true) {
        //none sixteenToNineteen = boarder
        res.render('lis/7/live/others/boarder');
      } else if (householder.relationship === 'child' && householder.overNineteen === true) {
        //child overNineteen = full time-education
        res.render('lis/7/live/others/ft-student');
      } else if (householder.relationship === 'none' && householder.overNineteen === true) {
        //none overNineteen = boarder
        res.render('lis/7/live/others/boarder');
      }
    });
    
    //7) others-work-handler
    app.get('/lis/7/live/others/others-work-handler', function (req, res) {
      console.log(req.query);
      if (req.query.work === 'yes') {
        res.render('lis/7/live/others/hours');
      } else {
        if (householder.sixteenToNineteen) {
          res.render('lis/7/live/others/benefits-reduced');
        } else {
          res.render('lis/7/live/others/benefits');
        }
      }
    });
    
    //7) others-education-handler
    app.get('/lis/7/live/others/others-education-handler', function (req, res) {
      if (req.query.education === 'yes') {
        res.render('lis/7/live/others/people-list', {
          'partnerlivetext' : partnerLiveText
        });
      } else {
        res.render('lis/7/live/others/training');
      }
    });
    
    //7) others-training-handler
    app.get('/lis/7/live/others/others-training-handler', function (req, res) {
      if (req.query.training === 'yes') {
        res.redirect('/lis/7/live/others/people-list');
      } else {
        res.redirect('/lis/7/live/others/he-student');
      }
    });
    
    //7) boarder-handler
    app.get('/lis/7/live/others/boarder-handler', function (req, res) {
      if (req.query.boarder === 'yes') {
        res.redirect('/lis/7/live/others/boarder-detail');
      } else {
        res.redirect('/lis/7/live/others/ft-student');
      }
    });

//LIS sprint 7- Wizard


    //7) country-handler
    app.get('/lis/7/wizard/country-handler', function (req, res) {
      console.log(req.query);
      if (req.query.eligibility === 'uk') {
        res.render('lis/7/wizard/dla');
      } else if (req.query.eligibility === 'eu') {
        res.render('lis/7/wizard/eu');
      } else {
        res.redirect('/lis/7/wizard/country');
      }
    });

    //7) region-handler
    app.get('/lis/7/wizard/region-handler', function (req, res) {
      console.log(req.query);
      if (req.query.eligibility === 'uk') {
        res.render('lis/7/wizard/dla');
      } else if (req.query.eligibility === 'eu') {
        res.render('lis/7/wizard/eu');
      } else {
        res.redirect('/lis/7/wizard/date-of-birth');
      }
    });

    //7) eligibility-handler
    app.get('/lis/7/wizard/eligibility-handler', function (req, res) {
      console.log(req.query);
      if (req.query.kickout === 'continue') {
        res.redirect('/lis/7/wizard/lis');
      } else {
        res.redirect('/lis/7/wizard/full-exemption');
      }
    });
    
//LIS sprint 6
    
    //6) contact-handler
    app.get('/lis/6/you/contact-handler', function (req, res) {
      if (req.query.contact === "email") {
        applicant.contactPref ='email';
        res.render('lis/6/you/email');
      } else if (req.query.contact === "telephone") {
        applicant.contactPref ='telephone';
        res.render('lis/6/you/telephone');
      } else if (req.query.contact === "both") {
        applicant.contactPref ='both';
        res.render('lis/6/you/email');
      } else {
        applicant.contactPref ='none';
        res.render('lis/6/you/email');
      }
    });
    
    //6) email handler
    app.get('/lis/6/you/email-handler', function (req, res) {
      if(applicant.contactPref === 'both') {
        res.render('lis/6/you/telephone');
      } else {
        res.render('lis/6/you/work');
      }
    });
    
    //6) email-me
    app.get('/lis/6/exemption/email-me', function (req, res) {
      helpLevel = req.query.helplevel;
      res.render('lis/6/exemption/email-me', {
        'helplevel' : helpLevel
      });
    });
    
    //6) email-confirm
    app.get('/lis/6/exemption/email-confirm', function (req, res) {
      res.render('lis/6/exemption/email-confirm', {
        'helplevel' : helpLevel
      });
    });
    
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
    app.get('/lis/6/lis-home', function (req, res) {
      res.render('lis/6/lis-home', {
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
    
    //6)
    app.get('/lis/6/lis-home-updated', function (req, res) {
      res.render('lis/6/lis-home-updated', {
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
        
    //6)
    app.get('/lis/6/assets/other-property', function (req, res) {
      res.render('lis/6/assets/other-property', {
        'partnerortext' : partnerOrText,
        'partnerandext' : partnerAndText
      });
    });
        
    //6)
    app.get('/lis/6/care-home-handler', function (req, res) {
      if (req.query.carehome === 'yes') {
        res.redirect('/lis/6/sc/authority-assessed');
      } else {
        res.redirect('/lis/6/savings');
      }
    });
    
    //6)
    app.get('/lis/6/sc/authority-assessed-handler', function (req, res) {
      if (req.query.authority === 'yes') {
        res.redirect('/lis/6/sc/about-you');
      } else {
        res.redirect('/lis/6/sc/savings');
      }
    });
        
    //6)
    app.get('/lis/6/assets/property', function (req, res) {
      res.render('lis/6/assets/property', {
        'partnerortext' : partnerOrText,
        'partnerandext' : partnerAndText
      });
    });
    
    //6)
    app.get('/lis/6/assets/other', function (req, res) {
      res.render('lis/6/assets/other', {
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

    //6) pension credit kick out
    app.get('/lis/6/you/pension/pencred-handler', function (req, res) {
      if (req.query.prencred === 'ssp') {
        res.redirect('/lis/6/you/pension/credit-amount');
      } else {
        res.redirect('/lis/6/you/pension/pension-type');
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
        res.render('lis/6/assets/other', {
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
        res.render('lis/6/assets/other', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : partnerAndText
        });
      }
    });
        
    //6)
    app.get('/lis/6/assets/premium-bond-handler', function (req, res) {
      res.render('lis/6/assets/other', {
        'partnerortext' : partnerOrText,
        'partnerandrext' : partnerAndText
      });
    });
 
// 6) partner handlers
  
    //6) partner-pension-credit kickout
    app.get('/lis/6/partner/pension/pencred-handler', function (req, res) {
      if (req.query.prencred === 'ssp') {
        res.redirect('/lis/6/partner/pension/credit-amount');
      } else {
        res.redirect('/lis/6/partner/pension/pension-type');
      }
    });
    
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
    
    app.get('/lis/5/lis-home', function (req, res) {
      res.render('lis/5/lis-home', {
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
    
    app.get('/lis/5/lis-home-updated', function (req, res) {
      res.render('lis/5/lis-home-updated', {
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
        
    app.get('/lis/5/assets/other-property', function (req, res) {
      res.render('lis/5/assets/other-property', {
        'partnerortext' : partnerOrText,
        'partnerandext' : partnerAndText
      });
    });

    app.get('/lis/5/care-home-handler', function (req, res) {
      if (req.query.carehome === 'yes') {
        res.redirect('/lis/5/sc/authority-assessed');
      } else {
        res.redirect('/lis/5/savings');
      }
    });

    app.get('/lis/5/sc/authority-assessed-handler', function (req, res) {
      if (req.query.authority === 'yes') {
        res.redirect('/lis/5/sc/about-you');
      } else {
        res.redirect('/lis/5/sc/savings');
      }
    });

    app.get('/lis/5/sc/savings-sc-kickout-handler', function (req, res) {
      if (req.query.savings === 'yes') {
        res.redirect('/lis/5/savings-kickout');
      } else {
        res.redirect('/lis/5/need-to-know');
      }
    });
    
    app.get('/lis/5/assets/property', function (req, res) {
      res.render('lis/5/assets/property', {
        'partnerortext' : partnerOrText,
        'partnerandext' : partnerAndText
      });
    });
        
    app.get('/lis/5/assets/other', function (req, res) {
      res.render('lis/5/assets/other', {
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

    //5) pension credit kick out
    app.get('/lis/5/you/pension/pencred-handler', function (req, res) {
      if (req.query.prencred === 'ssp') {
        res.redirect('/lis/5/you/pension/credit-amount');
      } else {
        res.redirect('/lis/5/you/benefits/benefit-sprint3');
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
        res.render('lis/5/assets/other', {
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
        res.render('lis/5/assets/other', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : partnerAndText
        });
      }
    });
        
    //5)
    app.get('/lis/5/assets/premium-bond-handler', function (req, res) {
      res.render('lis/5/assets/other', {
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
  
    //5) partner-pension-credit kickout
    app.get('/lis/5/partner/pension/pencred-handler', function (req, res) {
      if (req.query.prencred === 'ssp') {
        res.redirect('/lis/5/partner/pension/credit-amount');
      } else {
        res.redirect('/lis/5/partner/benefits/benefit-sprint3');
      }
    });
    
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
    
    
//LIS sprint 4
    
    app.get('/lis/4/lis-home', function (req, res) {
      res.render('lis/4/lis-home', {
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
    
    app.get('/lis/4/lis-home-updated', function (req, res) {
      res.render('lis/4/lis-home-updated', {
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
    
    app.get('/lis/4/care-home-handler', function (req, res) {
      if (req.query.carehome === 'yes') {
        res.redirect('/lis/4/carehome-kickout');
      } else {
        res.redirect('/lis/4/savings');
      }
    });
    
    app.get('/lis/4/assets/property', function (req, res) {
      res.render('lis/4/assets/property', {
        'partnerortext' : partnerOrText,
        'partnerandext' : partnerAndText
      });
    });
        
    app.get('/lis/4/assets/other', function (req, res) {
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

    //4) pension credit kick out
    app.get('/lis/4/you/pension/pencred-handler', function (req, res) {
      if (req.query.prencred === 'ib') {
        res.redirect('/lis/4/kickout');
      } else {
        res.redirect('/lis/4/you/pension/pension-type');
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
        res.render('lis/4/assets/other', {
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
        res.render('lis/4/assets/other');
      }
    });
        
    //4)
    app.get('/lis/4/assets/premium-bond-handler', function (req, res) {
      res.render('lis/4/assets/other');
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
    
  
    //4) partner-pension-credit kickout
    app.get('/lis/4/partner/pension/pencred-handler', function (req, res) {
      if (req.query.prencred === 'ib') {
        res.redirect('/lis/4/kickout');
      } else {
        res.redirect('/lis/4/partner/pension/pension-type');
      }
    });
    
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
    
    app.get('/lis/3/assets/property', function (req, res) {
      res.render('lis/3/assets/property', {
        'partnerortext' : partnerOrText,
        'partnerandext' : partnerAndText
      });
    });
        
    app.get('/lis/3/assets/other', function (req, res) {
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

    //3) pension credit kick out
    app.get('/lis/3/you/pension/pencred-handler', function (req, res) {
      if (req.query.prencred === 'ib') {
        res.redirect('/lis/3/kickout');
      } else {
        res.redirect('/lis/3/you/pension/pension-type');
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
        res.render('lis/4/assets/other', {
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
        res.render('lis/3/assets/other');
      }
    });
        
    //3)
    app.get('/lis/3/assets/premium-bond-handler', function (req, res) {
      res.render('lis/3/assets/other');
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

    //3) partner-pension-credit kickout
    app.get('/lis/3/partner/pension/pencred-handler', function (req, res) {
      if (req.query.prencred === 'ib') {
        res.redirect('/lis/3/kickout');
      } else {
        res.redirect('/lis/3/partner/pension/pension-type');
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

    //2) pension-credit
    app.get('/lis/2/you/pension/pencred-handler', function (req, res) {
      if (req.query.prencred === 'ib') {
        res.redirect('/lis/2/kickout');
      } else {
        res.redirect('/lis/2/you/pension/pension-type');
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
        res.redirect('/lis/2/assets/other');
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