const jwt = require('jsonwebtoken');

exports.getRequest = function(req, _, next) {
	const _header = (req.headers['token']) ? req.headers['token'] : null;
	const method = req.method;

	let parameters = {
		body: req.body,
		query: req.query,
		urlParams: req.params,
		externalIp: req.ip,
		authToken: _header
	};

  console.log('info',`Method: ${method} - Request: ${req.originalUrl} - Header: ${_header} - Parameters: ${JSON.stringify(parameters)}`);

	next();
}

exports.checkSession = async function(req, res) {
	const cert = process.env.SIGNTOKEN;
	const token = req.headers['token'];

	try {
		jwt.verify(token, cert);	
		return res.send({success:true});
	}
	catch (err) {
		return res.send({success: false});
	}
}

exports.authToken = function(req, res, next) {
	let token = req.headers['token'];

	if(!token) {
		console.log("Received request without auth header - token");
		return res.status(400).send({
      success: false,
      message: "UNAUTHORIZED_ACCESS_TOKEN"
    });
	}

	next();
}
