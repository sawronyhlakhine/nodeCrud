var models = require('../models');

var NoStaff = function(req,res,next){
    if(!req.user || req.user.role == models.User.STAFF){
        req.flash("errors","You do not have permission");
        return res.redirect("/");
    }
    next();
}

module.exports = NoStaff;