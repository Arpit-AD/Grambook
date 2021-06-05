const mongoose= require("mongoose");
const { schema } = require("./user");
const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({

    caption: {
        type: String,
        required: true
    },

    location: {
        type: String,
    },

    image: {
        type: String,
    },

    postedBy: {
        type: ObjectId,
        ref: "user"
    }

})


module.exports= Post = mongoose.model("post", postSchema);