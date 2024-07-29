const userModel = require('../models/user-model')
const hisaabModel = require('../models/hisaab-model')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { isValid, parseISO } = require('date-fns');

module.exports.landingPageController = function(req, res){
    res.render('index');
};
module.exports.loginPageController = async function(req, res){
    let {email,password} = req.body;
    let user = await userModel.findOne({email}).select("+password");
    if(!user){
        req.flash("error","You Don't Have Account. Please Create One")
        return res.redirect('/register');
    }

     bcrypt.compare(password, user.password, function(err,result) {
        if(result){
            let token = jwt.sign({email:user.email, userid :user._id},process.env.JWT_KEY)
            res.cookie("token",token);
            res.redirect('/profile');
        } 
        else{
            req.flash('error', 'Invalid Credentials');
            res.redirect('/');
        } 
     }) 
};
module.exports.registerController = function(req, res){
    res.render('register');
};
module.exports.postregisterController =  async function(req, res){
    let {username,email,password,name} = req.body;
    try{
        let user = await userModel.findOne({email});
        if(user){
         req.flash("error","You Already Have Account , Please Login");
         return res.redirect('/');
        }
        
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt, async (err,hash)=>{
                let user = await userModel.create({
                    name,
                    username,
                    email,
                    password:hash,
                  })
                  let token = jwt.sign({email:user.email, userid :user._id},process.env.JWT_KEY)
                  res.cookie("token",token);
                  req.flash('success_msg', 'Account Created Please Login');
                  res.redirect('/');
            })
        })
    }catch(error){
        req.flash("error","internal error");
    }
};
module.exports. logoutPageController = function(req, res){
        res.cookie("token","");
        req.flash("success_msg", "You are now logout");
        res.redirect("/")
};

module.exports.IprofilePageController = async function(req, res) {
    let byDate = Number(req.query.byDate);
    let { startDate, endDate } = req.query;

    byDate = isNaN(byDate) ? -1 : byDate;
    startDate = startDate ? new Date(startDate) : new Date("1970-01-01");
    endDate = endDate ? new Date(endDate) : new Date();

    try {
        let user = await userModel.findOne({ email: req.user.email }).populate({
            path: "hisaab",
            match: { createdAt: { $gte: startDate, $lte: endDate } },
            options: { sort: { createdAt: byDate } },
        });

        if (!user) {
            res.render('profile', { user: null });
        } else {
            res.render('profile', { user: user });
        }
    } catch (error) {
        console.error("Error retrieving user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.createHisaabController = function(req, res){
    res.render('create');
};
module.exports.postcreateHisaabController = async function(req,res){
        let { title,description} = req.body;
        const encrypted = req.body.encrypted == 'on' ? true: false;
        const shareable = req.body.shareable == 'on' ? true: false;
        const editpermissions = req.body.editpermissions == 'on' ? true: false;
        const passcode = req.body.passcode;

        let user = await userModel.findOne({email:req.user.email});
        let hisaab = await hisaabModel.create({
            user:req.user._id,
            title,
            description,
            encrypted,
            shareable,
            passcode,
            editpermissions
        })
        user.hisaab.push(hisaab._id);
        await user.save();
        req.flash("'success_msg'","Hisaab Created");
        res.redirect("/profile")
}
module.exports.uploadController = function(req, res){
    res.render('uploads');
};
 module.exports.postuploadController = async function(req, res){
    let user = await userModel.findOne({email:req.user.email});
    user.profilepic = req.file.filename;
    await user.save()
    req.flash("'success_msg'","Profile Uploaded");
    res.redirect('/profile')
}