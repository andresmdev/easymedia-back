const auth = require('../services/auth');

module.exports.registerUser = async (req, res) => {
  try {
    const data = await auth.registerUser(req.body);
    res.send({ 
      "success": true, 
      "data": data
    });
  }
  catch (error) {
    res.send( {
      "success": false,
      "message": error
      }
    );
  }
}

module.exports.userLogin = async (req, res) => {
  try {
    const data = await auth.userLogin(req.body);
    res.send({ 
      "success": true, 
      "data": data
    });
  }
  catch (error) {
    res.send( {
      "success": false,
      "message": error
      }
    );
  }
}
