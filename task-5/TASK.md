## Task 5. Authentication and JWT

1. `POST /users` should accept **password** field and before save replace it with hash (use [bcrypt package](https://www.npmjs.com/package/bcrypt)).
2. Add a `POST /login` method which accepts json with login and password and should return **JWT** token (use [jsonwebtoken package](https://www.npmjs.com/package/jsonwebtoken)).
3. JWT token should contain **userId** and **login** in a payload.
4. Secret that used for signing the token should be stored in `.env` file
5. For all client requests the JWT token should be added in HTTP **Authorization** header to all requests that requires authentication. HTTP authentication must follow `Bearer` scheme, e.g.:
  ```
  Authorization: Bearer <jwt_token>
  ```
6. Add a middleware which will proxy all the requests (except `/login`) and check that HTTP **Authorization** header has the correct value of **JWT** token.
7. In case of the HTTP **Authorization** header in the request is absent or invalid or doesn’t follow `Bearer` scheme, the middleware should stop further router method execution and return HTTP **401** code (Unauthorized error) and the corresponding error message.
8. **Add admin user to DB** on service start with login=admin and password=admin.

### `bcrypt` installation issues:

#### If you see an error that starts with:

```console
gyp ERR! stack Error: "pre" versions of node cannot be installed, use the --nodedir flag instead
```
Please check [compatibility between Node.JS and Bcrypt versions](https://www.npmjs.com/package/bcrypt#version-compatibility).

#### If you face an error like this:

```console
node-pre-gyp ERR! Tried to download(404): https://github.com/kelektiv/node.bcrypt.js/releases/download/v1.0.2/bcrypt_lib-v1.0.2-node-v48-linux-x64.tar.gz
```

Make sure you have the appropriate dependencies installed and configured for your platform. You can find installation instructions for the dependencies for some common platforms in [this page](https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions).