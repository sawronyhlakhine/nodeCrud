const express = require('express');
const multer  = require('multer');
const logoUpload = multer({ dest: 'public/uploads/brands/' });
const router = express.Router();
const models = require('../models');
const { check, validationResult } = require('express-validator/check');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/** GET brands*/
router.get('/',async function(req,res,next){
    let brands = await models.Brand.findAll();
    res.render('brands/list',{brands:brands});
});

/*GET create brands */
router.get('/create',function(req,res,next){
    res.render('brands/create');
});

/** POST store brands */
router.post('/store',
logoUpload.single('logo'),
[
    check('name','Name must be at least 1 characters!').isLength({ min: 1 }),
  ],
async function (req,res,next){
    let formData = req.body;
    let photo = req.file;
    if(photo){
        formData.logo = photo.filename;
    }
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash("errors",errors.array());
        return res.redirect("/brands/create");
    }
    let result = await models.Brand.create(formData);
    if(result){
        req.flash("infos","Successfully Added!");
        return res.redirect("/brands");
    }
});

/*GET edit brands */
router.get('/:id/edit',async function(req,res,next){
    let id = req.params.id;
    let result = await models.Brand.findById(id);
    if(result){
        res.render('brands/edit',{brand:result});
    } 
    res.render('brands/create');
});

/**POST update brands */
router.post('/:id/update',
logoUpload.single('logo'),
[
    check('name','Name must be at least 1 characters!').isLength({ min: 1 }),
  ],
async function(req,res,next){
    let id = req.params.id;
    let formData = req.body;
    let photo = req.file;
    if(photo){
        formData.logo = photo.filename;
    }
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash("errors",errors.array());
        return res.redirect("/brands/"+id+"/edit");
    }
    let result = await models.Brand.update(formData,{where:{id:id}});
if(result){
    req.flash("infos","Successully Updated!");
    return res.redirect("/brands");
}
});

/* Delete Category */
router.get('/:id/delete',async function(req,res,next){
    let id = req.params.id;
    let result = await models.Brand.destory({where:{id:id}});
    if(result){
        return res.redirect("/brands");
    }
});

router.post('/getData',async function (req, res, next){
    let brands = await models.Brand.findAll();
    // let types = options.LOCATION_TYPES;
  
    // locations.map(function(location,i){
    //   location.type = types[location.type];
    //   return location;
    // });
    res.json({data:brands});
  });
module.exports = router;