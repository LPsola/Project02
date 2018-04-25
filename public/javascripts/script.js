document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

var dropdown = document.querySelector("#navbarMenuHeroA");
dropdown.addEventListener("click", function(event) {
  console.log("yolo");
  event.stopPropagation();
  dropdown.classList.toggle("is-active");
  document.querySelector("#navbarMenuHeroB").classList.toggle("is-active");
});

const mapDiv = document.querySelector(".my-map");

navigator.geolocation.getCurrentPosition(result => {
  const { latitude, longitude } = result.coords;
  const map = new google.maps.Map(mapDiv, {
    zoom: 13,
    center: {
      lat: latitude,
      lng: longitude
    }
  });
  new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map,
    title: "Your Location",
    animation: google.maps.Animation.DROP
  });
});
