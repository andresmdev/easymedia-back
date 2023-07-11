const middleware = require('../middleware/middleware');
const express = require('express');
const router = express.Router();

const auth  = require('../controllers/auth');

router.get('/session', middleware.checkSession);
router.post('/register', auth.registerUser);
router.post('/login', auth.userLogin);

module.exports = router;
