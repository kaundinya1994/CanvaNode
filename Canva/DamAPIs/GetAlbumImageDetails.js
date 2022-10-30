// {
//     type: "IMAGE",
//     id: resource.id,
//     name: resource.author || resource.id,
//     thumbnail: {
//       url: "https://uat.media.officebanao.com/albums/1666256189835-a7276a5b-0745-4742-be39-d75803512515-image%20(10).jpg",
//     },
//     url: "https://uat.media.officebanao.com/albums/1666256189835-a7276a5b-0745-4742-be39-d75803512515-image%20(10).jpg",

//     contentType: "image/jpeg",
//   };

const axios = require("axios");

const GetAlbumImageDetails = async (albumnID) => {
  try {
    var albumnImagesForCanvaContainer = [];
    let data = {
      accessType: "Restricted",
    };
    const options = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.BEARER}`,
      },
    };
    let resData = await axios.get(
      process.env.REACT_APP_URL + `/album/${albumnID}/detail`,
      options
    );

    // console.log(
    //   "resData.data.data.images.damImages ",
    //   resData.data.data.images.damImages
    // );
    if (resData.status == 200 && resData.data?.data) {
      resData.data.data.images.damImages.map((imageInfo) => {
        albumnImagesForCanvaContainer.push({
          type: "IMAGE",
          id: imageInfo.id,
          name: imageInfo.name,
          thumbnail: {
            url: imageInfo.sizes.url,
          },
          url: imageInfo.sizes.url,

          contentType: "image/jpeg",
        });
      });
    }

    return albumnImagesForCanvaContainer;
  } catch (err) {
    console.log(err);
  }
};

module.exports = GetAlbumImageDetails;
