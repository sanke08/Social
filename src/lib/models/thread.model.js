const mongoose = require("mongoose");



const threadSchema = new mongoose.Schema({
    text: { type: String, required: true },
    imageUrl: { type: String, },
    imageUrlPath: { type: String, },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    communityId: { type: mongoose.Schema.Types.ObjectId, ref: "community" },
    createdAt: { type: Date, default: Date.now },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "thread" },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "thread"
        }
    ],
    liked: [{ type: String }]
})




const Thread = mongoose.models.thread || mongoose.model("thread", threadSchema)

export default Thread 