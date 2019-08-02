var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET login form. */
router.get('/login', function(req, res, next) {

  res.render('auth/login',{layout:'layouts/auth'});
});

router.post('/login', 
  passport.authenticate('local', { successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true }),
function(req, res, next) {

  res.json('hi');
});
/* Logout. */
router.get('/logout', function(req, res, next) {
  req.logout();
return res.redirect('/auth/login');
});
/* GET forgot_password form. */
router.get('/forgot_password', function(req, res, next) {
  
  res.render('auth/forgot_password',{layout:'layouts/auth'});
});

router.post('/forgot_password', function(req, res, next) {
  
  res.send('respond with a resource');
});


module.exports = router;
