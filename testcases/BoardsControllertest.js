import Board from '../serv-dist/models/Board';
import app from '../serv-dist/workflow';
import chai from 'chai';
import chaiHttp from 'chai-http';
const should = chai.should();

chai.use(chaiHttp);

describe('Board', () => {
    let boardId;
    beforeEach((done) => {
        Board.remove({}, (err) => {
            done();
        });
    });

    describe('GET Boards', () => {
        it('it should get all the boards', (done) => {
            chai.request(app)
            .get('/api/v1/boards/asteria')
            .end((err,res) => {
                res.should.have.status(404);
                res.body.should.be.a('Object');
                res.body.should.have.property('status').eql('failure');
                done();
            });
        });
    });

    describe('POST Board', () => {
        it('it should insert board', (done) => {
            let board = {
                "boardName": "board",
                "user": "sid"
            };

            chai.request(app)
            .post('/api/v1/board/')
            .send(board)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('status').eql('success');
                let data = res.body;
                res.body.should.have.property('data');
                data.data.should.have.property('boardId');
                boardId = data.data.boardId;
                done();
            });
        });
    });

    describe('DELETE Board', () => {
        it('should delete board', (done) => {
            chai.request(app)
            .delete('/api/v1/board/' + boardId + '/')
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.have.property('status').eql('success');
                done();
            });
        });
    });
});
