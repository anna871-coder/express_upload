function _load() {
  console.log("The Client is running");
  const form = document.querySelector("#uploadForm");

  function notload(event) {
    event.preventDefault();
    console.log("We blocked the file upload process");
  }
  form.addEventListener("submit", notload);
}
window.addEventListener("load", _load);
