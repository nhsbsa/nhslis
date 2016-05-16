var version = 1;

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

    //LIS 0.1
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
    
    //about you summary
    app.get('/lis/1/you/about-you-summary', function (req, res) {
      res.render('lis/1/you/about-you-summary', {
        'myWork' : myWork
      });
    });
    
    //education
    app.get('/lis/1/you/education-handler', function(req, res) {
      console.log(req.query);
      if (req.query.education === 'yes') {
        res.redirect('/lis/1/you/course');
      } else {
        res.redirect('/lis/1/you/work');
      }
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
    app.get('/lis/1/you/pension/pension-handler', function(req, res) {
      console.log(req.query);
      if (req.query.pension === 'no') {
        res.redirect('/lis/1/you/benefits/benefit-group1');
      } else {
        res.redirect('/lis/1/you/pension/pension-credit');
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
    app.get('/lis/1/you/benefits/benefit-handler', function(req, res) {
      console.log(req.query);
      if (req.query.benefit === 'no') {
        res.redirect('/lis/1/you/benefits/other-money');
      } else {
        res.redirect('/lis/1/you/benefits/benefit-group1');
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