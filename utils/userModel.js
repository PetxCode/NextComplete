const mongoose = require("mongoose");
const userModel = mongoose.Schema(
	{
		name: {
			type: String
		},
		gender: {
			type: String
		},
		contact: {
			type: Number
		},
		address: {
			type: String
		},
		avatar: {
			type: String
		},
		avatarID: {
			type: String
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.models.users || mongoose.model("users", userModel);
