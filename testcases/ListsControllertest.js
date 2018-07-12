import List from '../serv-dist/models/List';
import Board from '../serv-dist/models/Board';
import app from '../serv-dist/workflow';
import uuid from 'uuid/v4';
import chai from 'chai';
import chaiHttp from 'chai-http';
const should = chai.should();

chai.use(chaiHttp);

describe('List', () => {
    let boardId;
    let listId;
    beforeEach((done) => {
        let board =new Board();
        board.boardName= "board";
        board.user = "sid";
        board.date = Date.now();
        board.boardId = uuid();
        boardId = board.boardId;
        board.save();
        done();
    });

    describe('GET Lists', () => {
        it('List GET',(done) => {
            chai.request(app)
            .get('/api/v1/lists/' + boardId + '/')
            .end((err, res) => {
                console.log('body=' + JSON.stringify(res.body));
                res.should.have.status(404);
                res.body.should.be.a('Object');
                res.body.should.have.property('status').eql('failure');
                done();
            });
        });
    });

    describe('POST Lists', () => {
        it('should create lists', (done)=> {
            let list = {
                "boardId": boardId,
                "listName": "list1"
            };
            chai.request(app)
            .post('/api/v1/list')
            .send(list)
            .end((err,res) => {
                console.log("Body=" + JSON.stringify(res.body));
                res.should.have.status(200);
                res.body.data.should.have.property('listId');
                listId = res.body.data.listId;
                done();
            });
        });
    });

    describe('DELETE Lists', () => {
        it('should delete lists', (done) => {

            chai.request(app)
            .delete('/api/v1/list/' + listId)
            .end((err,res) => {
                console.log("Del body=" + JSON.stringify(res.body));
                res.should.have.status(200);
                res.body.should.have.property('status').eql('success');
                done();
            });
        });
    });
});