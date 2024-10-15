document.addEventListener("click", function (event) {

  if (!event.target.matches("#button")) return;

  fetch("https://api.postman.com/collections/30493430-35d4215c-804a-47bf-9335-f2ff5f2ecfe2?access_key=PMAT-01JA8WW3W5V8GCEVTWR6XBGYDS")
    .then((response) => response.json())
    .then((data) => renderJoke(data))
    .catch(() => renderError());
});

function renderJoke(data) {

  const setup = document.getElementById("setup");
  const punchline = document.getElementById("transaction_id");
  const error = document.getElementById("message");


  error.innerHTML = "";
  setup.innerHTML = data.setup;
  punchline.innerHTML = data.punchline;
}

function renderError() {
  const error = document.getElementById("error");
  error.innerHTML = "Whoops, something went wrong. Please try again later!";
}
