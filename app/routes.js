// Create a partnerOrText variable for 'you'
var partnerOrText = 'you';
var partnerAndText = 'you';
// include the variable on the relevant pages
// Check for the answer to 'do you have a partner?'
// if there is a partner, change the text to include 'or your partner'

function setPartnerText() {
  if (applicant.partner === true) {
    partnerOrText = 'you or your partner';
    partnerAndText = 'you and your partner';
  }  
}

function Person(
  firstName,
  lastName,
  partner,
  privatePension,
  statePension,
  savings,
  premiumBonds,
  disabilityLivingAllowance,
  attendanceAllowance,
  childTaxCredits,
  homeOwner,
  tennant,
  othersAtHome,
  fullName,
  bankAccount,
  premiumBonds) { 
    this.firstName = firstName;
    this.lastName = lastName;
    this.partner = partner;
    this.privatePension = privatePension;
    this.statePension = statePension;
    this.savings = savings;
    this.premiumBonds = premiumBonds;
    this.disabilityLivingAllowance = disabilityLivingAllowance;
    this.attendanceAllowance = attendanceAllowance;
    this.childTaxCredits = childTaxCredits;
    this.homeOwner = homeOwner;
    this.tennant = tennant;
    this.othersAtHome = othersAtHome;
    this.bankAccount = bankAccount;
    this.premiumBonds = premiumBonds;
    this.fullName = function() {
      return this.firstName + " " + this.lastName;
  },
  this.resetBenefits = function() {
    this.disabilityLivingAllowance = false;
    this.attendanceAllowance = false;
    this.personalIndependence = false;
    this.childTaxCredits = false;
    console.log('resetting benefits...');
  },
  this.resetLivingSituation = function() {
    this.homeOwner = false;
    this.tennant = false;
    console.log('resetting living situation...');
  },
  this.resetAccounts = function() {
    this.savings = false;
    this.premiumBonds = false;
    console.log('resetting bank accounts...');
  },
  this.resetPartner = function() {
    this.partner = false;
  },
  this.printPerson = function() {
    console.log (
      this.firstName + "\n" +
      "privatePension = " + this.privatePension + " \n" +
      "statePension = " + this.statePension + " \n" +
      "disabilityLivingAllowance = " + this.disabilityLivingAllowance + " \n" +
      "child tax credits = " + this.childTaxCredits + " \n" +
      "attendanceAllowance = " + this.attendanceAllowance + "\n"
    );
  }, 
  this.benefitChecker = function(benefits) {
    if(typeof benefits == "string") {
      if(benefits === "aa") {
        this.attendanceAllowance = true;
        console.log( "aa");
        return "aa";
      } else if(benefits === "ctc") {
        this.childTaxCredits = true;
        console.log( "ctc");
        return "ctc";
      } else if (benefits === "dla") {
        this.disabilityLivingAllowance = true;
        console.log( "dla");
        return "dla";
      } else if(benefits === "pip") {
        this.personalIndependence = true;
        console.log( "pip");
        return "pip";
      } else {
        console.log( "none");
        return "none";
      }
    } else if(typeof benefits == "object") {
      var firstBenefit = null;
      for (benefit in benefits) {
        if(benefits[benefit] === 'aa') {
          this.attendanceAllowance = true;
          console.log( "aa");
          if (firstBenefit === null) {
            firstBenefit = "aa";
          }
        } else if(benefits[benefit] === 'ctc') {
          this.childTaxCredits = true;
          console.log( "ctc");
          if (firstBenefit === null) {
            firstBenefit =  "ctc";
          }
        } else if(benefits[benefit] === 'dla') {
          this.disabilityLivingAllowance = true;
          console.log( "dla");
          if (firstBenefit === null) {
            firstBenefit =  "dla";
          }
        } else if(benefits[benefit] === 'pip') {
          this.personalIndependence = true;
          console.log( "pip");
          if (firstBenefit === null) {
            firstBenefit = "pip";
          }
        } else if(benefits[benefit] === 'none') {
          console.log( "none");
          if (firstBenefit === null) {
            firstBenefit = "none";
          }
        }
      }
      return firstBenefit;
    }
  },  
  this.savingChecker = function(savings) {
    if(typeof savings == "string") {
      if(savings === "bank") {
        this.bankAccount = true;
        return "bank";
      } else if(savings === "pb") {
        this.premiumBonds = true;
        return "pb";
      } else {
        return "none";
      }
    } else if(typeof savings == "object") {
      var firstSaving = null;
      for (savingsType in savings) {
        if(savings[savingsType] === 'bank') {
          this.bankAccount = true;
          if (firstSaving === null) {
            firstSaving = "bank";
          }
        } else if(savings[savingsType] === 'pb') {
          this.premiumBonds = true;
          if (firstSaving === null) {
            firstSaving =  "pb";
          }
        } else if(savings[savingsType] === 'none') {
          if (firstSaving === null) {
            firstSaving = "none";
          }
        }
      }
      return firstSaving;
    }
  }
}

//Person.prototype.printperson...

function Household() {
  this.people = [];
}

Household.prototype.add = function(person) {
  this.people.push(person);
}

var applicant = new Person(
  firstName = null,
  lastName = null,
  partner = false,
  privatePension = false,
  statePension = false,
  savings = false,
  premiumBonds = false,
  disabilityLivingAllowance = false,
  attendanceAllowance = false,
  homeOwner = false,
  tennant = false,
  othersAtHome = false,
  bankAccount = false,
  premiumBonds = false
);

var partner = new Person(
  firstName = null,
  lastName = null,
  partner = false,
  privatePension = false,
  statePension = false,
  savings = false,
  premiumBonds = false,
  disabilityLivingAllowance = false,
  attendanceAllowance = false,
  homeOwner = false,
  tennant = false,
  othersAtHome = false
);

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
  ageRange : function() {
    if (householder.age <= 15) {
      householder.underFifteen = true;
    } else if (householder.age >= 16 && householder.age <= 19) {
      householder.sixteenToNineteen = true;
    } else if (householder.age >= 20) {
      householder.overNineteen = true;
    }
  },
  resetHouseHolder : function() {
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

var querystring = require('querystring');

module.exports = {
  bind : function (app) {
    function find_gp_practice(slug) {
      return app.locals.gp_practices.filter(
        function(p) {
          return p.slug === slug;
        }
      )[0];
    }

    app.get('/', function (req, res) {
      res.render('index');
      resetVars();
      applicant.resetBenefits;
      console.log('applicant =');
      applicant.printPerson();
      partner.resetBenefits;
      console.log('person =');
      partner.printPerson();
    });
    
    // add your routes here
    
    // ***********
    //LIS sprint 4
    // ***********
    
    app.get('/lis/4/care-home-handler', function (req, res) {
      console.log(req.query)
      if(req.query.carehome === 'yes') {
        res.redirect('/lis/4/carehome-kickout');
      } else {
        res.redirect('/lis/4/savings');
      }
    });
    
    app.get('/lis/4/assets/property', function (req, res) {
        console.log(partnerOrText);
        res.render('lis/4/assets/property', {
        'partnerortext' : partnerOrText,
        'partnerandext' : partnerAndText
        });
    });
        
    app.get('/lis/4/assets/other', function (req, res) {
        console.log(partnerOrText);
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
      console.log(req.query)
      if(req.query.savings === 'yes') {
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
      if(req.query.partner == 'yes') {
        applicant.partner = true;
        setPartnerText();
        res.render('lis/4/partner/basic');
      } else if(req.query.partner == 'no') {
        applicant.partner = false;
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
        'applicantFullName' : applicant.fullName(),
      });
    });
    
    //4) registration-handler
    app.get('/lis/4/you/registration-handler', function(req, res) {
      applicant.firstName = req.query.firstname;
      applicant.lastName = req.query.lastname;
      res.render('lis/4/you/contact', {
        'applicantFirstName' : applicant.firstName
      });
    });

    //4) benefit handler
    app.get('/lis/4/you/benefits/sprint3-benefit-handler', function (req, res) {
      applicant.resetBenefits();
      var benefits = req.query.sprint3benefits;
      console.log(typeof benefits);
      var firstBenefit = applicant.benefitChecker(benefits);
      if(firstBenefit === "aa") {
        res.render('lis/4/you/benefits/aa');
      } else if(firstBenefit === "ctc") {
        res.render('lis/4/you/benefits/ctc');
      } else if (firstBenefit === "dla") {
        res.render('lis/4/you/benefits/dla');
      } else if(firstBenefit === "pip") {
        res.render('lis/4/you/benefits/pip');
      } else if (firstBenefit === "none") {
        res.render('lis/4/you/benefits/benefit7');
      }
    });
    
    //4 Armed forces independence payment = single amount 
    
    //4 attendance allowance 
    app.get('/lis/4/you/benefits/attendance-allowance-handler', function(req, res) {
      if(applicant.childTaxCredits === true){
        res.render('lis/4/you/benefits/ctc');
      } else if(applicant.disabilityLivingAllowance === true){
        res.render('lis/4/you/benefits/dla');
      } else if(applicant.personalIndependence === true){
        res.render('lis/4/you/benefits/pip');
      } else {
        res.render('lis/4/you/benefits/benefit7');
      }
    });
    
    //4 Carers allowance = single amount 
    
    //4 child tax credit 
    app.get('/lis/4/you/benefits/ctc-handler', function(req, res) {
      if(applicant.disabilityLivingAllowance === true){
        res.render('lis/4/you/benefits/dla');
      } else if(applicant.personalIndependence === true){
        res.render('lis/4/you/benefits/pip');
      } else {
        res.render('lis/4/you/benefits/benefit7');
      }
    });

    //4 disability living allowance
    app.get('/lis/4/you/benefits/dla-handler', function(req, res) {
      if(applicant.personalIndependence === true){
        res.render('lis/4/you/benefits/pip');
      } else {
        res.render('lis/4/you/benefits/benefit7');
      }
    });
    
    //4 Industrial injuries disablement benefit
    
    //4 Maintenance payments
        
    //4) home
    app.get('/lis/4/live/home', function(req, res) {
        applicant.resetLivingSituation;
        res.render('lis/4/live/home');
    });

    //4) where you live
    app.get('/lis/4/live/home-handler', function(req, res) {
      console.log(req.query);
      if (req.query.home == 'own') {
        applicant.homeOwner = true;
        res.redirect('/lis/4/live/mortgaged/joint');
      } else if (req.query.home == 'rented') {
        applicant.tennant = true;
        res.redirect('/lis/4/live/joint');
      } else {
        res.redirect('/lis/4/live/joint');
      }
    });

    //4) pension credit kick out
    app.get('/lis/4/you/pension/pencred-handler', function(req, res) {
      console.log(req.query);
      if (req.query.prencred == 'ib') {
        res.redirect('/lis/4/kickout');
      } else {
        res.redirect('/lis/4/you/pension/pension-type');
      }
    });

    //4) pension-handler
    app.get('/lis/4/you/pension/pension-handler', function(req, res) {
      console.log(req.query);
      if (req.query.pension === 'yes') {
        res.redirect('/lis/4/you/pension/pension-credit');
      } else {
        res.redirect('/lis/4/you/benefits/benefit-sprint3');
      }
    });

    //4) pension-type-handler
    app.get('/lis/4/you/pension/pension-type-handler', function(req, res) {
      var pensions = req.query.pensiontype;
      console.log(pensions);
      if (pensions == 'state') {
        applicant.statePension = true;
        res.render('lis/4/you/pension/pension-amount');
      } else if(pensions == 'private') {
        applicant.privatePension = true;
        res.render('lis/4/you/pension/private-pension-amount');
      } else {
        for (pension in pensions) {
          console.log(pensions[pension]); 
            if(pensions[pension] == 'state') {
              applicant.statePension = true;
            } else if(pensions[pension] == 'private') {
              applicant.privatePension = true;
            }
        };
        if(applicant.statePension == true) {
          res.render('lis/4/you/pension/pension-amount');
        } else if(applicant.privatePension == true) {
          res.render('lis/4/you/pension/private-pension-amount');
        } else {
          res.render('lis/4/you/benefits/benefit-sprint3');
        }
      }
    });
    
    //4) state-pension-handler
    app.get('/lis/4/you/pension/state-pension-handler', function(req, res) {
      if (applicant.privatePension == true) {
        res.redirect('/lis/4/you/pension/private-pension-amount');
      } else if (applicant.privatePension == false) {
        res.redirect('/lis/4/you/benefits/benefit-sprint3');
      }
    });

    //4) kickout-handler
    app.get('/lis/4/kickout-handler', function(req, res) {
      console.log(req.query);
      if (req.query.kickout == 'continue') {
        res.redirect('/lis/4/care-home');
      } else {
        res.redirect('/lis/4/kickout');
      }
    });
    
    //4) bank account handler
    app.get('/lis/4/assets/account-type-handler', function(req, res) {
      applicant.resetAccounts();
      var accounts = req.query.banktype;
      var firstSavingsAcc = applicant.savingChecker(accounts);
      if (firstSavingsAcc == 'bank') {
        res.render('lis/4/assets/accounts', {
          'partnerortext' : partnerOrText,
          'partnerandtext' : partnerAndText
        });
      } else if(firstSavingsAcc == 'pb') {
        res.render('lis/4/assets/premium-bonds', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : partnerAndText
        });
      }
    });
        
    //4)
    app.get('/lis/4/assets/bank-savings-handler', function(req, res) {
      if (applicant.premiumBonds == true) {
        res.render('lis/4/assets/premium-bonds');
      } else {
        res.render('lis/4/assets/other');
      }
    });
        
    //4)
    app.get('/lis/4/assets/premium-bond-handler', function(req, res) {
        res.render('lis/4/assets/other');
    });
                
    //education
    app.get('/lis/1/you/education-handler', function(req, res) {
      console.log(req.query);
      if (req.query.education === 'yes') {
        res.redirect('/lis/1/you/pension/pension');
      } else {
        res.redirect('/lis/1/you/pension/pension');
      }
    });
    
    //work
    app.get('/lis/1/you/work-handler', function(req, res) {
      console.log(req.query);
      if (req.query.work === 'yes') {
        myWork = 'Yes';
        res.redirect('/lis/1/you/education');
      } else {
        myWork = 'No';
        res.redirect('/lis/1/you/education');
      }
    });
    
    //2) education
    app.get('/lis/4/you/education-handler', function(req, res) {
      console.log(req.query);
      if (req.query.education === 'yes') {
        res.redirect('/lis/4/you/pension/pension');
      } else {
        res.redirect('/lis/4/you/pension/pension');
      }
    });
    
    //2) work
    app.get('/lis/4/you/work-handler', function(req, res) {
      console.log(req.query);
      if (req.query.work === 'yes') {
        res.redirect('/lis/4/you/education');
      } else {
        res.redirect('/lis/4/you/education');
      }
    });
 
    // *******************
    // 4) partner handlers
    // *******************

  
    //4) partner-pension-credit kickout
    app.get('/lis/4/partner/pension/pencred-handler', function(req, res) {
      console.log(req.query);
      if (req.query.prencred == 'ib') {
        res.redirect('/lis/4/kickout');
      } else {
        res.redirect('/lis/4/partner/pension/pension-type');
      }
    });
    
    //4) partner pension-handler
    app.get('/lis/4/partner/pension/pension-handler', function(req, res) {
      console.log(req.query);
      if (req.query.pension === 'yes') {
        res.redirect('/lis/4/partner/pension/pension-credit');
      } else {
        res.redirect('/lis/4/partner/benefits/benefit-sprint3');
      }
    });

    //4) partner pension-type-handler
    app.get('/lis/4/partner/pension/pension-type-handler', function(req, res) {
      var pensions = req.query.pensiontype;
      console.log(pensions);
      if (pensions == 'state') {
        partner.statePension = true;
        res.render('lis/4/partner/pension/pension-amount');
      } else if(pensions == 'private') {
        partner.privatePension = true;
        res.render('lis/4/partner/pension/private-pension-amount');
      } else {
        for (pension in pensions) {
          console.log(pensions[pension]); 
            if(pensions[pension] == 'state') {
              partner.statePension = true;
            } else if(pensions[pension] == 'private') {
              partner.privatePension = true;
            }
        };
        if(partner.statePension == true) {
          res.render('lis/4/partner/pension/pension-amount');
        } else if(partner.privatePension == true) {
          res.render('lis/4/partner/pension/private-pension-amount');
        } else {
          res.render('lis/4/partner/benefits/benefit-sprint3');
        }
      }
    });

    //4) partner-state-pension
    app.get('/lis/4/partner/pension/state-pension-handler', function(req, res) {
      if (partner.privatePension == true) {
        res.redirect('/lis/4/partner/pension/private-pension-amount');
      } else if (partner.privatePension == false) {
        res.redirect('/lis/4/partner/benefits/benefit-sprint3');
      }
    });
    
    //4) partner benefit handler
    app.get('/lis/4/partner/benefits/sprint3-benefit-handler', function (req, res) {
      partner.resetBenefits();
      var partnerBenefits = req.query.sprint3benefits;
      console.log(typeof partnerBenefits);
      var firstPartnerBenefit = partner.benefitChecker(partnerBenefits);
      if(firstPartnerBenefit === "aaaa") {
        res.render('lis/4/partner/benefits/aa');
      } else if(firstPartnerBenefit === "ctc") {
        res.render('lis/4/partner/benefits/ctc');
      } else if (firstPartnerBenefit === "dla") {
        res.render('lis/4/partner/benefits/dla');
      } else if(firstPartnerBenefit === "pip") {
        res.render('lis/4/partner/benefits/pip');
      } else if (firstPartnerBenefit === "none") {
        res.render('lis/4/partner/benefits/benefit7');
      }
    });

    //4 attendance allowance 
    app.get('/lis/4/partner/benefits/attendance-allowance-handler', function(req, res) {
      if(partner.childTaxCredits === true){
        res.render('lis/4/partner/benefits/ctc');
      } else if(partner.disabilityLivingAllowance === true){
        res.render('lis/4/partner/benefits/dla');
      } else if(partner.personalIndependence === true){
        res.render('lis/4/partner/benefits/pip');
      } else {
        res.render('lis/4/partner/benefits/benefit7');
      }
    });
    
    //4 partner child tax credit 
    app.get('/lis/4/partner/benefits/ctc-handler', function(req, res) {
      if(partner.disabilityLivingAllowance === true){
        res.render('lis/4/partner/benefits/dla');
      } else if(partner.personalIndependence === true){
        res.render('lis/4/partner/benefits/pip');
      } else {
        res.render('lis/4/partner/benefits/benefit7');
      }
    });

    //4 partner disability living allowance
    app.get('/lis/4/partner/benefits/dla-handler', function(req, res) {
      if(partner.personalIndependence === true){
        res.render('lis/4/partner/benefits/pip');
      } else {
        res.render('lis/4/partner/benefits/benefit7');
      }
    });
 
    // ***************
    // 4) householder
    // ***************
    
    //2001 = 15 - could have left school
    //1998 = 18
        
    //4) people-handler
    app.get('/lis/4/live/others/people', function(req, res) {
      res.render('lis/4/live/others/people');
    });
    
    //4) persons details
    app.get('/lis/4/live/others/name', function(req, res) {
      householder.resetHouseHolder();
      res.render('lis/4/live/others/name');
    });
    
    //4) people-handler
    app.get('/lis/4/live/others/people-handler', function(req, res) {
      if (req.query.people == 'yes') {
        res.redirect('/lis/4/live/others/name');
      } else {
        res.redirect('/lis/4/live/living-summary');
      }
    });
    
    //4 others details
    app.get('/lis/4/live/others/others-details', function(req, res) {
      householder.age = (2016 - req.query.dob);
      console.log(householder.age);
      householder.ageRange();
      if (householder.overNineteen === true) {
        res.render('lis/4/live/others/boarder');
      } else {
        res.render('lis/4/live/others/relationship');
      }
    });
    
    //4) relationship-handler
    app.get('/lis/4/live/others/relationship-handler', function(req, res) {
      householder.relationship = req.query.relationship;
      console.log(householder.relationship);
      //child || none underFifteen = people
      //child sixteenToNineteen = education
      //none sixteenToNineteen = boarder
      //child || none overNineteen = boarder
      if (householder.underFifteen == true) {
        res.render('lis/4/live/others/people');
      } else if (householder.relationship === 'child' && householder.sixteenToNineteen === true) {
        res.render('lis/4/live/others/education');
      } else if (householder.relationship === 'none' && householder.sixteenToNineteen === true) {
        res.render('lis/4/live/others/boarder');
      } else if (householder.overNineteen === true) {
        res.render('lis/4/live/others/boarder');
      }
    });
    
    //4) relationship-handler
    app.get('/lis/4/live/others/others-work-handler', function(req, res) {
      console.log(req.query);
      if (req.query.work === 'yes') {
        res.render('lis/4/live/others/hours');
      } else {
        res.render('lis/4/live/others/benefits');
      }
    });
    
    //4) others-education-handler
    app.get('/lis/4/live/others/others-education-handler', function(req, res) {
      if (req.query.education == 'yes') {
        res.redirect('/lis/4/live/others/people');
      } else {
        res.redirect('/lis/4/live/others/training');
      }
    });
    
    //4) others-training-handler
    app.get('/lis/4/live/others/others-training-handler', function(req, res) {
      if (req.query.training == 'yes') {
        res.redirect('/lis/4/live/others/people');
      } else {
        res.redirect('/lis/4/live/others/he-student');
      }
    });
    
    //4) lodger-handler
    app.get('/lis/4/live/others/boarder-handler', function(req, res) {
      if (req.query.boarder == 'yes') {
        res.redirect('/lis/4/live/others/boarder-detail');
      } else {
        res.redirect('/lis/4/live/others/he-student');
      }
    });

    // ***********
    //LIS sprint 3
    // ***********
    
    app.get('/lis/3/care-home-handler', function (req, res) {
      console.log(req.query)
      if(req.query.carehome === 'yes') {
        res.redirect('/lis/3/carehome-kickout');
      } else {
        res.redirect('/lis/3/savings');
      }
    });
    
    app.get('/lis/3/assets/property', function (req, res) {
        console.log(partnerOrText);
        res.render('lis/3/assets/property', {
        'partnerortext' : partnerOrText,
        'partnerandext' : partnerAndText
        });
    });
        
    app.get('/lis/3/assets/other', function (req, res) {
        console.log(partnerOrText);
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
      console.log(req.query)
      if(req.query.savings === 'yes') {
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
      if(req.query.partner == 'yes') {
        applicant.partner = true;
        setPartnerText();
        res.render('lis/3/partner/basic');
      } else if(req.query.partner == 'no') {
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
        'applicantFullName' : applicant.fullName(),
      });
    });
    
    //3) registration-handler
    app.get('/lis/3/you/registration-handler', function(req, res) {
      applicant.firstName = req.query.firstname;
      applicant.lastName = req.query.lastname;
      res.render('lis/3/you/contact', {
        'applicantFirstName' : applicant.firstName
      });
    });

    //3) benefit handler
    app.get('/lis/3/you/benefits/sprint3-benefit-handler', function (req, res) {
      applicant.resetBenefits();
      var benefits = req.query.sprint3benefits;
      console.log(typeof benefits);
      var firstBenefit = applicant.benefitChecker(benefits);
      if(firstBenefit === "aa") {
        res.render('lis/3/you/benefits/aa');
      } else if(firstBenefit === "ctc") {
        res.render('lis/3/you/benefits/ctc');
      } else if (firstBenefit === "dla") {
        res.render('lis/3/you/benefits/dla');
      } else if(firstBenefit === "pip") {
        res.render('lis/3/you/benefits/pip');
      } else if (firstBenefit === "none") {
        res.render('lis/3/you/benefits/benefit7');
      }
    });
    
    //3 Armed forces independence payment = single amount 
    
    //3 attendance allowance 
    app.get('/lis/3/you/benefits/attendance-allowance-handler', function(req, res) {
      if(applicant.childTaxCredits === true){
        res.render('lis/3/you/benefits/ctc');
      } else if(applicant.disabilityLivingAllowance === true){
        res.render('lis/3/you/benefits/dla');
      } else if(applicant.personalIndependence === true){
        res.render('lis/3/you/benefits/pip');
      } else {
        res.render('lis/3/you/benefits/benefit7');
      }
    });
    
    //3 Carers allowance = single amount 
    
    //3 child tax credit 
    app.get('/lis/3/you/benefits/ctc-handler', function(req, res) {
      if(applicant.disabilityLivingAllowance === true){
        res.render('lis/3/you/benefits/dla');
      } else if(applicant.personalIndependence === true){
        res.render('lis/3/you/benefits/pip');
      } else {
        res.render('lis/3/you/benefits/benefit7');
      }
    });

    //3 disability living allowance
    app.get('/lis/3/you/benefits/dla-handler', function(req, res) {
      if(applicant.personalIndependence === true){
        res.render('lis/3/you/benefits/pip');
      } else {
        res.render('lis/3/you/benefits/benefit7');
      }
    });
    
    //3 Industrial injuries disablement benefit
    
    //3 Maintenance payments
        
    //3 relationship
    app.get('/lis/3/live/others/relationship', function(req, res) {
        res.render('lis/3/live/others/relationship');
    });
    
    //3) relationship-handler
    app.get('/lis/3/live/others/relationship-handler', function(req, res) {
      console.log(req.query);
      if (req.query.relationship == 'none' && applicant.tennant === true) {
        res.render('lis/3/live/others/subtenant');
      } else if (req.query.relationship == 'none' && applicant.homeOwner === true) {
        res.render('lis/3/live/others/boarder');
      } else {
        res.render('lis/3/live/others/work');
      }
    });
    
    //3) people-handler
    app.get('/lis/3/live/others/people-handler', function(req, res) {
      if (req.query.people == 'yes') {
        res.redirect('/lis/3/live/others/name');
      } else {
        res.redirect('/lis/3/live/living-summary');
      }
    });

    //3) home
    app.get('/lis/3/live/home', function(req, res) {
        applicant.resetLivingSituation;
        res.render('lis/3/live/home');
    });

    //3) where you live
    app.get('/lis/3/live/home-handler', function(req, res) {
      console.log(req.query);
      if (req.query.home == 'own') {
        applicant.homeOwner = true;
        res.redirect('/lis/3/live/mortgaged/joint');
      } else if (req.query.home == 'rented') {
        applicant.tennant = true;
        res.redirect('/lis/3/live/joint');
      } else {
        res.redirect('/lis/3/live/joint');
      }
    });

    //3) pension credit kick out
    app.get('/lis/3/you/pension/pencred-handler', function(req, res) {
      console.log(req.query);
      if (req.query.prencred == 'ib') {
        res.redirect('/lis/3/kickout');
      } else {
        res.redirect('/lis/3/you/pension/pension-type');
      }
    });

    //3) pension-handler
    app.get('/lis/3/you/pension/pension-handler', function(req, res) {
      console.log(req.query);
      if (req.query.pension === 'yes') {
        res.redirect('/lis/3/you/pension/pension-credit');
      } else {
        res.redirect('/lis/3/you/benefits/benefit-sprint3');
      }
    });

    //3) pension-type-handler
    app.get('/lis/3/you/pension/pension-type-handler', function(req, res) {
      var pensions = req.query.pensiontype;
      console.log(pensions);
      if (pensions == 'state') {
        applicant.statePension = true;
        res.render('lis/3/you/pension/pension-amount');
      } else if(pensions == 'private') {
        applicant.privatePension = true;
        res.render('lis/3/you/pension/private-pension-amount');
      } else {
        for (pension in pensions) {
          console.log(pensions[pension]); 
            if(pensions[pension] == 'state') {
              applicant.statePension = true;
            } else if(pensions[pension] == 'private') {
              applicant.privatePension = true;
            }
        };
        if(applicant.statePension == true) {
          res.render('lis/3/you/pension/pension-amount');
        } else if(applicant.privatePension == true) {
          res.render('lis/3/you/pension/private-pension-amount');
        } else {
          res.render('lis/3/you/benefits/benefit-sprint3');
        }
      }
    });
    
    //3) state-pension-handler
    app.get('/lis/3/you/pension/state-pension-handler', function(req, res) {
      if (applicant.privatePension == true) {
        res.redirect('/lis/3/you/pension/private-pension-amount');
      } else if (applicant.privatePension == false) {
        res.redirect('/lis/3/you/benefits/benefit-sprint3');
      }
    });

    //3) kickout-handler
    app.get('/lis/3/kickout-handler', function(req, res) {
      console.log(req.query);
      if (req.query.kickout == 'continue') {
        res.redirect('/lis/3/care-home');
      } else {
        res.redirect('/lis/3/kickout');
      }
    });
    
    //3) bank account handler
    app.get('/lis/3/assets/account-type-handler', function(req, res) {
      applicant.resetAccounts();
      var accounts = req.query.banktype;
      var firstSavingsAcc = applicant.savingChecker(accounts);
      if (firstSavingsAcc == 'bank') {
        res.render('lis/3/assets/accounts', {
          'partnerortext' : partnerOrText,
          'partnerandtext' : partnerAndText
        });
      } else if(firstSavingsAcc == 'pb') {
        res.render('lis/3/assets/premium-bonds', {
          'partnerortext' : partnerOrText,
          'partnerandrext' : partnerAndText
        });
      }
    });
        
    //3)
    app.get('/lis/3/assets/bank-savings-handler', function(req, res) {
      if (applicant.premiumBonds == true) {
        res.render('lis/3/assets/premium-bonds');
      } else {
        res.render('lis/3/assets/other');
      }
    });
        
    //3)
    app.get('/lis/3/assets/premium-bond-handler', function(req, res) {
        res.render('lis/3/assets/other');
    });
                
    //education
    app.get('/lis/1/you/education-handler', function(req, res) {
      console.log(req.query);
      if (req.query.education === 'yes') {
        res.redirect('/lis/1/you/pension/pension');
      } else {
        res.redirect('/lis/1/you/pension/pension');
      }
    });
    
    //work
    app.get('/lis/1/you/work-handler', function(req, res) {
      console.log(req.query);
      if (req.query.work === 'yes') {
        myWork = 'Yes';
        res.redirect('/lis/1/you/education');
      } else {
        myWork = 'No';
        res.redirect('/lis/1/you/education');
      }
    });
    
    //2) education
    app.get('/lis/3/you/education-handler', function(req, res) {
      console.log(req.query);
      if (req.query.education === 'yes') {
        res.redirect('/lis/3/you/pension/pension');
      } else {
        res.redirect('/lis/3/you/pension/pension');
      }
    });
    
    //2) work
    app.get('/lis/3/you/work-handler', function(req, res) {
      console.log(req.query);
      if (req.query.work === 'yes') {
        res.redirect('/lis/3/you/education');
      } else {
        res.redirect('/lis/3/you/education');
      }
    });
 

    // *******************
    // 3) partner handlers
    // *******************

    
    //3) partner-pension-credit kickout
    app.get('/lis/3/partner/pension/pencred-handler', function(req, res) {
      console.log(req.query);
      if (req.query.prencred == 'ib') {
        res.redirect('/lis/3/kickout');
      } else {
        res.redirect('/lis/3/partner/pension/pension-type');
      }
    });
    
    //3) partner pension-handler
    app.get('/lis/3/partner/pension/pension-handler', function(req, res) {
      console.log(req.query);
      if (req.query.pension === 'yes') {
        res.redirect('/lis/3/partner/pension/pension-credit');
      } else {
        res.redirect('/lis/3/partner/benefits/benefit-sprint3');
      }
    });

    //3) partner pension-type-handler
    app.get('/lis/3/partner/pension/pension-type-handler', function(req, res) {
      var pensions = req.query.pensiontype;
      console.log(pensions);
      if (pensions == 'state') {
        partner.statePension = true;
        res.render('lis/3/partner/pension/pension-amount');
      } else if(pensions == 'private') {
        partner.privatePension = true;
        res.render('lis/3/partner/pension/private-pension-amount');
      } else {
        for (pension in pensions) {
          console.log(pensions[pension]); 
            if(pensions[pension] == 'state') {
              partner.statePension = true;
            } else if(pensions[pension] == 'private') {
              partner.privatePension = true;
            }
        };
        if(partner.statePension == true) {
          res.render('lis/3/partner/pension/pension-amount');
        } else if(partner.privatePension == true) {
          res.render('lis/3/partner/pension/private-pension-amount');
        } else {
          res.render('lis/3/partner/benefits/benefit-sprint3');
        }
      }
    });

    //3) partner-state-pension
    app.get('/lis/3/partner/pension/state-pension-handler', function(req, res) {
      if (partner.privatePension == true) {
        res.redirect('/lis/3/partner/pension/private-pension-amount');
      } else if (partner.privatePension == false) {
        res.redirect('/lis/3/partner/benefits/benefit-sprint3');
      }
    });

    
    //3) partner benefit handler
    app.get('/lis/3/partner/benefits/sprint3-benefit-handler', function (req, res) {
      partner.resetBenefits();
      var partnerBenefits = req.query.sprint3benefits;
      console.log(typeof partnerBenefits);
      var firstPartnerBenefit = partner.benefitChecker(partnerBenefits);
      if(firstPartnerBenefit === "aaaa") {
        res.render('lis/3/partner/benefits/aa');
      } else if(firstPartnerBenefit === "ctc") {
        res.render('lis/3/partner/benefits/ctc');
      } else if (firstPartnerBenefit === "dla") {
        res.render('lis/3/partner/benefits/dla');
      } else if(firstPartnerBenefit === "pip") {
        res.render('lis/3/partner/benefits/pip');
      } else if (firstPartnerBenefit === "none") {
        res.render('lis/3/partner/benefits/benefit7');
      }
    });

    //3 attendance allowance 
    app.get('/lis/3/partner/benefits/attendance-allowance-handler', function(req, res) {
      if(partner.childTaxCredits === true){
        res.render('lis/3/partner/benefits/ctc');
      } else if(partner.disabilityLivingAllowance === true){
        res.render('lis/3/partner/benefits/dla');
      } else if(partner.personalIndependence === true){
        res.render('lis/3/partner/benefits/pip');
      } else {
        res.render('lis/3/partner/benefits/benefit7');
      }
    });
    
    //3 partner child tax credit 
    app.get('/lis/3/partner/benefits/ctc-handler', function(req, res) {
      if(partner.disabilityLivingAllowance === true){
        res.render('lis/3/partner/benefits/dla');
      } else if(partner.personalIndependence === true){
        res.render('lis/3/partner/benefits/pip');
      } else {
        res.render('lis/3/partner/benefits/benefit7');
      }
    });

    //3 partner disability living allowance
    app.get('/lis/3/partner/benefits/dla-handler', function(req, res) {
      if(partner.personalIndependence === true){
        res.render('lis/3/partner/benefits/pip');
      } else {
        res.render('lis/3/partner/benefits/benefit7');
      }
    });

    
    //*************
    // LIS sprint 2
    //*************
    
    var stateP;
    var privateP;

    function resetVars() {
        stateP = false;
        privateP = false;
    }
    resetVars();
    
    //2) other people living in your home
    app.get('/lis/2/live/others/people-handler', function(req, res) {
      console.log(req.query);
      if (req.query.people === 'yes') {
        res.redirect('/lis/2/live/others/name');
      } else {
        res.redirect('/lis/2/live/living-summary');
      }
    });

    //2) where you live
    app.get('/lis/2/live/home-handler', function(req, res) {
      console.log(req.query);
      if (req.query.home === 'own') {
        res.redirect('/lis/2/live/mortgaged/joint');
      } else {
        res.redirect('/lis/2/live/joint');
      }
    });

    //2) pension-credit
    app.get('/lis/2/you/pension/pencred-handler', function(req, res) {
      console.log(req.query);
      if (req.query.prencred === 'ib') {
        res.redirect('/lis/2/kickout');
      } else {
        res.redirect('/lis/2/you/pension/pension-type');
      }
    });

    //2) pension
    app.get('/lis/2/you/pension/pension-handler', function(req, res) {
      console.log(req.query);
      if (req.query.pension === 'no') {
        res.redirect('/lis/2/you/benefits/benefit-group1');
      } else {
        res.redirect('/lis/2/you/pension/pension-credit');
      }
    });

    //2) pension-type
    app.get('/lis/2/you/pension/pension-type-handler', function(req, res) {
      var pensions = req.query.pensiontype;
      console.log(pensions);
      if (pensions == 'state') {
        stateP = true;
        res.render('lis/2/you/pension/pension-amount');
      } else if(pensions == 'private') {
        privateP = true;
        res.render('lis/2/you/pension/private-pension-amount');
      } else {
        for (pension in pensions) {
          console.log(pensions[pension]); 
            if(pensions[pension] == 'state') {
              stateP = true;
            } else if(pensions[pension] == 'private') {
              privateP = true;
            }
        };
        if(stateP == true) {
          res.render('lis/2/you/pension/pension-amount');
        } else if(privateP == true) {
          res.render('lis/2/you/pension/private-pension-amount');
        }
      }
    });
    
    //2) state-pension
    app.get('/lis/2/you/pension/state-pension-handler', function(req, res) {
      if (privateP == true) {
        res.render('lis/2/you/pension/private-pension-amount', {'privateP' : privateP });
      } else if (privateP == false) {
        res.render('lis/2/you/benefits/benefit-group1', {'privateP' : privateP });
      }
    });

    //2) kickout
    app.get('/lis/2/kickout-handler', function(req, res) {
      console.log(req.query);
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
    
    //2) partner
    app.get('/lis/2/partner/partner-handler', function(req, res) {
      console.log(req.query);
      if (req.query.partner === 'yes') {
        partnerCheck(true);
        res.render('lis/2/partner/summary');
      } else {
        partnerCheck(false);
        res.render('lis/2/partner/summary');
      }
    });
    
    //2) education
    app.get('/lis/2/you/education-handler', function(req, res) {
      console.log(req.query);
      if (req.query.education === 'yes') {
        res.redirect('/lis/2/you/pension/pension');
      } else {
        res.redirect('/lis/2/you/pension/pension');
      }
    });
    
    //2) work
    app.get('/lis/2/you/work-handler', function(req, res) {
      console.log(req.query);
      if (req.query.work === 'yes') {
        myWork = 'Yes';
        res.redirect('/lis/2/you/education');
      } else {
        myWork = 'No';
        res.redirect('/lis/2/you/education');
      }
    });
        
    //2) benefits
    app.get('/lis/2/you/benefits/benefit-handler', function(req, res) {
      console.log(req.query);
      if (req.query.benefit === 'no') {
        res.redirect('/lis/2/you/benefits/other-money');
      } else {
        res.redirect('/lis/2/you/benefits/benefit-group1');
      }
    });
    
    //2) bank accounts
    app.get('/lis/2/assets/account-type-handler', function(req, res) {
      console.log(req.query);
      if (req.query.banktype === 'bank') {
        res.redirect('/lis/2/assets/accounts');
      } else {
        res.redirect('/lis/2/assets/other');
      }
    });
    
    
    //*************
    //LIS sprint 1
    //*************

    //kickout
    app.get('/lis/1/kickout-handler', function(req, res) {
      console.log(req.query);
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
    app.get('/lis/1/partner/partner-handler', function(req, res) {
      console.log(req.query);
      if (req.query.partner === 'yes') {
        partnerCheck(true);
        res.render('lis/1/partner/summary');
      } else {
        partnerCheck(false);
        res.render('lis/1/partner/summary');
      }
    });
    
    //education
    app.get('/lis/1/you/education-handler', function(req, res) {
      console.log(req.query);
      if (req.query.education === 'yes') {
        res.redirect('/lis/1/you/pension/pension');
      } else {
        res.redirect('/lis/1/you/pension/pension');
      }
    });
    
    //work
    app.get('/lis/1/you/work-handler', function(req, res) {
      console.log(req.query);
      if (req.query.work === 'yes') {
        myWork = 'Yes';
        res.redirect('/lis/1/you/education');
      } else {
        myWork = 'No';
        res.redirect('/lis/1/you/education');
      }
    });
        
    //pension
    app.get('/lis/1/you/pension/pension-handler', function(req, res) {
      console.log(req.query);
      if (req.query.pension === 'no') {
        res.redirect('/lis/1/you/benefits/benefit-group1');
      } else {
        res.redirect('/lis/1/you/pension/pension-credit');
      }
    });

    //benefits
    app.get('/lis/1/you/benefits/benefit-handler', function(req, res) {
      console.log(req.query);
      if (req.query.benefit === 'no') {
        res.redirect('/lis/1/you/benefits/other-money');
      } else {
        res.redirect('/lis/1/you/benefits/benefit-group1');
      }
    });
    
    
    //*************
    //LIS sprint 0
    //*************
    
    var myWork;

    app.get('/lis/0', function (req, res) {
      res.render('lis/0/');
    });

    //partner
    app.get('/lis/0/registration/partner-handler', function (req, res) {
      console.log(req.query);
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
    app.get('/lis/0/you/education-handler', function(req, res) {
      console.log(req.query);
      if (req.query.education === 'yes') {
        res.redirect('/lis/0/you/course');
      } else {
        res.redirect('/lis/0/you/work');
      }
    });
    
    //work
    app.get('/lis/0/you/work-handler', function(req, res) {
      console.log(req.query);
      if (req.query.work === 'yes') {
        myWork = 'Yes';
        res.redirect('/lis/0/you/work-type');
      } else {
        myWork = 'No';
        res.redirect('/lis/0/you/benefits/pension');
      }
    });
    
    //pension
    app.get('/lis/0/you/benefits/pension-handler', function(req, res) {
      console.log(req.query);
      if (req.query.pension === 'no') {
        res.redirect('/lis/0/you/benefits/benefits');
      } else {
        res.redirect('/lis/0/you/benefits/pension-type');
      }
    });
        
    //benefits
    app.get('/lis/0/you/benefits/benefit-handler', function(req, res) {
      console.log(req.query);
      if (req.query.benefit === 'no') {
        res.redirect('/lis/0/you/benefits/other-money');
      } else {
        res.redirect('/lis/0/you/benefits/benefit-group1');
      }
    });

  }
};