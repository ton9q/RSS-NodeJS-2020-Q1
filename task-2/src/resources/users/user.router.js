const router = require('express').Router();
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    await res.json(users);
  })
  .post(async (req, res) => {
    const newUser = await usersService.add(req.body);
    await res.json(newUser);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const userId = req.params.id;
    const user = await usersService.getById(userId);
    if (user) {
      await res.json(user);
    } else {
      await res.status(404).send({ message: `User[id="${userId}"] not found` });
    }
  })
  .put(async (req, res) => {
    const updatedUser = await usersService.updateById(req.params.id, req.body);
    await res.json(updatedUser);
  })
  .delete(async (req, res) => {
    const userId = req.params.id;
    const deletedUser = await usersService.deleteById(userId);
    if (deletedUser) {
      await res.status(204).json({ message: `User[id="${userId}"] was deleted` });
    } else {
      await res.status(404).send({ message: `User[id="${userId}"] not found` });
    }
  });

module.exports = router;
