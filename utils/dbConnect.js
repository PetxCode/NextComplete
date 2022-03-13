const mongoose = require("mongoose");
const url = "mongodb://localhost/createDB";

mongoose.connect(url).then(() => {
	console.log("Database is now connected");
});

module.exports = mongoose;
