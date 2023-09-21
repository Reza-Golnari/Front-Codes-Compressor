const pasteBtn = document.querySelector(".paste");
const copyBtn = document.querySelector(".copy");
const trashBtn = document.querySelector(".trash");
const compress = document.querySelector(".compress");
const userCodesBox = document.querySelector(".area-get");
const showCodesBox = document.querySelector(".area-show");
const msgBox = document.querySelector(".msg");
const msgTitle = document.querySelector(".msg-title");
const msgText = document.querySelector(".msg-text");
let url, data, header;
// paste btn handler
pasteBtn.addEventListener("click", () => {
  if (navigator.clipboard) {
    navigator.clipboard
      .readText()
      .then((codes) => (userCodesBox.value = codes));
  }
});

// trash btn handler
trashBtn.addEventListener("click", () => {
  userCodesBox.value = "";
  showCodesBox.value = "";
});

// copy btn handler
copyBtn.addEventListener("click", () => {
  if (navigator.clipboard) {
    let compressedCodes = showCodesBox.value;
    console.log(compressedCodes);
    navigator.clipboard.writeText(compressedCodes);
  }
});

// post codes and get res from api
compress.addEventListener("click", compressor);

function compressor(e) {
  e.preventDefault();
  if (userCodesBox.value) {
    sendRequest();
  } else {
    showMsg();
  }
}

// show msg
function showMsg(
  title = "Error",
  msg = `In order to compress your code, you need to enter the js or php code
correctly.`
) {
  msgBox.classList.add("active");
  msgTitle.textContent = title;
  msgText.textContent = msg;
  setTimeout(() => {
    msgBox.classList.remove("active");
  }, 5000);
}

// send request
function sendRequest() {
  url = "http://127.0.0.1:8000/compress";
  data = {
    data_file: userCodesBox.value,
  };
  header = {
    "Content-Type": "application/json",
  };
  axios
    .post(url, data, header)
    .then((res) => {
      showCodesBox.value = res.data;
    })
    .catch((err) => console.log(err));
}
