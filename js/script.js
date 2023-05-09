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

nationalityInput.addEventListener("focus", () => {
  nationalityList.classList.remove("hidden");
});
nationalityInput.addEventListener("focusout", () => {
  nationalityList.classList.add("hidden");
});

nationalityList.addEventListener("click", () => {
  console.log("test");
});

const updateNationalityDebounce = debounce(async (searchText) => {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${searchText}?fields=name,flags`
  );
  if (res.ok) {
    const data = await res.json();
    data.forEach((suggestionResponse) => {
      createNewitemList(suggestionResponse);
    });
  } else {
    while (nationalityList.hasChildNodes()) {
      nationalityList.firstChild.remove();
    }
  }
});

function createNewitemList(suggestionResponse) {
  const newListItem = document.createElement("li");
  const flagImg = document.createElement("img");
  flagImg.src = suggestionResponse.flags.png;
  newListItem.append(flagImg);
  newListItem.append(document.createTextNode(suggestionResponse.name.common));
  nationalityList.append(newListItem);
}

function userClickedNationality() {
  console.log("test");
}

nationalityInput.addEventListener("input", (elem) => {
  updateNationalityDebounce(elem.target.value);
});

function debounce(cb, delay = 500) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
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
