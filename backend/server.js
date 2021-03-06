const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const PORT = 8000;
const corsOptions = {
  origin: "http://localhost:8000/",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(fileUpload());
let contents = fs.readFileSync("./uploads/data.json");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000/"); // Website you wish to allow to connect
  res.setHeader(
    // Request methods you wish to allow
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  ),
    res.setHeader(
      // Request headers you wish to allow
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
  res.setHeader("Access-Control-Allow-Credentials", true); // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  next(); // Pass to next layer of middleware
});

//Json adatot parse-olni
//kiválasztani a mail kulcsot,
//kukacot, egyebeket rekurzív módon kiszedni
//létrehozni egy fileelérési utat (mail alapján)
//hozzáilleszteni a .json kiterjesztést
//file-t írni
//callback hiba

app.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;
  let text = JSON.parse(req.body.userdata);

  console.log(text);

  let jsonContent = JSON.parse(contents);
  console.log("jsonContent: " + jsonContent);
  jsonContent.push(text);
  let json = JSON.stringify(jsonContent);
  console.log(json);
  let filename = text.email.replace(/[^a-zA-Z0-9]/g, "");
  console.log(filename);
  fs.writeFile(
    __dirname + "/uploads/" + `${filename}` + ".json",
    json,
    "utf8",
    function () {}
  );
  if (!req.files) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  //kép feltöltés

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
