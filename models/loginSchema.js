const  mongoose  = require("mongoose");
const  Schema  =  mongoose.Schema;
const  loginSchema  =  new Schema({
    name: {
       type: String,
       required: true,
       min: 6,
       max: 255
    },
    
    email: {
        type: String,
        required: true,
        max : 255,
        min: 2
        },
    password: { 
    
        type: String,
        required: true,
        max : 1000,
        min: 8
    }
    });

    const user = mongoose.model("User",loginSchema);

    module.exports = user