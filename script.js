const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const outputTextBox = document.getElementById("output-text-box");
const languageSelect = document.getElementById("language-select");

let recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();
recognition.interimResults = false; // Set to false for more precise results
recognition.continuous = true; // Allow continuous recognition for longer sentences

// Event listener to start recognition with selected language
startBtn.addEventListener("click", () => {
  recognition.lang = languageSelect.value; // Dynamically set the selected language
  startRecognition();
});

// Stop recognition
stopBtn.addEventListener("click", () => {
  recognition.stop();
  toggleButtons(false);
});

// Function to start speech recognition
function startRecognition() {
  recognition.start();
  toggleButtons(true);
  outputTextBox.value = "Listening...";
}

// Toggle button states
function toggleButtons(isListening) {
  startBtn.disabled = isListening;
  stopBtn.disabled = !isListening;
}

// Handle recognition results
recognition.onresult = (event) => {
  let transcript = Array.from(event.results) // Convert results to an array
    .map((result) => result[0].transcript) // Extract the transcript
    .join(" "); // Combine results

  outputTextBox.value = transcript.trim(); // Update the output text box
};

// Handle recognition errors
recognition.onerror = (event) => {
  outputTextBox.value = "Error: " + event.error;
  toggleButtons(false);
};

// Handle recognition end
recognition.onend = () => {
  if (startBtn.disabled) {
    toggleButtons(false);
  }
};
const copyBtn = document.getElementById("copy-btn");

// Add event listener to the copy button
copyBtn.addEventListener("click", () => {
  const textToCopy = outputTextBox.value; // Get the text from the output text box
  if (textToCopy.trim() !== "") {
    // Ensure there's text to copy
    navigator.clipboard
      .writeText(textToCopy) // Use Clipboard API to copy text
      .then(() => {
        // Show a confirmation message (optional)
        alert("Text copied to clipboard! 📋");
      })
      .catch((err) => {
        // Handle errors (if any)
        console.error("Failed to copy text: ", err);
        alert("Failed to copy text. Please try again.");
      });
  } else {
    alert("No text to copy! Please generate some text first.");
  }
});
