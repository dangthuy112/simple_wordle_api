const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL), {
            useUnifiedTopology: true,
            newUrlParser: true
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;