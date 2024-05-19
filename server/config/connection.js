const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    tlsAllowInvalidCertificates: true, // Use this only if you face certificate issues
};

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/irl', options)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process with an error code
    });

module.exports = mongoose.connection;
