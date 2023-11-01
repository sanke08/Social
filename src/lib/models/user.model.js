const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true , unique: true},
    image: { type: String },
    imageUrlPath:{type: String},
    bio: { type: String },
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "thread"
        }
    ],
    onboarded: { type: Boolean, default: false },
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "community"
        }
    ]
})


 

 const User = mongoose.models.user || mongoose.model("user", userSchema)

 export default User