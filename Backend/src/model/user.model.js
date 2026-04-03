const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:[true,"Username already taken"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already exist"]
    },
    password:{
        type:String,
        required:[true,""]
    }
})

userSchema.pre("save", function(next){})
userSchema.post("save", function(next){})


const userModel = mongoose.model("User", userSchema)

module.exports = userModel