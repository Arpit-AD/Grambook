const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        
    },
    age: {
        type: Number,
    }
})


module.exports= User = mongoose.model("user", userSchema);