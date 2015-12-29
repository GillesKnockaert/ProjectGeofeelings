"use strict";

var config = {
    HOST: 'http://localhost',
    PORT: getEnv('PORT') || 3000,
    MONGODBURL : process.env.MONGO_URI || 'mongodb://fgryspee:geofeelings@ds034198.mongolab.com:34198/geofeelings',
    SECRET : 'geofeelingssecret'  //om JSON Web Tokens te maken en verifiëren
};

function getEnv(variable) {
    if (process.env[variable] === undefined) {
        if (variable == 'PORT') { return 1337 };
        console.log('You must create an environment variable for ' + variable);
    }
    return process.env[variable]; //of bvb. process.env.WEB_PORT
};

module.exports = config;