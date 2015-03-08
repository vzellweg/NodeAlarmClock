var express = require('express');
var passport = require('passport');
var imgurStrat = require('passport-imgur');

var router = express.Router();
var util = require('util');
var cId = process.env.CLIENT_ID || '54cc61a02e73b99';
var cSecret = process.env.CLIENT_SECRET || 'c037417732a795d4d8c090653424e957fc85996b';
var rUri = process.env.REDIRECT_URI || 'http://localhost:3000/oauth/callback';



//
// OAuth2 client information 
//
var oauth2 = new imgurStrat.Strategy({
  clientID : cId,
  clientSecret : cSecret,
  callbackURL : rUri},
  function(accessToken, refreshToken, profile, done) {
    console.log("callback, profile: ", util.inspect(profile, false, null));
    var user = {};
    var err = "oauth callback error";
    if (profile.url) {
        err = null;
        user.id = profile.url;
    }
    done (err, user);
    
});

passport.use('imgur', oauth2);



/* GET login salesforce page. */
router.get('/imgur', passport.authenticate('imgur'));
 

router.get('/callback', passport.authenticate('imgur', { successRedirect: '/',
                                      failureRedirect: '/login' }))

// This gets run upon successful authentication to Salesforce.
// Save the users accessToken and instanceURL for usage across
// the app.
// router.get('/callback', function(req, res) {
//     var conn = new jsforce.Connection({oauth2: oauth2});
//     var code = req.query.code;
//     conn.authorize(code, function(err, userInfo) {
//         if (err) { return console.error(err); }
 
//         console.log('Access Token: ' + conn.accessToken);
//         console.log('Instance URL: ' + conn.instanceUrl);
//         console.log('User ID: ' + userInfo.id);
//         console.log('Org ID: ' + userInfo.organizationId);

//         req.session.accessToken = conn.accessToken;
//         req.session.instanceUrl = conn.instanceUrl;
//         req.session.userId = userInfo.id;
//         req.session.orgId = userInfo.organizationId;

//         // Redirect to home page
//         res.redirect('/');
//     });
// });

router.get('/logout', function(req, res) {
    var conn = new jsforce.Connection({
        accessToken: req.session.accessToken,
        instanceUrl: req.session.instanceUrl
    });

    conn.logout(function(err) {
        if(err) {
            return console.error(err);
        }
        
        console.log('User logged out');
        res.redirect('/oauth');
    });
});

module.exports = router;
