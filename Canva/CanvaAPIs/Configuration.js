const isValidPostRequest = require("../ValidPostRequest");

const Configuration = async (request, response) => {
  try {
    if (!isValidPostRequest(process.env.CLIENT_SECRET, request)) {
      response.sendStatus(401);
      return;
    }

    response.status(200).send({
      type: "SUCCESS",
      labels: ["CONTENT"],
    });
  } catch (error) {
    console.log(error);
    response.send(error);
  }
};

module.exports = Configuration;
