const mapContainer = document.getElementById("mapContainer");
const stateSelect = document.getElementById("stateSelect");
const clickSound = document.getElementById("clickSound");
const soundBtn = document.getElementById("soundBtn");


const statesData = [
  { name: "Andhra Pradesh", top: 75, left: 45 },
  { name: "Arunachal Pradesh", top: 20, left: 88 },
  { name: "Assam", top: 25, left: 82 },
  { name: "Bihar", top: 35, left: 65 },
  { name: "Chhattisgarh", top: 50, left: 55 },
  { name: "Delhi", top: 28, left: 35 },
  { name: "Goa", top: 70, left: 30 },
  { name: "Gujarat", top: 45, left: 20 },
  { name: "Haryana", top: 25, left: 32 },
  { name: "Himachal Pradesh", top: 15, left: 35 },
  { name: "Jammu & Kashmir", top: 8, left: 32 },
  { name: "Jharkhand", top: 40, left: 60 },
  { name: "Karnataka", top: 75, left: 35 },
  { name: "Kerala", top: 88, left: 38 },
  { name: "Madhya Pradesh", top: 50, left: 45 },
  { name: "Maharashtra", top: 58, left: 30 },
  { name: "Manipur", top: 35, left: 88 },
  { name: "Meghalaya", top: 30, left: 80 },
  { name: "Mizoram", top: 40, left: 85 },
  { name: "Nagaland", top: 28, left: 88 },
  { name: "Odisha", top: 55, left: 65 },
  { name: "Punjab", top: 20, left: 30 },
  { name: "Rajasthan", top: 35, left: 25 },
  { name: "Sikkim", top: 22, left: 72 },
  { name: "Tamil Nadu", top: 85, left: 45 },
  { name: "Telangana", top: 65, left: 45 },
  { name: "Tripura", top: 38, left: 80 },
  { name: "Uttar Pradesh", top: 32, left: 50 },
  { name: "Uttarakhand", top: 22, left: 45 },
  { name: "West Bengal", top: 40, left: 70 },
];

let isSoundOn = true;

window.onload = function () {
  statesData.forEach((state) => {
    const option = document.createElement("option");
    option.value = state.name;
    option.innerText = state.name;
    stateSelect.appendChild(option);
  });
};

function playSound() {
  if (isSoundOn) {
    clickSound.currentTime = 0;
    clickSound.play().catch((error) => console.log(error));
  }
}

function toggleSound() {
  isSoundOn = !isSoundOn;
  if (isSoundOn) {
    soundBtn.innerText = "🔊 On";
    soundBtn.classList.remove("btn-secondary");
    soundBtn.classList.add("btn-warning");
    playSound();
  } else {
    soundBtn.innerText = "🔇 Off";
    soundBtn.classList.remove("btn-warning");
    soundBtn.classList.add("btn-secondary");
  }
}

function createMarker(state) {
  const marker = document.createElement("i");

  marker.className = "bi bi-flag-fill text-danger position-absolute fs-5";
  marker.title = state.name; // Used to identify duplicates

  marker.style.top = state.top + "%";
  marker.style.left = state.left + "%";
  marker.style.transform = "translateY(-90%)";
  marker.style.cursor = "pointer";
  marker.style.textShadow = "1px 1px 2px rgba(0,0,0,0.3)";

  marker.onmouseover = () => {
    marker.classList.remove("text-danger");
    marker.classList.add("text-warning");
  };
  marker.onmouseout = () => {
    marker.classList.remove("text-warning");
    marker.classList.add("text-danger");
  };

  marker.onclick = () => {
    playSound();
    alert(state.name);
  };

  return marker;
}

function clearAll() {
  playSound();
  const children = Array.from(mapContainer.children);
  children.forEach((child) => {
    if (child.tagName !== "IMG") {
      child.remove();
    }
  });
  stateSelect.value = "none";
}

function addAll() {
  playSound();
  clearAll();
  statesData.forEach((state) => {
    const marker = createMarker(state);
    mapContainer.appendChild(marker);
  });
}

function handleDropdownChange() {
  playSound();
  const selectedName = stateSelect.value;

  if (selectedName === "none") {
    return;
  }
  const existingMarkers = Array.from(mapContainer.children);
  const alreadyExists = existingMarkers.some(
    (child) => child.title === selectedName
  );

  if (alreadyExists) {
  
    return;
  }
  const state = statesData.find((s) => s.name === selectedName);
  if (state) {
    const marker = createMarker(state);
    mapContainer.appendChild(marker);
  }
}
