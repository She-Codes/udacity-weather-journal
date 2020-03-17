const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 3000;
// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Start up an instance of app
const app = express();

// Initialize the main project folder
app.use(express.static("website"));

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Setup Server
const server = app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

// Setup Routing
app.get("/getProjectData", (req, res) => {
  res.send(projectData);
});

app.post("/addProjectData", (req, res) => {
  const { temp, date, feelings } = req.body;
  projectData = { temp, date, feelings };
  // Not sending anything causes error in client side function
  // handling post request
  res.send({});
});
