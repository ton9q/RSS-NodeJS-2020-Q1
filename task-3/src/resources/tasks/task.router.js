const router = require('express').Router();
const tasksService = require('./task.service');

router
  .route('/:boardId/tasks')
  .get(async (req, res) => {
    const tasks = await tasksService.getAllByBoardId(req.params.boardId);
    await res.json(tasks);
  })
  .post(async (req, res) => {
    const newTask = await tasksService.add(req.params.boardId, req.body);
    await res.json(newTask);
  });

router
  .route('/:boardId/tasks/:taskId')
  .get(async (req, res) => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.getById(boardId, taskId);
    if (task) {
      await res.json(task);
    } else {
      await res
        .status(404)
        .send({ message: `Task[id="${taskId}"] for Board[id="${boardId}"] not found` });
    }
  })
  .put(async (req, res) => {
    const { boardId, taskId } = req.params;
    const updatedTask = await tasksService.updateById(boardId, taskId, req.body);
    await res.json(updatedTask);
  })
  .delete(async (req, res) => {
    const { boardId, taskId } = req.params;
    const deletedTask = await tasksService.deleteById(boardId, taskId);
    if (deletedTask) {
      await res
        .status(204)
        .json({ message: `Task[id="${taskId}"] for Board[id="${boardId}"] was deleted` });
    } else {
      await res
        .status(404)
        .send({ message: `Task[id="${taskId}"] for Board[id="${boardId}"] not found` });
    }
  });

module.exports = router;
