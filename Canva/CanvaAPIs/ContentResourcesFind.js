const User = require("../../models/user.model");

const isValidPostRequest = require("../ValidPostRequest");
const axios = require("axios");

const ContentResourceFind = async (request, response) => {
  try {
    const { data } = await axios.get("https://picsum.photos/v2/list");
    if (!isValidPostRequest(process.env.CLIENT_SECRET, request)) {
      response.sendStatus(401);
      return;
    }

    // console.log("request.body.user in ContentResourseFInd ", request.body.user);

    const user = await User.findOne({
      userID: request.body.user,
    });

    // console.log("user in ContentResourseFInd ", user);
    var condition = false;
    if (user == null) {
      response.status(200).send({
        type: "ERROR",
        errorCode: "CONFIGURATION_REQUIRED",
      });
    } else {
      var resources = data.map((resource, index) => {
        if (index < 2) {
          return {
            type: "IMAGE",
            id: resource.id,
            name: resource.author || resource.id,
            thumbnail: {
              url: resource.download_url,
            },
            url: resource.download_url,

            contentType: "image/jpeg",
          };
        }
      });
      resources = resources.filter((n) => n);
      response.status(200).send({
        type: "SUCCESS",
        resources,
      });
    }
  } catch (error) {
    console.log(error);
    response.send(error);
  }
};

module.exports = ContentResourceFind;
