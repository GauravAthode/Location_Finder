const statesData = [
  { name: "Andhra Pradesh", top: 70, left: 40 },
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

const mapContainer = document.getElementById("mapContainer");
const stateSelect = document.getElementById("stateSelect");

window.onload = function () {
  statesData.forEach((state) => {
    const option = document.createElement("option");
    option.value = state.name;
    option.innerText = state.name;
    stateSelect.appendChild(option);
  });
};

function createMarker(state) {
  const marker = document.createElement("div");

  marker.className =
    "position-absolute translate-middle rounded-circle bg-success border border-2 border-white";
  marker.title = state.name;

  marker.style.width = "20px";
  marker.style.height = "20px";
  marker.style.top = state.top + "%";
  marker.style.left = state.left + "%";
  marker.style.cursor = "pointer";

  marker.onmouseover = () => {
    marker.classList.remove("bg-success");
    marker.classList.add("bg-danger");
  };
  marker.onmouseout = () => {
    marker.classList.remove("bg-danger");
    marker.classList.add("bg-success");
  };
  marker.onclick = () => alert(state.name);

  return marker;
}

function clearAll() {
  const children = Array.from(mapContainer.children);
  children.forEach((child) => {
    if (child.tagName !== "IMG") {
      child.remove();
    }
  });
  stateSelect.value = "none";
}

function addAll() {
  clearAll();
  statesData.forEach((state) => {
    const marker = createMarker(state);
    mapContainer.appendChild(marker);
  });
}

function handleDropdownChange() {
  const selectedName = stateSelect.value;
  if (selectedName === "none") {
    clearAll();
    return;
  }
  clearAll();
  const state = statesData.find((s) => s.name === selectedName);
  if (state) {
    const marker = createMarker(state);
    mapContainer.appendChild(marker);
  }
}

function toggleSound() {
  alert("Sound functionality placeholder");
}
