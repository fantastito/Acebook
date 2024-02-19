const mongoose = require("mongoose");

const root = "../public/images/";

const NotificationSchema = new mongoose.Schema(
	{
		message: String
	}, {timestamp: true}
)

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		bio: String,
		image: {
			type: String,
			get: (v) => `${root}${v}`,
		},
		friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
		notifications: [NotificationSchema]
	},
	{ timestamp: true, toJSON: { getters: true } }
);

const User = mongoose.model("User", UserSchema);
const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = User;
