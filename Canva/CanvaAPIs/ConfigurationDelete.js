const isValidPostRequest = require("../ValidPostRequest");
const User = require("../../models/user.model");
const Configuration = async (request, response) => {
  try {
    if (!isValidPostRequest(process.env.CLIENT_SECRET, request)) {
      response.sendStatus(401);
      return;
    }

    const user = await User.findOne({
      userID: request.body.user,
    });

    if (user) {
      await User.updateOne({ email: user.email }, { $set: { userID: null } });
      response.status(200).send({
        type: "SUCCESS",
      });
    } else {
      response.status(200).send({
        type: "ERROR",
        errorCode: "CONFIGURATION_REQUIRED",
      });
    }
  } catch (error) {
    response.status(200).send({
      type: "ERROR",
      errorCode: "FORBIDDEN",
    });
  }
};

module.exports = Configuration;
