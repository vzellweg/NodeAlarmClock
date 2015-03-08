var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   var dustVars = {
      title: 'Lab 9 - vzellweg',
      cssFiles: [
         {css: 'index.css'},
         {css: 'alarm.css'}],
      javascriptFiles: [
         {javascript: 'index.js'},
         {javascript: 'alarm.js'}]
   }
   var sesh = req.session;
   var userName = sesh.passport.user ? sesh.passport.user.id : 'Guest';

   dustVars.userName = userName;
   dustVars.loggedIn = sesh.passport.user ? true : false;
   res.render('index', dustVars);
});

module.exports = router;
