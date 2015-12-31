var should = require('should');
var sinon = require('sinon');

describe('User Controller Tests:', function(){
    describe('Post', function(){
        it('should not allow an empty user name on post', function(){
            var User = function(user){this.save = function(){}};

            var req = {
                body: {
                    password: '12345',
                    email: 'Frederic@gmail.com'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var userController = require('../../server/controllers/userController')(User);

            userController.postUser(req,res);

            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('Name is required').should.equal(true);
        });

        it('should not allow an empty user email on post', function(){
            var User = function(user){this.save = function(){}};

            var req = {
                body: {
                    name: 'Frederic',
                    password: '12345'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var userController = require('../../server/controllers/userController')(User);

            userController.postUser(req,res);

            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('Email is required').should.equal(true);
        });

    });
});