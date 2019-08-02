var express = require('express');
var router = express.Router();
var models = require('../models');
var auth = require('connect-ensure-login').ensureLoggedIn;
/* GET dashboard page. */
router.get('/', auth('/auth/login'),async function(req, res, next) {

  // console.log(req.user);
  let total_users = await models.User.count();
  let total_products = await models.Product.count();

  res.render('index', { title: 'Express',total_products:total_products, total_users:total_users });
});

module.exports = router;
