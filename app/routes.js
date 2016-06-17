var applicant = {
  firstName: null,
  lastName: null,
  partner: false,
  privatePension: false,
  statePension: false,
  savings: false,
  premiumBonds: false,
  disabilityLivingAllowance: false,
  attendanceAllowance : false,
  ownHome: false,
  tennant: false,
  othersAtHome: false,
  fullName : function() {
    return this.firstName + " " + this.lastName;
  }
 }

var partner = {
  firstName: null,
  lastName: null,
  privatePension: false,
  statePension: false,
  savings: false,
  premiumBonds: false,
  disabilityLivingAllowance: false,
  attendanceAllowance : false,
  fullName : function() {
    return this.firstName + " " + this.lastName;
  }
 }

function printApplicant() {
console.log(
  "applicant.privatePension = " + applicant.privatePension + " " +
  "applicant.statePension = " + applicant.statePension + " " +
  "applicant.disabilityLivingAllowance = " + applicant.disabilityLivingAllowance + " " +
  "applicant.attendanceAllowance = " + applicant.attendanceAllowance + " "
  );
}

var partnerText;
var applicantPartner;
var stateP;
var privateP;
var livingSituation;
//benefits

function resetVars() {
    partnerText = "you";
    stateP = false;
    privateP = false;
    livingSituation = null; //tennant || owner ||
    //benefits
    console.log('reset');
}
 
var partnerCheck = function () {
  if (applicant.partner === true) {
    partnerText = "you or your partner";
  }
}

resetVars();

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
      printApplicant();
    });
    
    // add your routes here
    
    // ***********
    //LIS sprint 3
    // ***********
    
    //3) about you summary
    app.get('/lis/3/partner/summary', function (req, res) {
      res.render('lis/3/partner/summary', {
        'applicantPartner' : applicantPartner
      });
    });
    
    //3) partner handler
    app.get('/lis/3/partner/partner-handler', function (req, res) {
      if(req.query.partner == 'yes') {
        applicant.partner = true;
        applicantPartner = 'Yes';
        res.render('lis/3/partner/basic', {
        'applicantPartner' : applicantPartner
      });
      } else if(req.query.partner == 'no') {
        applicant.partner = false;
        applicantPartner = 'No';
        res.render('lis/3/partner/summary-no', {
        'applicantPartner' : applicantPartner
      });
      }
    });
    
    //3) partner summary
    app.get('/lis/3/partner/summary', function (req, res) {
      res.render('lis/3/partner/summary', {
        'applicantPartner' : applicantPartner
      });
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
      var benefits = req.query.sprint3benefits;
      console.log(typeof benefits);
      if(typeof benefits == "string") {
        if(benefits === "aa") {
          applicant.attendanceAllowance = true;
          res.render('lis/3/you/benefits/aa');
        } else if (benefits === "dla") {
          applicant.disabilityLivingAllowance = true;
          res.render('lis/3/you/benefits/dla');
        } else {
          res.render('lis/3/you/benefits/benefit7');
        }
      } else if(typeof benefits == "object") {
        console.log('its an object');
        for (benefit in benefits) {
          if(benefits[benefit] === 'aa') {
            console.log('its AA');
            applicant.attendanceAllowance = true;
          } else if(benefits[benefit] === 'dla') {
            console.log('its DLA');
            applicant.disabilityLivingAllowance = true;
          }
        }
        if(applicant.attendanceAllowance === true){
          res.render('lis/3/you/benefits/aa');
        } else if(applicant.disabilityLivingAllowance === true) {
          res.render('lis/3/you/benefits/dla');
        } else {
          res.render('lis/3/you/benefits/benefit7');
        }
      }
    });
    
    //3 attendance allowance 
    app.get('/lis/3/you/benefits/attendance-allowance-handler', function(req, res) {
      if(applicant.disabilityLivingAllowance === true){
        res.render('lis/3/you/benefits/dla');
      } else {
        res.render('lis/3/you/benefits/benefit7');
      }
    });
    
    //3 relationship
    app.get('/lis/3/live/others/relationship', function(req, res) {
        res.render('lis/3/live/others/relationship', {
        'livingSituation' : livingSituation
      });
    });
    
    //3) relationship-handler
    app.get('/lis/3/live/others/relationship-handler', function(req, res) {
      console.log(req.query);
      if (req.query.relationship == 'none' && livingSituation == 'tennant' ) {
        res.render('lis/3/live/others/subtenant', {
        'livingSituation' : livingSituation
      });
      } else if (req.query.relationship == 'none' && livingSituation == 'owner') {
        res.render('lis/3/live/others/border');
      } else {
        res.render('lis/3/live/others/work');
      }
    });
    
    //3) people-handler
    app.get('/lis/3/live/others/people-handler', function(req, res) {
      console.log(req.query);
      if (req.query.people == 'yes') {
        res.redirect('/lis/3/live/others/name');
      } else {
        res.redirect('/lis/3/live/living-summary');
      }
    });

    //3) where you live
    app.get('/lis/3/live/home-handler', function(req, res) {
      console.log(req.query);
      if (req.query.home == 'own') {
        livingSituation = 'owner';
        console.log('living situation = ' + livingSituation);
        res.redirect('/lis/3/live/mortgaged/joint');
      } else if (req.query.home == 'rented') {
        res.redirect('/lis/3/live/joint');
        livingSituation = 'tennant';
        console.log('living situation = ' + livingSituation);
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
      printApplicant();
      console.log(req.query);
      if (req.query.pension === 'yes') {
        res.render('lis/3/you/pension/pension-credit');
      } else {
        res.render('lis/3/you/benefits/benefit-sprint3');
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
    
    //3 property
    app.get('/lis/3/assets/property', function (req, res) {
      res.render('lis/3/assets/property', {
        'partnerText' : partnerText
      });
    });

    app.get('/lis/3/you/education-handler', function(req, res) {
      console.log(req.query);
      if (req.query.education == 'yes') {
        res.redirect('/lis/3/you/pension/pension');
      } else {
        res.redirect('/lis/3/you/pension/pension');
      }
    });
    
    //3) work-handler
    app.get('/lis/3/you/work-handler', function(req, res) {
      console.log(req.query);
      if (req.query.work == 'yes') {
        myWork = 'Yes';
        res.redirect('/lis/3/you/education');
      } else {
        myWork = 'No';
        res.redirect('/lis/3/you/education');
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

    //3) partner-pension-handler
    app.get('/lis/3/partner/pension/ppension-handler', function(req, res) {
      console.log(req.query);
      if (req.query.pension === 'yes') {
        res.redirect('/lis/3/partner/pension/pension-credit');
      } else {
        res.redirect('/lis/3/partner/benefits/benefit-sprint3');
      }
    });
    
    //3) partner-pension-type
    app.get('/lis/3/partner/pension/ppension-type-handler', function(req, res) {
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
        if(partner.statePension === true) {
          res.render('lis/3/partner/pension/pension-amount');
        } else if(partner.privatePension === true) {
          res.render('lis/3/partner/pension/private-pension-amount');
        } else {
          res.render('lis/3/partner/benefits/benefit-sprint3');
        }
      }
    });

    //3) partner-pension-credit
    app.get('/lis/3/partner/pension/ppencred-handler', function(req, res) {
      console.log(req.query);
      if (req.query.prencred == 'ib') {
        res.redirect('/lis/3/kickout');
      } else {
        res.redirect('/lis/3/partner/pension/pension-type');
      }
    });

    //3) partner-state-pension
    app.get('/lis/3/partner/pension/pstate-pension-handler', function(req, res) {
      if (partner.privatePension == true) {
        res.redirect('/lis/3/partner/pension/private-pension-amount');
      } else if (partner.privatePension == false) {
        res.redirect('/lis/3/partner/benefits/benefit-sprint3');
      }
    });
       
    //3) partner benefit handler
    app.get('/lis/3/partner/benefits/sprint3-partner-benefit-handler', function (req, res) {
      var partnerBenefits = req.query.sprint3benefits;
      if(typeof partnerBenefits == "string") {
        if(partnerBenefits === "aa") {
          partner.attendanceAllowance = true;
          res.render('lis/3/partner/benefits/aa');
        } else if (partnerBenefits === "dla") {
          partner.disabilityLivingAllowance = true;
          res.render('lis/3/partner/benefits/dla');
        } else {
          res.render('lis/3/partner/benefits/benefit7');
        }
      } else if(typeof partnerBenefits == "object") {
        for (benefit in partnerBenefits) {
          if(partnerBenefits[benefit] == 'aa') {
            partner.attendanceAllowance = true;
          } else if(partnerBenefits[benefit] == 'dla') {
            partner.disabilityLivingAllowance = true;
          }
        }
        if(partner.attendanceAllowance === true){
          res.render('lis/3/partner/benefits/aa');
        } else if(partner.disabilityLivingAllowance === true) {
          res.render('lis/3/partner/benefits/dla');
        } else {
          res.render('lis/3/partner/benefits/benefit7');
        }
      }
    });
    
    //3 attendance allowance 
    app.get('/lis/3/partner/benefits/attendance-allowance-handler', function(req, res) {
      if(partner.disabilityLivingAllowance === true){
        res.render('lis/3/partner/benefits/dla');
      } else {
        res.render('lis/3/partner/benefits/benefit4');
      }
    });


    
    //*************
    // LIS sprint 2
    //*************
    
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
    
    //2) property
    app.get('/lis/2/assets/property', function (req, res) {
      res.render('lis/2/assets/property', {
        'partnerText' : partnerText
      });
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
    
    //property
    app.get('/lis/1/assets/property', function (req, res) {
      res.render('lis/1/assets/property', {
        'partnerText' : partnerText
      });
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