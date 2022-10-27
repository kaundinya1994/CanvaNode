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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlhMGRhNTg3LTU3NDAtNGM3YS04ZGMwLTQyYWE3ZWY5OGMyZCIsImlhdCI6MTY2Njg3MTU3MiwiZXhwIjoxNjY2OTU3OTcyfQ.usIaOxzyz2XEVDgiiMUH8uj2Pv-sXana5XRnVcFOEOU`,
      },
    };
    let res = await axios.post(
      process.env.REACT_APP_URL + "/album/all",
      data,
      options
    );
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
