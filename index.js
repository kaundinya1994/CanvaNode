const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const dbConn = require("./DB/dbConnection");
const Register = require("./APIs/Register");
const Login = require("./APIs/Login");

const ContentResourcesFind = require("./Canva/CanvaAPIs/ContentResourcesFind");

app.use(cors());
app.use(express.json());

dbConn();

app.get("/", (req, res) => {
  res.send("test working");
});

// ------------------------ Register and Login API ------------------------ //
app.post("/api/register", Register);
app.post("/api/login", Login);
// ------------------------ Register and Login API ------------------------ //

// ------------------------ Canva API ------------------------ //

app.post("/content/resources/find", ContentResourcesFind);

// ------------------------ Canva API ------------------------ //

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
