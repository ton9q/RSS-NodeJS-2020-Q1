import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

/**
 * Config for all modules
 *
 * @export
 * @interface Env
 */
export interface IEnv {
  PORT: string;
  NODE_ENV: string;
  MONGO_CONNECTION_STRING: string;
  JWT_SECRET_KEY: string;
  JWT_ACCESS_TOKEN_EXPIRES: string;
  AUTH_MODE: boolean;
}

const env: IEnv = {
  PORT: process.env['PORT'] || '4000',
  NODE_ENV: process.env['NODE_ENV'] || 'development',
  MONGO_CONNECTION_STRING:
    process.env['MONGO_CONNECTION_STRING'] || 'mongodb://localhost:27017/rss-nodejs',
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'] || 'jwt-secret',
  JWT_ACCESS_TOKEN_EXPIRES: process.env['JWT_ACCESS_TOKEN_EXPIRES'] || '5m',
  AUTH_MODE: process.env['AUTH_MODE'] === 'true',
};

export default env;
