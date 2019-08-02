const express = require('express');
const router = express.Router();
const models = require('../models');
const { check, validationResult } = require('express-validator/check');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const options = require('../config/options');

/* GET locations. */ // async ... await
router.get('/',async function(req, res, next) {
  let locations = await models.Location.findAll();
  let types = options.LOCATION_TYPES;
  res.render('locations/list',{locations:locations,types:types});
});

/* GET locations. */ // promise
// router.get('/',async function(req, res, next) {
//   models.Location.findAll().then((result)=>{
// res.render('locations/list',{locations:result});
//});
// });

/* GET create location form. */
router.get('/create', function(req, res, next) {
  let types = options.LOCATION_TYPES;
  res.render('locations/create',{types:types});
});

/* POST store location */
router.post('/store',
[
  check('name','Name must be at least 5 characters!').isLength({ min: 5 })
],
async function(req,res,next){
  let formData = req.body;
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errors",errors.array());
    // console.log(errors.array());
    // process.exit(1);
    return res.redirect("/locations/create"); //redirect to GET /submit
  }
  
  let result = await models.Location.create(formData);
  if(result){
    req.flash("infos","Successully Added!");
    return res.redirect("/locations");
  }
});


/* GET edit loacation form*/
router.get('/:id/edit',async function(req,res,next){
  let id = req.params.id;
  let types = options.LOCATION_TYPES;
  let result = await models.Location.findById(id);
  if(result){
    res.render('locations/edit',{location:result,types:types});
  }
  
});

/* POST update location */
router.post('/:id/update',[
  check('name','Name must be at least 5 characters!').isLength({ min: 5 })
],async function(req,res,next){
  
  let id = req.params.id;
  let formData = req.body;
  const errors = validationResult(req);
  //console.log(errors.array());
  if (!errors.isEmpty()) {
    req.flash("errors",errors.array());
    return res.redirect("/locations/"+id+"/edit"); //redirect to GET /submit
  }
  
  let result = await models.Location.update(formData, {where:{id:id}});
  if(result){
    req.flash("infos","Successfully Updated!");
    return res.redirect("/locations");
  }
});

/**
*  delete location
*/

router.get("/:id/delete",async function(req, res, next){
  let id = req.params.id;
  let result = await models.Location.destroy({where:{id:id}});
  if(result){
    return res.redirect("/locations");
  }
  
});


router.post('/getData',async function (req, res, next){
  let locations = await models.Location.findAll();
  let types = options.LOCATION_TYPES;

  locations.map(function(location,i){
    location.type = types[location.type];
    return location;
  });
  res.json({data:locations});
});

module.exports = router;