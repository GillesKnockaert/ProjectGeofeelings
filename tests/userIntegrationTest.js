/**
 * Created by Frederic on 15/12/2015.
 */
var should = require('should');
var request = require('supertest');
var app = ('../server.js');

//var mongoose = require('mongoose');
//var User = mongoose.model('User');
var User = require('../server/models/user');
var agent = request.agent(app);

describe('User CRUD Test', function(){
    it('Should allow a user to be posted and return an _id', function(done){
        var userPost = {name: 'TestUser', password: 'test', email: 'TestUser@Test.com'};

        agent.post('/api/users')
            .send(userPost)
            .expect(200)
            .end(function(err, results){

                if(err){
                    console.log(err);
                }

                results.body.should.have.property('_id');
                done(); //laat supertest weten dat de test gedaan is
            });

    });

    afterEach(function(done){
        User.remove().exec();
        done();
    });
});