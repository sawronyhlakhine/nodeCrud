const express = require('express');
const multer  = require('multer');
const iconUpload = multer({ dest: 'public/uploads/categories/' });
const router = express.Router();
const models = require('../models');
const { check, validationResult } = require('express-validator/check');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* GET categories */
router.get('/',async function(req, res, next) {
    let categories = await models.Category.findAll();
    res.render('categories/list',{categories:categories});
  });

  /* GET categories */
router.get('/create', function(req, res, next) {
    res.render('categories/create');
  });

/* POST store category */
router.post('/store',
iconUpload.single('icon'),
[
    check('title','Title must be at least 5 characters!').isLength({ min: 3 }),
  ],
async function(req,res,next){
    let formData = req.body;
    let photo = req.file;
    if(photo){
        formData.icon = photo.filename;
    }
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash("errors",errors.array());
        return res.redirect("/categories/create");
    }
    let result = await models.Category.create(formData);
if(result){
    req.flash("infos","Successully Added!");
    return res.redirect("/categories");
}
});

/* GET edit category */
router.get('/:id/edit',async function(req,res,next){
  let id = req.params.id;
  let result = await models.Category.findById(id);
  if(result){
      res.render('categories/edit',{category:result});
  }
});

/* POST store category */
router.post('/:id/update',
iconUpload.single('icon'),
[
    check('title','Title must be at least 5 characters!').isLength({ min: 3 }),
  ],
async function(req,res,next){
    let id = req.params.id;
    let formData = req.body;
    let photo = req.file;
    if(photo){
        formData.icon = photo.filename;
    }
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash("errors",errors.array());
        return res.redirect("/categories/"+id+"/edit");
    }
    let result = await models.Category.update(formData,{where:{id:id}});
if(result){
    req.flash("infos","Successully Updated!");
    return res.redirect("/categories");
}
});

/* Delete Category */
router.get('/:id/delete',async function(req,res,next){
    let id = req.params.id;
    let result = await models.Category.destory({where:{id:id}});
    if(result){
        return res.redirect("/categories");
    }
});

router.post('/getData',async function (req, res, next){
    let categories = await models.Category.findAll();
    // let types = options.LOCATION_TYPES;
  
    // locations.map(function(location,i){
    //   location.type = types[location.type];
    //   return location;
    // });
    res.json({data:categories});
  });
  module.exports = router;