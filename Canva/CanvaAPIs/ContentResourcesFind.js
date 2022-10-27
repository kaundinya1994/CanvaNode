const axios = require("axios");
const isValidPostRequest = require("../ValidPostRequest");
const GetAllAlbums = require("../DamAPIs/GetAllAlbums");

const User = require("../../models/user.model");

const ContentResourceFind = async (request, response) => {
  try {
    if (!isValidPostRequest(process.env.CLIENT_SECRET, request)) {
      response.sendStatus(401);
      return;
    }

    var albumnData;
    GetAllAlbums().then((data) => {
      albumnData = data;
    });

    const user = await User.findOne({
      userID: request.body.user,
    });

    // console.log("user in ContentResourseFInd ", user);
    if (user == null) {
      response.status(200).send({
        type: "ERROR",
        errorCode: "CONFIGURATION_REQUIRED",
      });
    } else {
      // ======================= Container implementation =======================
      const { data } = await axios.get("https://picsum.photos/v2/list");

      console.log("request.body.containerId ", request.body.containerId);
      console.log("request.body.types ", request.body.types);
      if (request.body.types.includes("CONTAINER")) {
        // The user has opened a container
        if (request.body.containerId) {
          response.send({
            type: "SUCCESS",
            resources: [],
          });
        }

        // The user has not opened a container
        if (!request.body.containerId) {
          response.send({
            type: "SUCCESS",
            resources: albumnData,
          });
        }
      }

      // ======================= Container implementation =======================

      // ======================= Image implementation =======================
      else if (request.body.types.includes("IMAGE")) {
        if (request.body.containerId) {
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

                // Working URLS
                // url: resource.download_url, -- https://picsum.photos/id/0/5616/3744
                // url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqsELENQOeaui5xm9XJwTdd3wHHO9BxPvb_Q&usqp=CAU",
                contentType: "image/jpeg",
              };
            }
          });
          resources = resources.filter((n) => n);
          response.status(200).send({
            type: "SUCCESS",
            resources,
          });
        } else {
          response.status(200).send({
            type: "SUCCESS",
            resources: [],
          });
        }
      }
      // ======================= Image implementation =======================
    }
  } catch (error) {
    console.log(error);
    response.send(error);
  }
};

module.exports = ContentResourceFind;
