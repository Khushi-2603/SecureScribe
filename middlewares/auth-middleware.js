const jwt = require('jsonwebtoken');
module.exports.isLoggedIn = function(req,res,next) {
    if(req.cookies.token){
       try{
        let data = jwt.verify(req.cookies.token,process.env.JWT_KEY);
        req.user = data;
        next();
       }catch(err){
          res.redirect('/');
       }
    }else{
        res.redirect("/")
    }
};