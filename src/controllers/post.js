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
  const  {date, type} = req.params;

  try {
    const data = await post.getPostByDate(id, date, type);
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

module.exports.getPostByText = async (req, res) => {
  const { id } = jwt.decode(req.headers['token']);
  const text = req.params.text;

  try {
    const data = await post.getPostByText(id, text);
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

module.exports.getAllUserPost = async (req, res) => {
  const { id } = jwt.decode(req.headers['token']);

  try {
    const data = await post.getAllUserPost();
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