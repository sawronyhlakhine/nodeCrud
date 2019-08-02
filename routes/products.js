var express = require('express');
var router = express.Router();
var models = require('../models');
const multer  = require('multer');
const { check, validationResult } = require('express-validator/check');
const thumbnailUpload = multer({ dest: 'public/uploads/products' });
var auth = require('connect-ensure-login').ensureLoggedIn;

/* GET locations. */ //async... await
router.get('/',  auth('/auth/login'), async function(req, res, next) {
  let products = await models.Product.findAll();  
  res.render('products/list', {products:products});
});


/* GET create location form. */
router.get('/create',  auth('/auth/login'), async function(req, res, next) {
  let brands = await models.Brand.findAll(); 
  let categories = await models.Category.findAll(); 
    res.render('products/create',{categories:categories,brands:brands});
});

/* POST Store location. */
router.post('/store', 
thumbnailUpload.single('thumbnail'),
[
  check('title','Title must be at least 5 characters!').isLength({ min: 3 }),
],
 async function(req, res, next) {
  let formData = req.body;
  let photo = req.file;
  if(photo){
    formData.thumbnail = photo.filename;
  }

   // Finds the validation errors in this request and wraps them in an object with handy functions
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     req.flash("errors",errors.array());
     return res.redirect("/products/create"); //redirect to GET /submit
   }

  let result = await models.Product.create(formData);
  if(result)
  {
    return res.redirect("/products");
  } 
});

/* POST Edit location. */
router.get('/:id/edit',  auth('/auth/login'),async function(req, res, next) {
  let id = req.params.id;

  let brands = await models.Brand.findAll(); 
  let categories = await models.Category.findAll(); 

  let result = await models.Product.findById(id);
  if(result){
    res.render('products/edit',{product:result,categories:categories,brands:brands});
  }
  // models.Product.findById(id).then( (data)=>{
  //   res.render('products/edit',{product:data,categories:categories,brands:brands});
  // });
});

/* POST update a  package. */
router.post('/:id/update', 
thumbnailUpload.single('thumbnail'), 
[
  check('title','Title must be at least 5 characters!').isLength({ min: 3 }),
],
async function(req, res, next) {
  let id = req.params.id;
  let formData = req.body;  
 
  let photo = req.file;
  if(photo){
    formData.thumbnail = photo.filename;
  }

  const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash("errors",errors.array());
        return res.redirect("/product/"+id+"/edit");
    }

    let result =await models.Product.update(formData,{where:{id:id}});
    if(result){
      res.redirect("/products");
    }
  //Promise way
  // models.Product.update(formData, {where:{id:id}}).then((data,err)=>{
  //       res.redirect("/products");
  // });
});

// Delete Location
router.get("/:id/delete",  auth('/auth/login'),async function(req, res, next){
  let id = req.params.id;

  let result = await models.Product.destory({where:{id:id}});
  if(result){
    return res.redirect("/users");
}

  // models.Product.destroy({where:{id:id}}).then(data=>{
  //    res.redirect("/products");
  // });
});

router.post('/getData',async function (req, res, next){
  let products = await models.Product.findAll();


  // news.map(function(news,i){
  //   news.type = post_types[news.type];
  //   news.status = post_status[news.status];
  //   return news;
  // });
  res.json({data:products});
});

module.exports = router;