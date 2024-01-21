const mongoose = require('mongoose');

const URL = 'mongodb://localhost:27017/MessengerDB';

module.exports = {
    connectToDb: (cb) => {
        mongoose.connect(URL)
            .then(() => {
                console.log('Connected to MongoDB');
                return cb();
            })
            .catch((err) => {
                return cb(err);
            });
    },
    disconnectDb: () => {
        mongoose.disconnect((err) => {
            if (err) {
                console.error('Error disconnecting from MongoDB:', err);
            } else {
                console.log('Disconnected from MongoDB');
            }
        });
    },
    getDb: () => mongoose.connection,
};