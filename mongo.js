const mongoose = require('mongoose');
require('dotenv').config();

const mongoPath = `mongodb+srv://James:CzGMTANN3vesBFy6@cluster0.cmjrx.mongodb.net/Main_Data?retryWrites=true&w=majority`

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).catch((err) => {
        console.log(err);
      })
    return mongoose
}