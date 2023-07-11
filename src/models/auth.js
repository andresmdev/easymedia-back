const db = require('../config/connection');

exports.checkEmailData = async (email) => {
	return new Promise( (resolve, reject) => {
		db.query(`SELECT COUNT(*) AS 'total' FROM users WHERE Email = ?`, [email], 
		(error, result) => {
			if(error) {
				console.log(`Ha ocurrido un error:  ${error.stack}`);
				reject();
			}

			resolve(result[0].total);
		});
	});
}

exports.registerUserData = async (name, email, password) => {
  return new Promise( (resolve, reject) => {
		db.query(`INSERT INTO users (Name, Email, Password)
    VALUES(?,?,?)`, [name, email, password],
		(error, result) => {	
			if(error) {
				console.log(`Ha ocurrido un error: ${error.stack}`);
				reject();
			}

			resolve(result);
		});
	});
}

exports.userLoginData = async (email) => {
  return new Promise( (resolve, reject) => {
		db.query(`SELECT UniqueId AS 'id',
      Name AS 'name',
      Email AS 'email',
      Password AS 'password'
    FROM users
    WHERE Email = ?`, [email],
		(error, result) => {	
			if(error) {
				console.log(`Ha ocurrido un error: ${error.stack}`);
				reject();
			}

			resolve(result[0]);
		});
	});
}