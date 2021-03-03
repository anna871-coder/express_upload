import "./App.css";
import React from "react";
import { useState, useEffect } from "react";

async function upload() {
  console.log("The Client is running");
  /*    event.preventDefault(); */
  console.log("We blocked the file upload process");

  let formData = new FormData();

  let file = document.getElementById("userfile");
  let name = document.getElementById("username");
  formData.append("userfile", file.files[0]);
  formData.append("username", name.value);

  for (let value of formData.values()) {
    console.log(value);
  }

  await fetch("http://localhost:8000/upload", {
    method: "POST",
    body: formData,
    mode: "no-cors",
  })
    .then((response) => response)
    .then((result) => console.log("Success", result));
}

function App() {
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (update) upload();
    setUpdate(false);
  }, [update]);

  return (
    <div className="App" id="uploadForm">
      <input type="file" id="userfile" />
      <input type="text" id="username" />
      <button onClick={() => setUpdate(true)} value="Upload!">
        Upload
      </button>
    </div>
  );
}

export default App;
