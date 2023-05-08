const checkIn = document.getElementById("checkin");
const checkOut = document.getElementById("checkout");
const nights = document.getElementById("nights");

function countDays() {
  let timeDifferece = Math.abs(
    new Date(checkIn.value).getTime() - new Date(checkOut.value).getTime()
  );
  nights.value = timeDifferece / (24 * 3600 * 1000);
}
window.addEventListener("load", () => {
  checkIn.value = new Date().toISOString().split("T")[0];
});
