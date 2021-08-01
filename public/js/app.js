const weatherForm = document.querySelector("#location-form");
const locationInput = document.querySelector("#location-input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (locationInput === "") return;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  const URL = `http://localhost:3000/weather?address=${locationInput.value}`;
  fetch(URL).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
