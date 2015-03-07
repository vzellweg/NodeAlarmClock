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
   res.render('index', dustVars);
});

module.exports = router;
