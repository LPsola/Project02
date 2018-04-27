// single post map

const singlePostMap = document.querySelector(".my-single-post-map");
const latInput = Number(document.querySelector(".lat-input").innerHTML);
const lngInput = Number(document.querySelector(".lng-input").innerHTML);

const map = new google.maps.Map(singlePostMap, {
  zoom: 13,
  center: {
    lat: latInput,
    lng: lngInput
  }
});

new google.maps.Marker({
  position: {
    lat: latInput,
    lng: lngInput
  },
  map: map,
  animation: google.maps.Animation.DROP
});
