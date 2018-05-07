// User home map

const userHomeMap = document.querySelector(".my-user-home-map");

const map1 = new google.maps.Map(userHomeMap, {
  zoom: 12,
  center: {
    lat: 48.857257,
    lng: 2.350148
  }
});
// navigator.geolocation.getCurrentPosition(result => {
//   const { latitude, longitude } = result.coords;
//   const map1 = new google.maps.Map(userHomeMap, {
//     zoom: 12,
//     center: {
//       lat: latitude,
//       lng: longitude
//     }
//   });
// });
axios
  .get("/user/userposts/data")
  .then(response => {
    const userPostList = response.data;
    userPostList.forEach(oneUserPost => {
      const [latitude, longitude] = oneUserPost.coordinates;
      console.log(latitude, longitude);
      const newMarker = new google.maps.Marker({
        position: {
          lat: latitude,
          lng: longitude
        },
        map: map1,
        title: oneUserPost.title,
        animation: google.maps.Animation.DROP
      });
      contentString =
        '<a href="/user/home/post/' +
        oneUserPost._id +
        '">' +
        oneUserPost.title +
        "<br>" +
        "view full post..." +
        "<br>" +
        "<img style ='height: 15vh 'src=" +
        oneUserPost.pictureUrl +
        "></a>";
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      newMarker.addListener("click", function() {
        infowindow.open(map1, newMarker);
      });
    });
  })
  .catch(err => {
    console.log(err);
    alert("Something went wrong! 💩");
  });

const eachUserPostMap = document.querySelectorAll(".user-each-post-map");

eachUserPostMap.forEach(oneMap => {
  console.log(oneMap.dataset);
  const map6 = new google.maps.Map(oneMap, {
    zoom: 14,
    center: {
      lat: Number(oneMap.dataset.lat),
      lng: Number(oneMap.dataset.lng)
    }
  });
  new google.maps.Marker({
    position: {
      lat: Number(oneMap.dataset.lat),
      lng: Number(oneMap.dataset.lng)
    },
    map: map6,
    animation: google.maps.Animation.DROP
  });
});
