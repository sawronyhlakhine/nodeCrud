var express = require('express');
var router = express.Router();
var models = require('../models');
var bcrypt = require('bcryptjs');  
var {check,validationResult} = require('express-validator/check');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var auth = require('connect-ensure-login').ensureLoggedIn;
var options = require('../config/options');
var NoStaff = require('../middlewares/NoStaff');

//STAFF not allow
// router.use(function(req,res,next){
//     if(req.user.role == models.User.STAFF){
//         req.flash("errors","You do not have permissiom to access that page!");
//         return res.redirect("/");
//     }
//     next();
// });


/* GET user list */
router.get('/',auth('/auth/login'), async function (req,res,next){
    let result = await models.User.findAll();
    let roles = options.ROLES;
    if(result){
        res.render('users/list',{users:result,roles:roles});
    }
});

/* GET create user */
router.get('/create',NoStaff, function(req,res,next){
    let roles = options.ROLES;
    res.render('users/create',{roles:roles});
});

/** POST store user */
router.post('/store',
[
    check('name','Name must be at least 3 characters!').isLength({ min: 3 }),
    check('email','Invalid Email!').isEmail(),
    check('phone','Phone Number must be at least 6 digits').isLength({min:6}),
    check('address','Address must be at least 3 characters!').isLength({ min: 3 }),
  ],
async function (req,res,next){
    let formData = req.body;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("errors",errors.array());
      return res.redirect("/users/create"); //redirect to GET /submit
    }
    let userExists = await models.User.findAll({where:{[Op.or]: [{phone: formData.phone}, {email: formData.email}]}});
  if(userExists && userExists.length>0)
  {
    req.flash("errors", "Email or phone number is already in use!");
    return res.redirect('/users/create');
  }
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(formData.password, salt);
  formData.password = hash;
// Store hash in your password DB.
    let result = await models.User.create(formData);
    if(result){
      req.flash("infos","Successully Added!");
      return res.redirect("/users");
    }
});

/*GET edit users */
router.get('/:id/edit',NoStaff, async function(req,res,next){
    let id = req.params.id;
    let roles = options.ROLES;
    let result = await models.User.findById(id);
    if(result){
        res.render('users/edit',{user:result,roles:roles});
    } 
    res.render('users/create');
});

/**POST update users */
router.post('/:id/update',
[
    check('name','Name must be at least 3 characters!').isLength({ min: 3 }),
    check('email','Invalid Email!').isEmail(),
    check('phone','Phone Number must be at least 6 digits').isLength({min:6}),
    check('address','Address must be at least 3 characters!').isLength({ min: 3 }),
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
        return res.redirect("/user/"+id+"/edit");
    }
    var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(formData.password, salt);
  formData.password = hash;
    let result = await models.User.update(formData,{where:{id:id}});
if(result){
    req.flash("infos","Successully Updated!");
    return res.redirect("/users");
}
});

/* Delete User */
router.get('/:id/delete',NoStaff, async function(req,res,next){
    let id = req.params.id;
    let result = await models.User.destory({where:{id:id}});
    if(result){
        return res.redirect("/users");
    }
});

/*GET edit users profile */
router.get('/profile',auth('/auth/login'), async function(req,res,next){
    let roles = options.ROLES;
    res.render('users/profile',{user:req.user,roles:roles});
});

/*POST update users profile */
router.post('/profile',
[
    check('name','Name must be at least 3 characters!').isLength({ min: 3 }),
    check('email','Invalid Email!').isEmail(),
    check('phone','Phone Number must be at least 6 digits').isLength({min:6}),
    check('address','Address must be at least 3 characters!').isLength({ min: 3 }),
  ],
  async function(req,res,next){
    let id = req.user.id;
    let formData = req.body;
    let photo = req.file;
    if(photo){
        formData.logo = photo.filename;
    }
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        req.flash("errors",errors.array());
        return res.redirect("/user/"+id+"/edit");
    }
    var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(formData.password, salt);
  formData.password = hash;
    let result = await models.User.update(formData,{where:{id:id}});
if(result){
    req.flash("infos","Successully Updated!");
    return res.redirect("/users");
}
});

router.post('/getData',async function (req, res, next){
    let users = await models.User.findAll();
    let roles = options.ROLES;
  
    users.map(function(user,i){
      user.role = roles[user.role];
      return user;
    });
    res.json({data:users});
  });

module.exports = router;