const checkIn = document.getElementById("checkin");
const checkOut = document.getElementById("checkout");
const nights = document.getElementById("nights");
const nationalityInput = document.getElementById("nationality");
const nationalityList = document.getElementById("nationality-list");
const optionsButton = document.getElementById("options-open");
const optionsModal = document.getElementById("options-modal");
const closeOptions = document.querySelector(".options-close");
const closeMenu = document.querySelector(".menu-close");
const headerModal = document.getElementById("header-modal");
const headerButton = document.querySelector(".menu");
const nationalityDiv = document.querySelector(".nationality-div");
const destinationList = document.getElementById("destination-list");
const destinationInput = document.getElementById("dist");

document.addEventListener("click", (e) => {
  if (e.target.matches("#dist") || e.target.matches("#nationality")) return;
  nationalityList.classList.add("hidden");
  destinationList.classList.add("hidden");
});

nationalityInput.addEventListener("focus", () => {
  destinationList.classList.add("hidden");
  nationalityList.classList.remove("hidden");
});
destinationInput.addEventListener("focus", () => {
  nationalityList.classList.add("hidden");
  destinationList.classList.remove("hidden");
});

destinationInput.addEventListener("input", (elem) => {
  emptyDestinatinList();
  updateDestinationDebounce(elem.target.value);
});

nationalityInput.addEventListener("input", (elem) => {
  emptyNationalityList();
  updateNationalityDebounce(elem.target.value);
});

function debounce(cb, delay = 300) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

const updateDestinationDebounce = debounce(async (searchText) => {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${searchText}?fields=name,flags`
  );
  if (res.ok) {
    const data = await res.json();
    data.forEach((suggestionResponse) => {
      createNewDestinationItemLIst(suggestionResponse);
    });
  } else {
    emptyNationalityList();
  }
});

const updateNationalityDebounce = debounce(async (searchText) => {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${searchText}?fields=name,flags`
  );
  if (res.ok) {
    const data = await res.json();
    data.forEach((suggestionResponse) => {
      createNewNationalityitemList(suggestionResponse);
    });
  } else {
    emptyNationalityList();
  }
});

function createNewDestinationItemLIst(suggestionResponse) {
  const newListItem = document.createElement("li");
  newListItem.append(document.createTextNode(suggestionResponse.name.common));
  destinationList.append(newListItem);
  newListItem.addEventListener("click", userClickedDestination);
  console.log(newListItem);
}

function userClickedDestination(e) {
  console.log(e.target);
}

function createNewNationalityitemList(suggestionResponse) {
  const newListItem = document.createElement("li");
  const flagImg = document.createElement("img");
  flagImg.src = suggestionResponse.flags.png;
  newListItem.append(flagImg);
  newListItem.append(document.createTextNode(suggestionResponse.name.common));
  nationalityList.append(newListItem);
  newListItem.addEventListener("click", userClickedNationality);
}

function userClickedNationality(e) {
  let oldImage = document.querySelector(".flag");
  if (oldImage) oldImage.remove();
  const imgFlag = e.target.childNodes[0];
  imgFlag.classList.add("flag");
  nationalityInput.value = e.target.childNodes[1].nodeValue;
  nationalityDiv.prepend(imgFlag);
  emptyNationalityList();
}

function emptyNationalityList() {
  while (nationalityList.hasChildNodes()) {
    nationalityList.firstChild.remove();
  }
}
function emptyDestinatinList() {
  while (destinationList.hasChildNodes()) {
    destinationList.firstChild.remove();
  }
}

function updateNights() {
  let timeDifferece = Math.abs(
    new Date(checkIn.value).getTime() - new Date(checkOut.value).getTime()
  );
  nights.value = timeDifferece / (24 * 3600 * 1000);
}
window.addEventListener("load", async () => {
  checkIn.value = new Date().toISOString().split("T")[0];
});

function updateCheckOUt() {
  let addedTime =
    new Date(checkIn.value).getTime() + nights.value * (24 * 3600 * 1000);
  checkOut.value = new Date(addedTime).toISOString().split("T")[0];
}

optionsButton.addEventListener("click", () => {
  optionsModal.showModal();
});
closeOptions.addEventListener("click", () => {
  optionsModal.close();
});
headerButton.addEventListener("click", () => {
  headerModal.showModal();
});
closeMenu.addEventListener("click", () => {
  headerModal.close();
});
