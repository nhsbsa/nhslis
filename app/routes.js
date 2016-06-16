  var partner;
  var partnerText;
  var stateP;
  var privateP;
  var livingSituation;
  //benefits
  var dlaBen;

function resetVars() {
    partner = false;
    partnerText = "you";
    stateP = false;
    privateP = false;
    livingSituation = null; //tennant || owner ||
    //benefits
    dlaBen = false;
    console.log('reset');
}
 
resetVars();

var partnerCheck = function (partnerStatus) {
  if (partnerStatus == true) {
    var partnerText = "you or your partner";
  }
}

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
    });
    
    // add your routes here
    
    //LIS sprint 3
    
    //benefit handler
    app.get('/lis/3/you/benefits/benefit-group2-handler', function(req, res) {
      var benefitsg2 = req.query.bgroup2;
      console.log(benefitsg2);
      if (benefitsg2 == 'dla') {
        dlaBen = true;
      }
      console.log(dlaBen);
      res.render('lis/3/you/benefits/benefit-group3');
    });
    
    app.get('/lis/3/you/benefits/benefit-group3-handler', function(req, res) {
      var benefitsg3 = req.query.bgroup3;
      console.log(benefitsg3);
      if (dlaBen === true) {
        res.render('lis/3/you/benefits/dla');
      } else {
        res.render('lis/3/you/benefits/benefit7');
      }
    });
    
    //others > relationship
    app.get('/lis/3/live/others/relationship', function(req, res) {
        res.render('lis/3/live/others/relationship', {
        'livingSituation' : livingSituation
      });
    });
    
    //others > relationship-handler
    app.get('/lis/3/live/others/relationship-handler', function(req, res) {
      console.log(req.query);
      if (req.query.relationship === 'none' && livingSituation === 'tennant' ) {
        res.render('lis/3/live/others/subtenant', {
        'livingSituation' : livingSituation
      });
      } else if (req.query.relationship === 'none' && livingSituation === 'owner') {
        res.render('lis/3/live/others/border');
      } else {
        res.render('lis/3/live/others/work');
      }
    });
    
    //other people living in your home
    app.get('/lis/3/live/others/people-handler', function(req, res) {
      console.log(req.query);
      if (req.query.people === 'yes') {
        res.redirect('/lis/3/live/others/name');
      } else {
        res.redirect('/lis/3/live/living-summary');
      }
    });

    //where you live
    app.get('/lis/3/live/home-handler', function(req, res) {
      console.log(req.query);
      if (req.query.home === 'own') {
        livingSituation = 'owner';
        console.log('living situation = ' + livingSituation);
        res.redirect('/lis/3/live/mortgaged/joint');
      } else if (req.query.home === 'rented') {
        res.redirect('/lis/3/live/joint');
        livingSituation = 'tennant';
        console.log('living situation = ' + livingSituation);
      } else {
        res.redirect('/lis/3/live/joint');
      }
    });

    //pension-credit
    app.get('/lis/3/you/pension/pencred-handler', function(req, res) {
      console.log(req.query);
      if (req.query.prencred === 'ib') {
        res.redirect('/lis/3/kickout');
      } else {
        res.redirect('/lis/3/you/pension/pension-type');
      }
    });

    //pension
    app.get('/lis/3/you/pension/pension-handler', function(req, res) {
      console.log(req.query);
      if (req.query.pension === 'no') {
        res.redirect('/lis/3/you/benefits/benefit-group1');
      } else {
        res.redirect('/lis/3/you/pension/pension-credit');
      }
    });

    //pension-type
    app.get('/lis/3/you/pension/pension-type-handler', function(req, res) {
      var pensions = req.query.pensiontype;
      console.log(pensions);
      if (pensions == 'state') {
        stateP = true;
        res.render('lis/3/you/pension/pension-amount');
      } else if(pensions == 'private') {
        privateP = true;
        res.render('lis/3/you/pension/private-pension-amount');
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
          res.render('lis/3/you/pension/pension-amount');
        } else if(privateP == true) {
          res.render('lis/3/you/pension/private-pension-amount');
        }
      }
    });
    
    //state-pension
    app.get('/lis/3/you/pension/state-pension-handler', function(req, res) {
      if (privateP == true) {
        res.render('lis/3/you/pension/private-pension-amount', {'privateP' : privateP });
      } else if (privateP == false) {
        res.render('lis/3/you/benefits/benefit-group1', {'privateP' : privateP });
      }
    });

    //kickout
    app.get('/lis/3/kickout-handler', function(req, res) {
      console.log(req.query);
      if (req.query.kickout === 'continue') {
        res.redirect('/lis/3/lis-home');
      } else {
        res.redirect('/lis/3/kickout');
      }
    });
    
    //property
    app.get('/lis/3/assets/property', function (req, res) {
      res.render('lis/3/assets/property', {
        'partnerText' : partnerText
      });
    });
    
    //about you summary
    app.get('/lis/3/you/about-you-summary', function (req, res) {
      res.render('lis/3/you/about-you-summary', {
        'myWork' : myWork
      });
    });
    
    //partner
    app.get('/lis/3/partner/partner-handler', function(req, res) {
      console.log(req.query);
      if (req.query.partner === 'yes') {
        partnerCheck(true);
        res.render('lis/3/partner/basic');
      } else {
        partnerCheck(false);
        res.render('lis/3/partner/summary');
      }
    });
    
    //education
    app.get('/lis/3/you/education-handler', function(req, res) {
      console.log(req.query);
      if (req.query.education === 'yes') {
        res.redirect('/lis/3/you/pension/pension');
      } else {
        res.redirect('/lis/3/you/pension/pension');
      }
    });
    
    //work
    app.get('/lis/3/you/work-handler', function(req, res) {
      console.log(req.query);
      if (req.query.work === 'yes') {
        myWork = 'Yes';
        res.redirect('/lis/3/you/education');
      } else {
        myWork = 'No';
        res.redirect('/lis/3/you/education');
      }
    });
        
    //benefits
    app.get('/lis/3/you/benefits/benefit-handler', function(req, res) {
      console.log(req.query);
      if (req.query.benefit === 'no') {
        res.redirect('/lis/3/you/benefits/other-money');
      } else {
        res.redirect('/lis/3/you/benefits/benefit-group1');
      }
    });
    
    //bank accounts
    app.get('/lis/3/assets/account-type-handler', function(req, res) {
      console.log(req.query);
      if (req.query.banktype === 'bank') {
        res.redirect('/lis/3/assets/accounts');
      } else {
        res.redirect('/lis/3/assets/other');
      }
    });

    //partner handlers

    //partner-work
    app.get('/lis/3/partner/pwork-handler', function(req, res) {
      console.log(req.query);
      if (req.query.work === 'yes') {
        myWork = 'Yes';
        res.redirect('/lis/3/partner/education');
      } else {
        myWork = 'No';
        res.redirect('/lis/3/partner/education');
      }
    });

    //partner-education
    app.get('/lis/3/partner/peducation-handler', function(req, res) {
      console.log(req.query);
      if (req.query.education === 'yes') {
        res.redirect('/lis/3/partner/pension/pension');
      } else {
        res.redirect('/lis/3/partner/pension/pension');
      }
    });

    //partner-pension
    app.get('/lis/3/partner/pension/ppension-handler', function(req, res) {
      console.log(req.query);
      if (req.query.pension === 'no') {
        res.redirect('/lis/3/partner/benefits/benefit-group1');
      } else {
        res.redirect('/lis/3/partner/pension/pension-credit');
      }
    });

    //partner-pension-type
    app.get('/lis/3/partner/pension/ppension-type-handler', function(req, res) {
      var pensions = req.query.pensiontype;
      console.log(pensions);
      if (pensions == 'state') {
        stateP = true;
        res.render('lis/3/partner/pension/pension-amount');
      } else if(pensions == 'private') {
        privateP = true;
        res.render('lis/3/partner/pension/private-pension-amount');
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
          res.render('lis/3/partner/pension/pension-amount');
        } else if(privateP == true) {
          res.render('lis/3/partner/pension/private-pension-amount');
        }
      }
    });

    //partner-pension-credit
    app.get('/lis/3/partner/pension/ppencred-handler', function(req, res) {
      console.log(req.query);
      if (req.query.prencred === 'ib') {
        res.redirect('/lis/3/kickout');
      } else {
        res.redirect('/lis/3/partner/pension/pension-type');
      }
    });

    //partner-state-pension
    app.get('/lis/3/partner/pension/pstate-pension-handler', function(req, res) {
      if (privateP == true) {
        res.render('lis/3/partner/pension/private-pension-amount', {'privateP' : privateP });
      } else if (privateP == false) {
        res.render('lis/3/partner/benefits/benefit-group1', {'privateP' : privateP });
      }
    });
   
    //partner-benefit handler
    app.get('/lis/3/partner/benefits/pbenefit-group2-handler', function(req, res) {
      var benefitsg2 = req.query.bgroup2;
      console.log(benefitsg2);
      if (benefitsg2 == 'dla') {
        dlaBen = true;
      }
      console.log(dlaBen);
      res.render('lis/3/partner/benefits/benefit-group3');
    });
    
    app.get('/lis/3/partner/benefits/pbenefit-group3-handler', function(req, res) {
      var benefitsg3 = req.query.bgroup3;
      console.log(benefitsg3);
      if (dlaBen === true) {
        res.render('lis/3/partner/benefits/dla');
      } else {
        res.render('lis/3/partner/benefits/benefit7');
      }
    });


    //LIS sprint 2
    
    //other people living in your home
    app.get('/lis/2/live/others/people-handler', function(req, res) {
      console.log(req.query);
      if (req.query.people === 'yes') {
        res.redirect('/lis/2/live/others/name');
      } else {
        res.redirect('/lis/2/live/living-summary');
      }
    });

    //where you live
    app.get('/lis/2/live/home-handler', function(req, res) {
      console.log(req.query);
      if (req.query.home === 'own') {
        res.redirect('/lis/2/live/mortgaged/joint');
      } else {
        res.redirect('/lis/2/live/joint');
      }
    });

    //pension-credit
    app.get('/lis/2/you/pension/pencred-handler', function(req, res) {
      console.log(req.query);
      if (req.query.prencred === 'ib') {
        res.redirect('/lis/2/kickout');
      } else {
        res.redirect('/lis/2/you/pension/pension-type');
      }
    });

    //pension
    app.get('/lis/2/you/pension/pension-handler', function(req, res) {
      console.log(req.query);
      if (req.query.pension === 'no') {
        res.redirect('/lis/2/you/benefits/benefit-group1');
      } else {
        res.redirect('/lis/2/you/pension/pension-credit');
      }
    });

    //pension-type
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
    
    //state-pension
    app.get('/lis/2/you/pension/state-pension-handler', function(req, res) {
      if (privateP == true) {
        res.render('lis/2/you/pension/private-pension-amount', {'privateP' : privateP });
      } else if (privateP == false) {
        res.render('lis/2/you/benefits/benefit-group1', {'privateP' : privateP });
      }
    });

    //kickout
    app.get('/lis/2/kickout-handler', function(req, res) {
      console.log(req.query);
      if (req.query.kickout === 'continue') {
        res.redirect('/lis/2/lis-home');
      } else {
        res.redirect('/lis/2/kickout');
      }
    });
    
    //property
    app.get('/lis/2/assets/property', function (req, res) {
      res.render('lis/2/assets/property', {
        'partnerText' : partnerText
      });
    });
    
    //about you summary
    app.get('/lis/2/you/about-you-summary', function (req, res) {
      res.render('lis/2/you/about-you-summary', {
        'myWork' : myWork
      });
    });
    
    //partner
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
    
    //education
    app.get('/lis/2/you/education-handler', function(req, res) {
      console.log(req.query);
      if (req.query.education === 'yes') {
        res.redirect('/lis/2/you/pension/pension');
      } else {
        res.redirect('/lis/2/you/pension/pension');
      }
    });
    
    //work
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
        
    //benefits
    app.get('/lis/2/you/benefits/benefit-handler', function(req, res) {
      console.log(req.query);
      if (req.query.benefit === 'no') {
        res.redirect('/lis/2/you/benefits/other-money');
      } else {
        res.redirect('/lis/2/you/benefits/benefit-group1');
      }
    });
    
    //bank accounts
    app.get('/lis/2/assets/account-type-handler', function(req, res) {
      console.log(req.query);
      if (req.query.banktype === 'bank') {
        res.redirect('/lis/2/assets/accounts');
      } else {
        res.redirect('/lis/2/assets/other');
      }
    });
    
    //LIS sprint 1
    
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

    //LIS sprint 0
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