const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const querystring = require("querystring");
const isValidGetRequest = require("../Canva/ValidGetRequest");

const Login = async (request, response) => {
  // if (!isValidGetRequest(process.env.CLIENT_SECRET, request)) {
  //   response.sendStatus(401);
  //   return;
  // }

  var user = await User.findOne({
    email: request.body.email,
  });

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    request.body.password,
    user.password
  );

  if (isPasswordValid) {
    // console.log(request.body.userID);

    await User.updateOne(
      { email: request.body.email },
      { $set: { userID: request.body.userID } }
    );

    const user = await User.findOne({
      email: request.body.email,
    });

    // console.log("user in Login", user);

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );

    // console.log("request.query ", request.query);
    // Construct query parameters for redirect back to Canva
    const params = querystring.stringify({
      success: true,
      state: request.body.state,
    });
    // if (isPasswordValid) {
    //   response.redirect(302, `https://canva.com/apps/configured?${params}`);
    // }

    return response.json({
      status: "Login success and UserID updated",
      user: token,
    });
  } else {
    return response.json({ status: "error", user: false });
  }
};

module.exports = Login;
