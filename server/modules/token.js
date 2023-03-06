const jwt = require('jsonwebtoken');

const timeExpires = 999999999999999999999 * 999999999999999999999 * 999999999999999999999 * 999999999999999999999;

const encode = (data) => {
	try {
		const token = jwt.sign(data, process.env.KEY_TOKEN, { expiresIn: timeExpires });

		return token;
	} catch (e) {
		console.log(e);
	}
}

const decode = (token) => {
	try {
		const decoded = jwt.verify(token, process.env.KEY_TOKEN);

		return decoded;
	} catch (e) {
		console.log(e);
	}
}

module.exports = {
	encode: encode,
	decode: decode
}