const router = require('express').Router();
const { signIn } = require('./auth.controller');

router.route('/login').post(signIn);

module.exports = router;
