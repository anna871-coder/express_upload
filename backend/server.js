const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");

app.use(bodyParser.json());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000/");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ),
    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const corsOptions = {
  origin: "http://localhost:8000/",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const PORT = 8000;
/* app.use("/form", express.static(__dirname + "../../frontend/index.html"));
app.use("/pub", express.static(__dirname + "../../frontend/public")); */

// default options
app.use(fileUpload());

/* app.get("/ping", function (req, res) {
  res.send("pong");
}); */

app.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;
  let text;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }
  console.log("req.files >>>", req.files); // eslint-disable-line
  sampleFile = req.files.userfile;
  text = req.files.text;
  uploadPath = __dirname + "/uploads/" + sampleFile.name;
  sampleFile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(`{"filePath": "${sampleFile.name}"}`);
  });
});

app.get("/uploads", function (req, res) {
  res.sendFile("uploads/", { root: __dirname });
});

app.listen(PORT, function () {
  console.log("Express server listening on port ", PORT); // eslint-disable-line
});
