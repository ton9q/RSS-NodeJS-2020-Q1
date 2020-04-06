const router = require('express').Router();
const boardsService = require('./board.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    await res.json(boards);
  })
  .post(async (req, res) => {
    const newBoard = await boardsService.add(req.body);
    await res.json(newBoard);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const boardId = req.params.id;
    const board = await boardsService.getById(boardId);
    if (board) {
      await res.json(board);
    } else {
      await res.status(404).send({ message: `Board[id="${boardId}"] not found` });
    }
  })
  .put(async (req, res) => {
    const updatedBoard = await boardsService.updateById(req.params.id, req.body);
    await res.json(updatedBoard);
  })
  .delete(async (req, res) => {
    const boardId = req.params.id;
    const deletedBoard = await boardsService.deleteById(boardId);
    if (deletedBoard) {
      await res.status(204).json({ message: `Board[id="${boardId}"] was deleted` });
    } else {
      await res.status(404).send({ message: `Board[id="${boardId}"] not found` });
    }
  });

module.exports = router;
