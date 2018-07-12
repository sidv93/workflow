import List from '../serv-dist/models/List';
import Card from '../serv-dist/models/Card';
import app from '../serv-dist/workflow';
import uuid from 'uuid/v4';
import chai from 'chai';
import chaiHttp from 'chai-http';
const should = chai.should();

chai.use(chaiHttp);

describe('CARD', () => {
    let cardId;
    let listId;
    beforeEach((done) => {
        let list  = new List();
        list.boardId = "2183819b-9f7f-4793-9b56-194405c26c2c";
        list.listId = uuid();
        listId= list.listId;
        list.listName = "listSid";
        list.save();
        done();
    });

    describe('Card GET', () => {
        it('should get all the cards', (done)=> {
            chai.request(app)
            .get('/api/v1/cards/' + listId)
            .end((err,res) => {
                res.should.have.status(404);
                res.body.should.have.property('status').eql('failure');
                done();
            });
        });
    });

    describe('Card POST', () => {
        it('should create a card', (done) => {
            let card = {
                "cardData": "sidCard",
                "listId": listId
            };
            chai.request(app)
            .post('/api/v1/card/')
            .send(card)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.data.should.have.property('cardId');
                cardId = res.body.data.cardId;
                done();
            });
        });
    });

    describe('Card PUT', () => {
        it('should edit card', (done) => {
            let card = {
                "cardData": "cardsSid"
            };
            chai.request(app)
            .put('/api/v1/card/' + cardId)
            .send(card)
            .end((err, res) => {
                console.log('put red=' + JSON.stringify(res.body));
                res.should.have.status(200);
                res.body.should.have.property('status').eql('success');
                done();
            });
        });
    });

    describe('Card DELETE', () => {
        it('should delete Card', (done)=> {
            chai.request(app)
            .delete('/api/v1/card/' + cardId + '/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('status').eql('success');
                res.body.should.have.property('data').eql('Card deleted');
                done();
            });
        });
    });
});