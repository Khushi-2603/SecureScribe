const userModel = require('../models/user-model')
const hisaabModel = require('../models/hisaab-model')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


module.exports.viewpagecontroller =async function(req, res){
    const users = await hisaabModel.findOne({_id:req.params.id});
    if(users.encrypted){
        req.flash('error', 'Hisaab is Encrypted');
        res.render("passcode",{users});
    }
    res.render("hisaab",{users});
};

module.exports.postpasscodepagecontroller= async function(req, res){
    let users = await hisaabModel.findOne({_id:req.params.id});
    let passcode = req.body.passcode;
    if(users.passcode == passcode){
        res.render("hisaab",{users});
        }else{
        req.flash('error', 'Invalid Passcode');
        res.redirect("/profile");        
}}
module.exports.deletepagecontroller =async function(req, res){
    const deleteuser =await hisaabModel.findOneAndDelete({_id:req.params.id});
    req.flash('error', 'Hisaab Deleted');
    res.redirect("/profile")
};
module.exports.editpagecontroller =async function(req, res){
    let users = await hisaabModel.findOne({_id:req.params.id});
      res.render("edit",{users})
};
module.exports.updatepagecontroller = async function (req, res) {
    let {title,description} = req.body;
    let users = await hisaabModel.findOneAndUpdate({_id:req.params.id},{title,description},{new:true});
     req.flash('success_msg',"Details Updated");
      res.redirect("/profile");
};
