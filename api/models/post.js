const mongoose = require("mongoose");

const root = "../public/images/";

const CommentSchema = new mongoose.Schema(
    {
        message: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        likes: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const PostSchema = new mongoose.Schema(
    {
        message: String,
        media: {
            type: String,
            get: (v) => `${root}${v}`,
        },
        likes: { type: [String], default: [] },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comments: [CommentSchema],
    },
    { timestamps: true, toJSON: { getters: true } }
);

const Post = mongoose.model("Post", PostSchema);
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Post;
