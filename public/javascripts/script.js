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

var file = document.getElementById("file");
file.onchange = function() {
  if (file.files.length > 0) {
    document.getElementById("filename").innerHTML = file.files[0].name;
  }
};
