const isValidPostRequest = require("../ValidPostRequest");
const axios = require("axios");

const contentResourceFind = async (request, response) => {
  try {
    const { data } = await axios.get("https://picsum.photos/v2/list");
    if (!isValidPostRequest(process.env.CLIENT_SECRET, request)) {
      response.sendStatus(401);
      return;
    }

    var resources = data.map((resource, index) => {
      if (index < 2) {
        console.log("resource.download_url ", resource.download_url);
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
    console.log(resources);
    response.status(200).send({
      type: "SUCCESS",
      resources,
    });
  } catch (error) {
    console.log(error);
    response.send(error);
  }
};

module.exports = contentResourceFind;
