const jwt = require('jsonwebtoken');
const post = require('../services/post');

module.exports.createPost = async (req, res) => {
  const { id } = jwt.decode(req.headers['token']);

  try {
    const data = await post.createPost(id, req.body);
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

module.exports.getAllPost = async (req, res) => {
  const { id } = jwt.decode(req.headers['token']);

  try {
    const data = await post.getAllPost(id);
    res.send({
      "success": true,
      "data": data
    });
  }
  catch (error) {
    res.send({
      "success": false,
      "message": error
    });
  }
}

module.exports.getPostByDate = async (req, res) => {
  const { id } = jwt.decode(req.headers['token']);
  const date = req.params.date;

  try {
    const data = await post.getPostByDate(id, date);
    res.send({
      "success": true,
      "data": data
    });
  }
  catch (error) {
    res.send({
      "success": false,
      "message": error
    });
  }
}

module.exports.getPostById = async (req, res) => {
  const { id } = jwt.decode(req.headers['token']);
  const post_id = req.params.id;

  try {
    const data = await post.getPostById(id, post_id);
    res.send({
      "success": true,
      "data": data
    });
  }
  catch (error) {
    res.send({
      "success": false,
      "message": error
    });
  }
}