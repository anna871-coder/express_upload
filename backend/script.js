function _load() {
  console.log("The Client is running");
  const form = document.querySelector("#uploadForm");

  function notload(event) {
    event.preventDefault();
    console.log("We blocked the file upload process");

    let formData = new FormData();
    let file = document.getElementById("userfile");
    let name = document.getElementById("username");
    formData.append("userfile", file.files[0]);
    formData.append("username", name.value);

    for (let value of formData.values()) {
      console.log(value);
    }

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => console.log("Success", result));
  }

  form.addEventListener("submit", notload);
}
window.addEventListener("load", _load);
