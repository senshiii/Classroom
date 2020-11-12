const multer = require('multer');
const crypto = require('crypto');

let upload = null;
const diskStorageOptions = {
	destination: (req, file, cb) => {
		cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
		crypto.randomBytes(10, (err, buf) => {
			let parts = file.originalname.split('.');
			let fileName = buf.toString('hex') + '.' + parts[parts.length - 1];
			// console.log(fileName);
			cb(null, fileName);
		});
	}
};
upload = multer({ storage: multer.diskStorage(diskStorageOptions) });
exports.upload = upload;
