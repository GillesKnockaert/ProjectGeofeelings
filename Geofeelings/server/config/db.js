/**
 * Created by Frederic on 7/12/2015.
 */
/*help manage our DB connections
* - helpt ons connecteren met de DB bij het opstarten
* - iedere controller kan gebruik maken van het db object die teruggeven wordt door de get methode
* */


var mongoose = require('mongoose'); //mongoDB driver


var state = {
    db: null
}

exports.url = 'mongodb://localhost:27017/geofeelings';
exports.testUrl = 'mongodb://localhost:27017/geofeelings_test';

exports.connect = function(url, done){
    //er is al een connectie met de DB (db != null)
    if(state.db){
        return done(); //geef geen fout terug
    }

    //er is nog geen connectie --> maak een nieuwe aan

    mongoose.connect(url, function(err, db){
        if (err) return done(err);

        state.db = db;
        done();
    });
}

exports.get = function(){
    return state.db;
}

exports.close = function(done){
    if(state.db){
        state.db.close(function(err, result){
            state.db = null;
            state.mode = null;
            done(err);
        });
    }
}

