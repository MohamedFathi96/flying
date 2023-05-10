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

let citiesArray = [
  "Abu Hammad",
  "Al Mahallah al Kubra",
  "Al Mansurah",
  "Al Marj",
  "Alexandria",
  "Almazah",
  "Ar Rawdah",
  "Assiut",
  "Az Zamalik",
  "Badr",
  "Banha",
  "Bani Suwayf",
  "Cairo",
  "Damietta",
  "Faraskur",
  "Flaminj",
  "Giza",
  "Heliopolis",
  "Helwan",
  "Hurghada",
  "Ismailia",
  "Kafr ash Shaykh",
  "Luxor",
  "Madinat an Nasr",
  "Madinat as Sadis min Uktubar",
  "Minya",
  "Nasr",
  "New Cairo",
  "Port Said",
  "Rafah",
  "Ramsis",
  "Sadat",
  "Shirbin",
  "Shubra",
  "Sohag",
  "Suez",
  "Tanta",
  "Toukh",
  "Zagazig",
];
const countriesFlagsArr = [
  "Africa",
  "America",
  "Argentina",
  "Australia",
  "China",
  "Egypt",
  "India",
  "Korea",
  "London",
  "Maghreb",
];

window.addEventListener("load", async () => {
  checkIn.value = new Date().toISOString().split("T")[0];
});

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
  emptyList(destinationList);
  updateDestinationDebounce(elem.target.value);
});

nationalityInput.addEventListener("input", (elem) => {
  emptyList(nationalityList);
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
  if (searchText !== "") {
    const suggestedCities = citiesArray.filter((city) =>
      city.toLocaleLowerCase().startsWith(searchText)
    );
    suggestedCities.forEach((city) => {
      createNewDestinationItemLIst(city);
    });
  }
});

const updateNationalityDebounce = debounce(async (searchText) => {
  if (searchText !== "") {
    const suggestedCountries = countriesFlagsArr.filter((country) =>
      country.toLocaleLowerCase().startsWith(searchText)
    );
    suggestedCountries.forEach((country) => {
      createNewNationalityitemList(country);
    });
  }
});

function createNewDestinationItemLIst(city) {
  const newListItem = document.createElement("li");
  newListItem.append(document.createTextNode(city));
  destinationList.append(newListItem);
  newListItem.addEventListener("click", userClickedDestination);
}

function userClickedDestination(e) {
  destinationInput.value = e.target.textContent;
}

function createNewNationalityitemList(country) {
  const newListItem = document.createElement("li");
  const flagImg = document.createElement("img");
  flagImg.src = `../assets/flags/${country.toLocaleLowerCase()}.webp`;
  newListItem.append(flagImg);
  newListItem.append(document.createTextNode(country));
  nationalityList.append(newListItem);
  newListItem.addEventListener("click", userClickedNationality);
}
function userClickedNationality(e) {
  let oldImage = document.querySelector(".flag");
  if (oldImage) oldImage.remove();
  const flagImg = document.createElement("img");
  flagImg.src = `../assets/flags/${e.target.textContent.toLocaleLowerCase()}.webp`;
  flagImg.classList.add("flag");
  nationalityInput.value = e.target.childNodes[1].nodeValue;
  nationalityDiv.prepend(flagImg);
  emptyList(nationalityList);
}

function emptyList(list) {
  while (list.hasChildNodes()) {
    list.firstChild.remove();
  }
}

function updateNights() {
  let timeDifferece = Math.abs(
    new Date(checkIn.value).getTime() - new Date(checkOut.value).getTime()
  );
  nights.value = timeDifferece / (24 * 3600 * 1000);
}

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
