const dbConnection = () => {
  const mongoose = require("mongoose");

  mongoose.connect(
    `mongodb+srv://admin:passcode@cluster0.7xmzazu.mongodb.net/?retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
  );

  mongoose.connection
    .once("open", function () {
      console.log("Conection has been made!");
    })
    .on("error", function (error) {
      console.log("Error is: ", error);
    });
};


module.exports = dbConnection