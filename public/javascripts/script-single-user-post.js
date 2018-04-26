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
  title: "Musee du Parfum",
  animation: google.maps.Animation.DROP
});

// axios
//   .get("/userposts/data/:postId")
//   .then(response => {
//     const userPost = response.data;
//     console.log(req.user);

// userPostList.forEach(oneUserPost => {
//   const [latitude, longitude] = oneUserPost.coordinates;
//   console.log(latitude, longitude);
//   new google.maps.Marker({
//     position: {
//       lat: latitude,
//       lng: longitude
//     },
//     map: map1,
//     title: oneUserPost.name,
//     animation: google.maps.Animation.DROP
//   });
// });
// })
// .catch(err => {
//   alert("Something went wrong! 💩");
// });
