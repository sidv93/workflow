import HttpStatus from 'http-status';
import Card from '../models/Card';
import uuidv4 from 'uuid/v4';

export function createCard(req, res) {
    let reqBody = req.body;

    if (reqBody.cardData && reqBody.listId) {
        let newCard = new Card();
        newCard.cardData = reqBody.cardData;
        newCard.cardId = uuidv4();
        newCard.listId = reqBody.listId;

        newCard.save((err, saveRes) => {
            if (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    status: 'failure',
                    code: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Unexpected error in saving card'
                });
            }
            if (saveRes) {
                res.status(HttpStatus.OK).json({
                    status: 'success',
                    code: HttpStatus.OK,
                    data: newCard
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

export function deleteCard(req, res) {
    let cardId = req.params.cardId;

    if (cardId) {
        Card.findOneAndRemove({ cardId: cardId }).exec((err, deleteRes) => {
            if (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    status: 'failure',
                    code: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Unexpected error in deleting card'
                });
            }
            if (deleteRes) {
                res.status(HttpStatus.OK).json({
                    status: 'success',
                    code: HttpStatus.OK,
                    data: 'Card deleted'
                });
            }
        });
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({
            status: 'failure',
            code: HttpStatus.BAD_REQUEST,
            error: 'Params missing'
        })
    }
}

export function updateCard(req, res) {
    let updateString = req.body.cardData;
    let cardId = req.params.cardId;

    if (cardId && updateString) {
        Card.findOneAndUpdate({ cardId: cardId }, { cardData: updateString, updatedAt: Date.now() }, { new: true }).exec((err, card) => {
            if (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    status: 'failure',
                    code: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Unexpected error in getting card'
                });
            }
            if (!card) {
                res.status(HttpStatus.NOT_FOUND).json({
                    status: 'failure',
                    code: HttpStatus.NOT_FOUND,
                    error: 'No card found'
                });
            }
            if (card) {
                res.status(HttpStatus.OK).json({
                    status: 'success',
                    code: HttpStatus.OK,
                    data: 'Card updated successfully'
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

export function getCards(req, res) {
    let listId = req.params.listId;
    if (listId) {
        Card.find({ listId: listId }, { _id: 0 }).exec((err, cards) => {
            if (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    status: 'failure',
                    code: HttpStatus.INTERNAL_SERVER_ERROR,
                    error: 'Unexpected error in getting cards'
                });
            }
            if (!cards.length) {
                res.status(HttpStatus.NOT_FOUND).json({
                    status: 'failure',
                    code: HttpStatus.NOT_FOUND,
                    error: 'No card found'
                });
            }
            if (cards.length) {
                res.status(HttpStatus.OK).json({
                    status: 'success',
                    code: HttpStatus.OK,
                    data: cards
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