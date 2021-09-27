const url = process.env.DB_URL;
const mongoose = require("mongoose");


const connect = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Database connected successfully..");
    } catch (err) {
        console.log(err.message)
        process.exit(1);
    }
}



module.exports = connect;