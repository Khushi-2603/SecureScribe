const mongoose = require('mongoose');

const alluserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        select:false,
    },
    hisaab: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hisaab'
    }],
    profilepic:{
        type:String,
        default:"default.png"
    },
    date:{
      type:Date,
      default:Date.now(),
    },
},
{ timestamps: true } 
)

module.exports = mongoose.model('alluser',alluserSchema);
