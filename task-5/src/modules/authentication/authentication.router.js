const router = require('express').Router();
const asyncWrapper = require('../../utils/async-wrapper');
const authenticationController = require('./authentication.controller');

router.route('/login').post(asyncWrapper(authenticationController.signIn));

module.exports = router;
