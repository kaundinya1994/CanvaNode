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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFmZTMwNjVhLTNkODQtNGFmNy04OTM2LWIyMzExMDlhMDdmZSIsImlhdCI6MTY2Njg1OTExNSwiZXhwIjoxNjY2OTQ1NTE1fQ.Z2e3JHBPxEQ7eXxWFhL9yk_I5oGRArQDVt5KtjIegjE`,
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
