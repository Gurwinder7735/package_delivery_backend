const router = require('express').Router();
const { handleLogin } = require('../../controllers/admin/auth');

router.post('/login', handleLogin)

module.exports = router;

