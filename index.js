const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const querystring = require("querystring");

dotenv.config();

const dbConn = require("./DB/dbConnection");
const Register = require("./APIs/Register");
const Login = require("./APIs/Login");

const ContentResourcesFind = require("./Canva/CanvaAPIs/ContentResourcesFind");
const Configuration = require("./Canva/CanvaAPIs/Configuration");
const ConfigurationDelete = require("./Canva/CanvaAPIs/ConfigurationDelete");
const isValidGetRequest = require("./Canva/ValidGetRequest");
const { request } = require("http");
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

dbConn();

app.get("/", (request, response) => {
  console.log("request.query ", request.query);
  if (!isValidGetRequest(process.env.CLIENT_SECRET, request)) {
    response.sendStatus(401);
    return;
  }


  response.redirect(
    302,
    `https://silver-bavarois-1eda0d.netlify.app${request.url}`
  );
});

// ------------------------ Register and Login API ------------------------ //
app.post("/api/register", Register);
app.post("/api/login", Login);
// ------------------------ Register and Login API ------------------------ //

// ------------------------ Canva API ------------------------ //

app.post("/content/resources/find", ContentResourcesFind);
app.post("/configuration", Configuration);
app.post("/configuration/delete", ConfigurationDelete);

// ------------------------ Canva API ------------------------ //

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
