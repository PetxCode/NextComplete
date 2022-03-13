const upload = require("../../../utils/multer");
const cloudinary = require("../../../utils/cloudinary");
const userModel = require("../../../utils/userModel");
const dbConnect = require("../../../utils/dbConnect");

const nc = require("next-connect");
const bodyParser = require("body-parser");

export const config = {
	api: {
		bodyParser: false
	}
};

const handler = nc();

handler.get(async (req, res) => {
	try {
		const getData = await userModel.findById(req.query.id);
		res.status(200).json({ message: "users found", data: getData });
	} catch (err) {
		res.status(400).json({ message: "Error found" });
	}
});
handler.use(upload);

handler.patch(async (req, res) => {
	try {
		const { contact, address } = req.body;

		const getData = await userModel.findByIdAndUpdate(
			req.query.id,
			{
				contact: req.body.contact,
				address: req.body.address
			},
			{ new: true }
		);
		res.status(200).json({ message: "users found", data: getData });
	} catch (err) {
		res.status(400).json({ message: "Error found" });
	}
});

handler.delete(async (req, res) => {
	try {
		const { name } = req.body;
		const findData = await userModel.findById(req.query.id);
		if (findData) {
			await cloudinary.uploader.destroy(findData.public_id);
			const getData = await userModel.findByIdAndRemove(req.query.id);
			res.status(200).json({ message: "users deleted" });
		}
	} catch (err) {
		res.status(400).json({ message: "Error found" });
	}
});

handler.post(async (req, res) => {
	try {
		const { name, contact, address, gender } = req.body;
		console.log(req.file.path);
		const image = await cloudinary.uploader.upload(req.file.path);
		console.log(image);
		const createData = await userModel.create({
			name,
			contact,
			address,
			gender,
			avatar: image.secure_url,
			avatarID: image.public_id
		});
		res.status(200).json({ message: "users found", data: createData });
	} catch (err) {
		res.status(400).json({ message: "Error found" });
	}
});

export default handler;
