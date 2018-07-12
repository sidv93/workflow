import User from '../models/User';
import Cookie from '../models/Cookies';
import HttpStatus from 'http-status';
import uuidv4 from 'uuid/v4';

export function authenticate (req, res) {
	let reqBody = req.body;
	let cookie = new Cookie();
	if (reqBody.rememberMe) {
		cookie.token = uuidv4();
		cookie.userId= reqBody.userId;
		let now = new Date();
		let time = now.getTime();
		let expireTime = time + 1000 * 36000;
		now.setTime(expireTime);
		cookie.expires = now.toGMTString();

		cookie.save( (err, saveRes) => {
			if (err) {
				console.log("Error while saving cookie=");
			}
		});
	}

	if (reqBody.userId && reqBody.password) {
		User.findOne({ userId: reqBody.userId, password: reqBody.password }).exec((err, user) => {
			if (err) {
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					status: 'failure',
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					error: 'Unexpected error in getting authenticated'
				});
			}
			if (user == null) {
				res.status(HttpStatus.NOT_FOUND).json({
					status: 'failure',
					code: HttpStatus.NOT_FOUND,
					error: 'User not found'
				});
			}
			if (user != null) {
				if(reqBody.rememberMe) {
					let cookies= {
						"token": cookie.token,
						"expires": cookie.expires
					};
					res.status(HttpStatus.OK).json({
						status: 'success',
						code: HttpStatus.OK,
						data: cookies
					});
				} else {
					res.status(HttpStatus.OK).json({
						status: 'success',
						code: HttpStatus.OK,
						data: "User authenticated successfully"
					});
				}
			}
		});
	}
	else if (reqBody.token) {
		Cookie.findOne({ token: reqBody.token }).exec( (err, cookie) => {
			if (err) {
				res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
					status: 'failure',
					code: HttpStatus.INTERNAL_SERVER_ERROR,
					error: 'Unexpected error in getting authenticated'
				});
			}
			if (!cookie) {
				res.status(HttpStatus.NOT_FOUND).json({
					status: 'failure',
					code: HttpStatus.NOT_FOUND,
					error: 'Cookie not found'
				});
			}
			if (cookie) {
				res.status(HttpStatus.OK).json({
					status: 'success',
					code: HttpStatus.OK,
					data: cookie.userId
				});
			}
		});
	} else {
		res.status(HttpStatus.BAD_REQUEST).json({
			status: 'failure',
			code: HttpStatus.BAD_REQUEST,
			error: 'Username or password missing'
		});
	}
}