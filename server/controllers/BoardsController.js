import HttpStatus from 'http-status';
import Board from '../models/Board';
import uuidv4 from 'uuid/v4';

export function getAllBoardsForAUser(req, res) {
    let userId = req.params.userId;

    if (userId) {
        Board.find({ user: userId }, { _id: 0 }).exec((err, boards) => {
            if (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    status: 'failure',
                    code: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Unexpected error in getting boards'
                });
            }
            if (boards.length == 0) {
                res.status(HttpStatus.NOT_FOUND).json({
                    status: 'failure',
                    code: HttpStatus.NOT_FOUND,
                    error: 'No boards found'
                });
            }
            if (boards.length > 0) {
                res.status(HttpStatus.OK).json({
                    status: 'success',
                    code: HttpStatus.OK,
                    data: boards
                });
            }
        });
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({
            status: 'failure',
            code: HttpStatus.BAD_REQUEST,
            error: 'UserId missing'
        });
    }
}

export function createBoard(req, res) {
    let reqBody = req.body;

    if (reqBody.boardName && reqBody.user) {
        let newBoard = new Board();
        newBoard.boardName = reqBody.boardName;
        newBoard.boardId = uuidv4();
        newBoard.user = reqBody.user;
        newBoard.date = Date.now();

        newBoard.save((err, saveRes) => {
            if (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    status: 'failure',
                    code: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Unexpected error in creating board'
                });
            }
            if (saveRes) {
                res.status(HttpStatus.OK).json({
                    status: 'success',
                    code: HttpStatus.OK,
                    data: newBoard
                });
            }
        });
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({
            status: 'failure',
            code: HttpStatus.BAD_REQUEST,
            error: 'Params missing'
        });
    }
}

export function deleteBoard(req, res) {
    let boardId = req.params.boardId;

    if (boardId) {
        Board.findOneAndRemove({ boardId: boardId }).exec((err, deleteRes) => {
            if (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    status: 'failure',
                    code: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Unexpected error in getting board'
                });
            }
            if (deleteRes) {
                res.status(HttpStatus.OK).json({
                    status: 'success',
                    code: HttpStatus.OK,
                    data: 'Board deleted'
                });
            }
        });
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({
            status: 'failure',
            code: HttpStatus.BAD_REQUEST,
            error: 'BoardId missing'
        });
    }
}