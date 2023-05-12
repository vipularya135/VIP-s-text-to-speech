const text = document.querySelector("#text");
const voicesDropdown = document.querySelector("#voices");
const speedInput = document.querySelector("#speed");
const pitchInput = document.querySelector("#pitch");
const speakButton = document.querySelector("#speak");

let selectedVoice = "";

function populateVoicesDropdown() {
  voicesDropdown.innerHTML = "";
  const voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    if (voice.default) {
      option.selected = true;
      selectedVoice = voice;
    }
    voicesDropdown.appendChild(option);
  });
}

populateVoicesDropdown();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoicesDropdown;
}

function speak() {
  const utterance = new SpeechSynthesisUtterance(text.value);
  utterance.voice = selectedVoice;
  utterance.rate = parseFloat(speedInput.value);
  utterance.pitch = parseFloat(pitchInput.value);
  speechSynthesis.speak(utterance);
}

speakButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
    return;
  }
  speak();
});

