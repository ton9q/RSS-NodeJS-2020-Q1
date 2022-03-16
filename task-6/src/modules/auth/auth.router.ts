import { Router } from 'express';
import { signIn, signOut, getNewAccessToken, deleteRefreshToken } from './auth.controller';
import { ensureAuthorization } from './auth.middleware';

const router = Router();

router.route('/login').post(signIn);

router.route('/logout').post(ensureAuthorization, signOut);

router.route('/token').get(ensureAuthorization, getNewAccessToken);

router.route('/token/reject').post(ensureAuthorization, deleteRefreshToken);

export { router };
