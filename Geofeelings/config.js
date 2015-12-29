"use strict";

var config = {
    HOST: 'http://localhost',
    PORT: getEnv('PORT') || 3000,
    MONGODBURL : setMongoDbUrl(getEnv('NODE_ENV')),
    SECRET : 'geofeelingssecret'  //om JSON Web Tokens te maken en verifi�ren
};

function getEnv(variable) {
    if (process.env[variable] === undefined) {
        if (variable == 'PORT') { return 1337 };
        if (variable == 'NODE_ENV') { return 'production' };

        console.log('You must create an environment variable for ' + variable);
    }
    return process.env[variable]; //of bvb. process.env.WEB_PORT
};


function setMongoDbUrl(nodeEnv){
    if (nodeEnv == 'production'){
        return  process.env.MONGO_URI || "mongodb://fgryspee:geofeelings@ds034198.mongolab.com:34198/geofeelings";
    } else {
        return process.env.MONGO_LOCAL;
    }
}

module.exports = config;