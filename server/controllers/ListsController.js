import HttpStatus from 'http-status';
import List from '../models/List';
import uuidv4 from 'uuid/v4';

export function createList (req, res) {
    let newList= new List();
    newList.listName= req.body.listName;
    newList.boardId= req.body.boardId;
    newList.listId= uuidv4();

    newList.save((err, saveRes) => {
        if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Unexpected error in saving list'
            });
        }
        if (saveRes) {
            res.status(HttpStatus.OK).json({
                status: 'success',
                code: HttpStatus.OK,
                data: newList
            });
        }
    });
}

export function deleteList (req, res) {
    let listId = req.params.listId;

    List.findOneAndRemove({ listId: listId }).exec( (err, deleteRes) => {
        if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Unexpected error in deleting list'
            });
        }
        if (deleteRes) {
            res.status(HttpStatus.OK).json({
                status: 'success',
                code: HttpStatus.OK,
                data: 'List deleted'
            });
        }
    });
}

export function getLists (req, res) {
    let boardId= req.params.boardId;

    List.find({boardId: boardId},{_id:0}).exec( (err, lists) => {
        if (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                status: 'failure',
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Unexpected error in getting lists'
            });
        }
        if (lists.length == 0) {
            res.status(HttpStatus.NOT_FOUND).json({
                status: 'failure',
                code: HttpStatus.NOT_FOUND,
                error: 'No list found'
            });
        }
        if (lists.length > 0) {
            res.status(HttpStatus.OK).json({
                status: 'success',
                code: HttpStatus.OK,
                data: lists
            });
        }
    });
}