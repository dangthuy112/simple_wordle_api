const allowedOrigins = require('./allowedOrigins');

const corsOption = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('not allowed by cors'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOption