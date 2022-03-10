const router = require('express').Router();
const { signIn, signOut, getNewAccessToken, deleteRefreshToken } = require('./auth.controller');
const { ensureAuthorization } = require('./auth.middleware');

router.route('/login').post(signIn);

router.route('/logout').post(ensureAuthorization, signOut);

router.route('/token').get(ensureAuthorization, getNewAccessToken);

router.route('/token/reject').post(ensureAuthorization, deleteRefreshToken);

module.exports = router;
