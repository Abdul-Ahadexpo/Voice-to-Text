const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const outputTextBox = document.getElementById("output-text-box");
const container = document.querySelector(".container");
const languageSelect = document.getElementById("language-select");
let recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();
recognition.lang = "en-US";
recognition.interimResults = true;

startBtn.addEventListener("click", () => {
  recognition.lang = languageSelect.value; // Set the selected language
  startRecognition();
});

stopBtn.addEventListener("click", () => {
  recognition.stop();
  toggleButtons(false);
});

function startRecognition() {
  recognition.start();
  toggleButtons(true);
  outputTextBox.value = "Listening...";
}

function toggleButtons(isListening) {
  startBtn.disabled = isListening;
  stopBtn.disabled = !isListening;
  container.classList.toggle("listening", isListening);
}

recognition.onresult = (event) => {
  let transcript = "";
  for (let i = event.resultIndex; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript;
  }
  outputTextBox.value = transcript;
};

recognition.onerror = (event) => {
  outputTextBox.value = "Error occurred in recognition: " + event.error;
  toggleButtons(false);
};

recognition.onend = () => {
  if (startBtn.disabled) {
    toggleButtons(false);
  }
};

// Additional function to switch recognition language to Bengali (Bangla)
function switchToBangla() {
  recognition.lang = "bn-BD";
  startRecognition();
}
