import "./App.css";
import React from "react";
import { useState, useEffect } from "react";

const App = () => {
  const [update, setUpdate] = useState(false);

  const upload = () => {
    let formData = new FormData();

    const elements = document.querySelectorAll(".form-control");
    let obj = {};
    for (const elem of elements) {
      obj[elem.id] = elem.value;
    }
    let file = document.querySelector("#userfile");
    formData.append("userdata", JSON.stringify(obj));
    formData.append("userfile", file.files[0]);

    for (let value of formData.values()) {
      console.log(value);
    }

    fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
      mode: "no-cors",
    })
      .then((response) => response)
      .then((result) => console.log("Success", result));
    /* .then(setUpdate(false)) */
  };

  //userdata stringify-olt data lesz, beletesszük az összes olyan tartalmat, amit el akarunk küldeni
  //queryselectorall, for ciklis, input mező value-ja lesz

  useEffect(() => {
    upload();
  }, [update]);

  return (
    <div className="main-block">
      <h1>Personal Data</h1>
      <div className="main" id="uploadForm">
        <input type="file" id="userfile" />
        <input type="text" id="username" />
      </div>
      <div>
        <div className="info main">
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            id="name-address"
          />
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email"
            id="email"
          />
          <input
            type="zip"
            className="form-control"
            placeholder="Zip code"
            id="zip"
          />
          <input
            type="city"
            className="form-control"
            placeholder="City"
            id="city"
          />
          <input
            type="street"
            className="form-control"
            placeholder="Street"
            id="street"
          />
          <input
            type="number"
            className="form-control"
            placeholder="Number"
            id="number"
          />
          <textarea
            className="form-control"
            rows="4"
            id="other"
            placeholder="Other"
          ></textarea>

          <button
            onClick={() => setUpdate(!update ? true : false)}
            value="Upload!"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
