var sprint = 3;

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
  homeOwner,
  tennant,
  othersAtHome,
  fullName) { 
    this.firstName = firstName;
    this.lastName = lastName;
    this.partner = partner;
    this.privatePension = privatePension;
    this.statePension = statePension;
    this.savings = savings;
    this.premiumBonds = premiumBonds;
    this.disabilityLivingAllowance = disabilityLivingAllowance;
    this.attendanceAllowance = attendanceAllowance;
    this.homeOwner = homeOwner;
    this.tennant = tennant;
    this.othersAtHome = othersAtHome;
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
  this.printPerson = function() {
    console.log (
      this.firstName + "\n" +
      "privatePension = " + this.privatePension + " \n" +
      "statePension = " + this.statePension + " \n" +
      "disabilityLivingAllowance = " + this.disabilityLivingAllowance + " \n" +
      "attendanceAllowance = " + this.attendanceAllowance + "\n"
    );
  }
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
  othersAtHome = false
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
      applicant.printPerson();
      applicant.resetBenefits;
    });
    
    // add your routes here
    
    // ***********
    //LIS sprint 3
    // ***********
    
    //3) about you summary
    app.get('/lis/3/partner/summary', function (req, res) {
      res.render('lis/3/partner/summary');
    });
    
    //3) partner handler
    app.get('/lis/3/partner/partner-handler', function (req, res) {
      if(req.query.partner == 'yes') {
        applicant.partner = true;
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
    
    //3)
    app.get('/lis/3/benefits/benefits-sprint3', function (req, res) {
      applicant.resetBenefits();
      res.render('lis/3/benefits/benefits-sprint3');
    });

    //3) benefit handler
    app.get('/lis/3/you/benefits/sprint3-benefit-handler', function (req, res) {
      applicant.resetBenefits();
      var benefits = req.query.sprint3benefits;
      console.log(typeof benefits);
      if(typeof benefits == "string") {
        if(benefits === "aa") {
          applicant.attendanceAllowance = true;
          res.render('lis/3/you/benefits/aa');
        } else if(benefits === "ctc") {
          applicant.childTaxCredits = true;
          res.render('lis/3/you/benefits/ctc');
        } else if (benefits === "dla") {
          applicant.disabilityLivingAllowance = true;
          res.render('lis/3/you/benefits/dla');
        } else if(benefits === "pip") {
          applicant.personalIndependence = true;
          res.render('lis/3/you/benefits/pip');
        } else {
          res.render('lis/3/you/benefits/benefit7');
        }
      } else if(typeof benefits == "object") {
        console.log('its an object');
        for (benefit in benefits) {
          if(benefits[benefit] === 'aa') {
            applicant.attendanceAllowance = true;
          } else if(benefits[benefit] === 'dla') {
            applicant.disabilityLivingAllowance = true;
          } else if(benefits[benefit] === 'pip') {
            applicant.personalIndependence = true;
          } else if(benefits[benefit] === 'ctc') {
            applicant.childTaxCredits = true;
          }
        }
        if(applicant.attendanceAllowance === true){
          res.render('lis/3/you/benefits/aa');
        } else if(applicant.childTaxCredits === true) {
          res.render('lis/3/you/benefits/ctc');
        } else if(applicant.disabilityLivingAllowance === true) {
          res.render('lis/3/you/benefits/dla');
        } else if(applicant.personalIndependence === true) {
          res.render('lis/3/you/benefits/pip');
        } else {
          res.render('lis/3/you/benefits/benefit7');
        }
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
        res.render('lis/3/live/others/border');
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
        res.redirect('/lis/3/lis-home');
      } else {
        res.redirect('/lis/3/kickout');
      }
    });
    
    //3) bank account handler
    app.get('/lis/3/assets/account-type-handler', function(req, res) {
      console.log(req.query);
      if (req.query.banktype == 'bank') {
        res.redirect('/lis/3/assets/accounts');
      } else {
        res.redirect('/lis/3/assets/other');
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
      var benefits = req.query.sprint3benefits;
      if(typeof benefits == "string") {
        if(benefits === "aa") {
          partner.attendanceAllowance = true;
          res.render('lis/3/partner/benefits/aa');
        } else if(benefits === "ctc") {
          partner.childTaxCredits = true;
          res.render('lis/3/partner/benefits/ctc');
        } else if (benefits === "dla") {
          partner.disabilityLivingAllowance = true;
          res.render('lis/3/partner/benefits/dla');
        } else if(benefits === "pip") {
          partner.personalIndependence = true;
          res.render('lis/3/partner/benefits/pip');
        } else {
          res.render('lis/3/partner/benefits/benefit7');
        }
      } else if(typeof benefits == "object") {
        for (benefit in benefits) {
          if(benefits[benefit] === 'aa') {
            partner.attendanceAllowance = true;
          } else if(benefits[benefit] === 'dla') {
            partner.disabilityLivingAllowance = true;
          } else if(benefits[benefit] === 'pip') {
            partner.personalIndependence = true;
          } else if(benefits[benefit] === 'ctc') {
            partner.childTaxCredits = true;
          }
        }
        if(partner.attendanceAllowance === true){
          res.render('lis/3/partner/benefits/aa');
        } else if(partner.childTaxCredits === true) {
          res.render('lis/3/partner/benefits/ctc');
        } else if(partner.disabilityLivingAllowance === true) {
          res.render('lis/3/partner/benefits/dla');
        } else if(partner.personalIndependence === true) {
          res.render('lis/3/partner/benefits/pip');
        } else {
          res.render('lis/3/partner/benefits/benefit7');
        }
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
    
    //3 child tax credit 
    app.get('/lis/3/partner/benefits/ctc-handler', function(req, res) {
      if(partner.disabilityLivingAllowance === true){
        res.render('lis/3/partner/benefits/dla');
      } else if(partner.personalIndependence === true){
        res.render('lis/3/partner/benefits/pip');
      } else {
        res.render('lis/3/partner/benefits/benefit7');
      }
    });

    //3 disability living allowance
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