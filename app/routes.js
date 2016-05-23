var partner = false;
var partnerText = "you";

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
    });
    
    // add your routes here
    
    //LIS sprint 1
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
    
    //kickout
    app.get('/lis/1/kickout-handler', function(req, res) {
      console.log(req.query);
      if (req.query.kickout === 'continue') {
        res.redirect('/lis/1/you/registration');
      } else {
        res.redirect('/lis/1/kickout');
      }
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