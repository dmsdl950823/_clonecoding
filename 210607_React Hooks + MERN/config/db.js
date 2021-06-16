// connect database
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
    } catch (error) {
        console.log(`Error @connectDB: ${error}`.red);
        process.exit(1); // shut down app
    }
}


module.exports = connectDB