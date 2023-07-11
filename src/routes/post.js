const middleware = require('../middleware/middleware');
const express = require('express');
const router = express.Router();

const post = require('../controllers/post');

router.post('/', middleware.authToken, post.createPost);
router.get('/', middleware.authToken, post.getAllPost);
router.get('/date/:date', middleware.authToken, post.getPostByDate);
router.get('/:id', middleware.authToken, post.getPostById);

/*
router.get('/', invoice.getAllInvoice);
router.get('/retrieve/:id', invoice.getInvoice);
router.post('/', upload.single('file'), invoice.setInvoice);
router.post('/sync', invoice.updateSyncInvoice);
router.get('/sync', invoice.getInvoiceSync);
*/

module.exports = router;
