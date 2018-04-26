document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

var dropdown = document.querySelector("#navbarMenuHeroA");
dropdown.addEventListener("click", function(event) {
  event.stopPropagation();
  dropdown.classList.toggle("is-active");
  document.querySelector("#navbarMenuHeroB").classList.toggle("is-active");
});

function logInSuccess() {
  alert("You are Logged In");
}
