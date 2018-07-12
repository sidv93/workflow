import * as BoardsController from '../controllers/BoardsController';
import * as AuthController from '../controllers/AuthenticationController';
import * as CardController from '../controllers/CardsController';
import * as ListController from '../controllers/ListsController';
import express from 'express';
// var BoardsController = require('../controllers/BoardsController');
// var AuthController = require('../controllers/AuthenticationController');
// var CardController = require('../controllers/CardsController');
// var ListController= require('../controllers/ListsController');
// var express = require('express');
const router = express.Router();

/* Login API */
router.post('/api/v1/user/login/', AuthController.authenticate);
/* Boards api listing. */
router.get('/api/v1/boards/:userId/', BoardsController.getAllBoardsForAUser);
router.delete('/api/v1/board/:boardId/', BoardsController.deleteBoard);
router.post('/api/v1/board/', BoardsController.createBoard);

/* Cards api listing */
router.get('/api/v1/cards/:listId', CardController.getCards);
router.post('/api/v1/card/', CardController.createCard);
router.delete('/api/v1/card/:cardId/', CardController.deleteCard);
router.put('/api/v1/card/:cardId', CardController.updateCard);

/* Lists api listing */
router.get('/api/v1/lists/:boardId', ListController.getLists);
router.post('/api/v1/list', ListController.createList);
router.delete('/api/v1/list/:listId/', ListController.deleteList);

module.exports = router;