var express = require('express');
var router = express.Router();
var models = require('../models');
const multer  = require('multer');
const { check, validationResult } = require('express-validator/check');
const thumbnailUpload = multer({ dest: 'public/uploads/news' });
var auth = require('connect-ensure-login').ensureLoggedIn;
var options = require('../config/options');


/* GET news. */ //async... await
router.get('/',  auth('/auth/login'), async function(req, res, next) {
    let news = await models.News.findAll();  
    let post_types = options.POST_TYPES;
    let post_status = options.POST_STATUS;

    res.render('news/list', {news:news,post_types:post_types,post_status:post_status});
  });

  /* GET create news */
  router.get('/create', auth('/auth/login'),async function (req,res,next){
    
    let users = await models.User.findAll();
    let townships = await models.Location.findAll();
    let post_types = options.POST_TYPES;
    let post_status = options.POST_STATUS;
    res.render('news/create',{users:users,townships:townships,post_types:post_types,post_status:post_status});
  });

  /* POST Store news. */
router.post('/store', 
thumbnailUpload.single('thumbnail'),
[
  check('title','Title must be at least 5 characters!').isLength({ min: 5 }),
  
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
     return res.redirect("/news/create"); //redirect to GET /submit
   }

  let result = await models.News.create(formData);
  if(result)
  {
    return res.redirect("/news");
  } 
});

/* POST Edit location. */
router.get('/:id/edit',  auth('/auth/login'),async function(req, res, next) {
    let id = req.params.id;
  
    let users = await models.User.findAll();
    let townships = await models.Location.findAll();
    let post_types = options.POST_TYPES;
    let post_status = options.POST_STATUS;
  
    let result = await models.News.findById(id);
    if(result){
        res.render('news/edit',{news:result,users:users,townships:townships,post_types:post_types,post_status:post_status});
    }
 
  });

  /* POST update a  package. */
router.post('/:id/update', 
thumbnailUpload.single('thumbnail'), 
[
  check('title','Title must be at least 5 characters!').isLength({ min: 5 }),
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
        return res.redirect("/news/"+id+"/edit");
    }

    let result =await models.News.update(formData,{where:{id:id}});
    if(result){
      res.redirect("/news");
    }
 
});
// Delete News
router.get("/:id/delete",  auth('/auth/login'),async function(req, res, next){
    let id = req.params.id;
  
    let result = await models.News.destory({where:{id:id}});
    if(result){
      return res.redirect("/news");
  }
  });

  router.post('/getData',async function (req, res, next){
    let news = await models.News.findAll();
    let post_types = options.POST_TYPES;
    let post_status = options.POST_STATUS;
  
    news.map(function(news,i){
      news.type = post_types[news.type];
      news.status = post_status[news.status];
      return news;
    });
    res.json({data:news});
  });

  module.exports = router;