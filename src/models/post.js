const e = require('express');
const db = require('../config/connection');

exports.createPostData = async (user_id, titleSlug, title, message) => {
  return new Promise( (resolve, reject) => {
		db.query(`CALL newPost(?,?,?,?)`, [user_id, titleSlug, title, message],
		(error, result) => {	
			if(error) {
				console.log(`Ha ocurrido un error: ${error.stack}`);
				reject();
			}

			resolve(result);
		});
	});
}

exports.getAllPostData = async (user_id) => {
  return new Promise( (resolve, reject) => {
		db.query(`SELECT p.PublicPath AS 'id',
      p.Title AS 'title',
      p.Message AS 'message',
      DATE(p.CreatedAt) AS 'date',
      u.Name AS 'name'
    FROM post p
    INNER JOIN users u ON u.UserID = p.UserID
    WHERE u.UniqueId = ?
    ORDER BY p.CreatedAT DESC`, [user_id],
		(error, result) => {	
			if(error) {
				console.log(`Ha ocurrido un error: ${error.stack}`);
				reject();
			}

			resolve(result);
		});
	});
}

exports.getPostByDateTypeData = async (date) => {
  return new Promise( (resolve, reject) => {
    db.query(`SELECT p.PublicPath AS 'id',
      p.Title AS 'title',
      p.Message AS 'message',
      DATE(p.CreatedAt) AS 'date',
      u.Name AS 'name'
    FROM post p
    INNER JOIN users u ON u.UserID = p.UserID
    WHERE DATE(p.CreatedAt) = ?
    ORDER BY p.CreatedAT DESC`, [date],
    (error, result) => {
      if(error) {
        console.log(`Ha ocurrido un error: ${error.stack}`);
        reject();
      }

      resolve(result);
    });
  });
}

exports.getPostByDateData = async (user_id, date) => {
  return new Promise( (resolve, reject) => {
    db.query(`SELECT p.PublicPath AS 'id',
      p.Title AS 'title',
      p.Message AS 'message',
      DATE(p.CreatedAt) AS 'date'
    FROM post p
    INNER JOIN users u ON u.UserID = p.UserID
    WHERE u.UniqueId = ?
      AND DATE(p.CreatedAt) = ?`, [user_id, date],
    (error, result) => {
      if(error) {
        console.log(`Ha ocurrido un error: ${error.stack}`);
        reject();
      }

      resolve(result);
    });
  });
}

exports.getPostByTextData = async (user_id, text) => {
  return new Promise( (resolve, reject) => {
    db.query(`SELECT p.PublicPath AS 'id',
      p.Title AS 'title',
      p.Message AS 'message',
      DATE(p.CreatedAt) AS 'date',
      u.Name AS 'name'
    FROM post p
    INNER JOIN users u ON u.UserID = p.UserID
    WHERE (p.Title LIKE ? OR p.Message LIKE ?)`, [user_id, `%${text}%`, `%${text}%`],
    (error, result) => {
      if(error) {
        console.log(`Ha ocurrido un error: ${error.stack}`);
        reject();
      }

      resolve(result);
    });
  });
}

exports.getPostByIdData = async (id, post_id) => {
  return new Promise( (resolve, reject) => {
		db.query(`SELECT p.PublicPath AS 'id',
    p.Title AS 'title',
      p.Message AS 'message',
      DATE(p.CreatedAt) AS 'date'
  FROM post p
  INNER JOIN users u ON u.UserID = p.UserID
  WHERE u.UniqueId = ?
    AND p.PublicPath = ?`, [id, post_id],
		(error, result) => {	
			if(error) {
				console.log(`Ha ocurrido un error: ${error.stack}`);
				reject();
			}

			resolve(result[0]);
		});
	});
}

exports.getAllUserPostData = async () => {
  return new Promise( (resolve, reject) => {
		db.query(`SELECT p.PublicPath AS 'id',
      p.Title AS 'title',
      p.Message AS 'message',
      DATE(p.CreatedAt) AS 'date',
      u.Name AS 'name'
    FROM post p
    INNER JOIN users u ON u.UserID = p.UserID
    ORDER BY p.CreatedAT DESC`, [],
		(error, result) => {	
			if(error) {
				console.log(`Ha ocurrido un error: ${error.stack}`);
				reject();
			}

			resolve(result);
		});
	});
}