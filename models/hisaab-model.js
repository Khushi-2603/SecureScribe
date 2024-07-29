const mongoose = require('mongoose');

const hisaabSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"alluser"
    },
    encrypted:{
        type:Boolean,
        default:false,
    },
    shareable:{
        type:Boolean,
        default:false,
    },
    passcode:{
      type:String,
      default:"",
    },
    editpermissions:{
        type:Boolean,
        default:false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    date:{
        type:Date,
        default:Date.now(),
      },
    },
    { timestamps: true } 
);

module.exports = mongoose.model('hisaab',hisaabSchema);