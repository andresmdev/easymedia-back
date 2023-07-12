const post = require('../models/post');

exports.createPost = async (user_id, data) => {
  const { title, message } = data;

  if(!title) {
    throw "TITLE_REQUIRED";
  }

  if(!message) {
    throw "MESSAGE_REQUIRED";
  }
  
  console.log("USER_ID ===>", user_id)

  const titleSlug = title.replace(/\s+/g, '-').toLowerCase();

  const result = await post.createPostData(user_id, titleSlug, title, message);

  if(!result) {
    throw "SYSTEM_ERROR";
  }
  else {
    return "POST_CREATED";
  }
}

exports.getAllPost = async (user_id) => {
  const result = await post.getAllPostData(user_id);

  if(!result) {
    throw "SYSTEM_ERROR";
  }
  else {
    return result;
  }
}

exports.getPostByDate = async (user_id, date, type) => {
  var result = [];

  if(type === "all") {
    result = await post.getPostByDateTypeData(date);
  }
  else {
    result = await post.getPostByDateData(user_id, date);
  }

  if(!result) {
    throw "SYSTEM_ERROR";
  }
  else {
    return result;
  }
}

exports.getPostByText = async (user_id, text) => {
  const result = await post.getPostByTextData(user_id, text);

  if(!result) {
    throw "SYSTEM_ERROR";
  }
  else {
    return result;
  }
}

exports.getAllUserPost = async () => {
  const result = await post.getAllUserPostData();

  if(!result) {
    throw "SYSTEM_ERROR";
  }
  else {
    return result;
  }
}

exports.getPostById = async (id, post_id) => {
  const result = await post.getPostByIdData(id, post_id);

  if(!result) {
    throw "SYSTEM_ERROR";
  }
  else {
    return result;
  }
}

