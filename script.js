const mapContainer = document.getElementById("mapContainer");
const stateSelect = document.getElementById("stateSelect");
const clickSound = document.getElementById("clickSound");
const soundBtn = document.getElementById("soundBtn");


const statesData = [
  { name: "Andhra Pradesh", top: 66, left: 42},
  { name: "Arunachal Pradesh", top: 33, left: 82 },
  { name: "Assam", top: 37, left: 77 },
  { name: "Bihar", top: 39, left: 58 },
  { name: "Chhattisgarh", top: 52, left: 47 },
  { name: "Delhi", top: 29.5, left: 34 },
  { name: "Goa", top: 69, left: 22 },
  { name: "Gujarat", top: 45, left: 18 },
  { name: "Haryana", top: 29, left: 31 },
  { name: "Himachal Pradesh", top: 14, left: 36 },
  { name: "Jammu & Kashmir", top: 17, left: 28},
  { name: "Jharkhand", top: 46, left: 57 },
  { name: "Karnataka", top: 76, left: 32 },
  { name: "Kerala", top: 89, left: 30 },
  { name: "Madhya Pradesh", top: 46, left: 33 },
  { name: "Maharashtra", top: 58, left: 20 },
  { name: "Manipur", top: 41, left: 84 },
  { name: "Meghalaya", top: 39, left: 78 },
  { name: "Mizoram", top: 44, left: 81 },
  { name: "Nagaland", top: 37.5, left: 84.5 },
  { name: "Odisha", top: 55, left: 58 },
  { name: "Punjab", top: 24, left: 32 },
  { name: "Rajasthan", top: 36, left: 28 },
  { name: "Sikkim", top: 33, left: 67 },
  { name: "Tamil Nadu", top: 78, left: 40 },
  { name: "Telangana", top: 63, left: 37 },
  { name: "Tripura", top: 44, left: 76.5 },
  { name: "Uttar Pradesh", top: 37, left: 47 },
  { name: "Uttarakhand", top: 25, left: 37 },
  { name: "West Bengal", top: 48, left: 66 },
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
