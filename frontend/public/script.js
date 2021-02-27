function _load() {
  console.log("The Client is running");
  const form = document.querySelector("#uploadForm");
  let formData = new FormData();

  function notload(event) {
    event.preventDefault();
    console.log("We blocked the file upload process");

    formData.append("text", event.target[0].value);
    formData.append("pic", event.target[1].value);
    console.log(Array.from(formData)[0]);
    console.log(event.target);

    for (var value of formData.values()) {
      console.log(value);
    }
  }

  form.addEventListener("submit", notload);
}
window.addEventListener("load", _load);
