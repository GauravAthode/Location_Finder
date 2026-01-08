const mapContainer = document.getElementById("mapContainer");
const stateSelect = document.getElementById("stateSelect");
const clickSound = document.getElementById("clickSound");
const soundBtn = document.getElementById("soundBtn");
const mapImage = document.getElementById("mapImage");
const mapType = document.getElementById("mapType");

const statesData = [
  { name: "Andhra Pradesh", top: 66, left: 42 },
  { name: "Arunachal Pradesh", top: 33, left: 82 },
  { name: "Assam", top: 37, left: 77 },
  { name: "Bihar", top: 39, left: 58 },
  { name: "Chhattisgarh", top: 52, left: 47 },
  { name: "Delhi", top: 29.5, left: 34 },
  { name: "Goa", top: 69, left: 22 },
  { name: "Gujarat", top: 45, left: 18 },
  { name: "Haryana", top: 29, left: 31 },
  { name: "Himachal Pradesh", top: 14, left: 36 },
  { name: "Jammu & Kashmir", top: 17, left: 28 },
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

const continentsData = [

  { name: "Africa", top: 62, left: 52 },
  { name: "Antarctica", top: 97, left: 63 },
  { name: "Asia", top: 40, left: 73 },
  { name: "Australia", top: 73, left: 85 },
  { name: "Europe", top: 42, left: 53 },
  { name: "North America", top: 35, left: 18 },
  { name: "South America", top: 70, left: 30 },
  
  
  
];

let isSoundOn = true;
let currentData = statesData;

window.onload = function () {
  loadMapData();
};

function switchMapMode() {
  playSound();
  clearAll();
  const selectedMode = mapType.value;

  if (selectedMode === "world") {
    mapImage.src = "WorldMap.jpg";
    currentData = continentsData;
    stateSelect.innerHTML = '<option value="none">---Select continents---</option>';
    // world flag
    stateSelect.style.background="linear-gradient(90deg, #00008B 0%, #FFFFFF 50%, #008000 100%)";
    stateSelect.style.color="#000000";
    
  } else {
    mapImage.src = "map.jpg";
    currentData = statesData;
    stateSelect.innerHTML = '<option value="none">---Select States---</option>';
    // india flag
    stateSelect.style.background="linear-gradient(90deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)";
    stateSelect.style.color="#000000";
  }

  loadMapData();
}

function loadMapData() {
  currentData.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.name;
    option.innerText = item.name;
    stateSelect.appendChild(option);
  });
}

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

function createMarker(item) {
  const marker = document.createElement("i");

  marker.className = "bi bi-flag-fill text-danger position-absolute fs-5";
  marker.title = item.name;

  marker.style.top = item.top + "%";
  marker.style.left = item.left + "%";
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
    alert(item.name);
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
  currentData.forEach((item) => {
    const marker = createMarker(item);
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
  const item = currentData.find((s) => s.name === selectedName);
  if (item) {
    const marker = createMarker(item);
    mapContainer.appendChild(marker);
  }
}