// [
//     {
//       type: "CONTAINER",
//       id: "animals",
//       name: "Animals",
//     },
//     {
//       type: "CONTAINER",
//       id: "food",
//       name: "Food",
//     },
//     {
//       type: "CONTAINER",
//       id: "people",
//       name: "People",
//     },
//   ],
const axios = require("axios");

const GetAllAlbums = async () => {
  try {
    var albumnForCanvaContainer = [];
    let data = {
      accessType: "Restricted",
    };
    const options = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.BEARER}`,
      },
    };
    let res = await axios.post(
      process.env.REACT_APP_URL + "/album/all",
      data,
      options
    );
    console.log("GetAllAlbums res ", res.data.data);
    if (res.status == 200 && res.data?.data) {
      // console.log(res.data.data);

      res.data.data.map((albumnInfo) => {
        albumnForCanvaContainer.push({
          type: "CONTAINER",
          id: albumnInfo.id,
          name: albumnInfo.name,
        });
      });
    }

    return albumnForCanvaContainer;
  } catch (err) {
    console.log(err);
  }
};

module.exports = GetAllAlbums;
