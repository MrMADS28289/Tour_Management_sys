const mongoose = require("mongoose");

function dbConnect() {
  mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log('DB successfully connected!'.red.bold);
  })
}

module.exports = dbConnect;