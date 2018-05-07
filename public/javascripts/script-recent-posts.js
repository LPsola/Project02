// Recents posts map

const homeMap = document.querySelector(".my-recent-posts-map");
console.log(homeMap);
const map2 = new google.maps.Map(homeMap, {
  zoom: 12,
  center: {
    lat: 48.857257,
    lng: 2.350148
  }
});

axios
  .get("/recentposts/data")
  .then(response => {
    const postList = response.data;
    postList.forEach(onePost => {
      const [latitude, longitude] = onePost.coordinates;
      if (latitude === undefined || longitude === undefined) {
        return;
      } else {
        const newMarker = new google.maps.Marker({
          position: {
            lat: latitude,
            lng: longitude
          },
          map: map2,
          title: onePost.title,
          animation: google.maps.Animation.DROP
        });
        contentString =
          '<a href="/user/home/post/' +
          onePost._id +
          '">' +
          onePost.title +
          "<br>" +
          "view full post..." +
          "<br>" +
          "<img style ='height: 15vh 'src=" +
          onePost.pictureUrl +
          "></a>";
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        newMarker.addListener("click", function() {
          infowindow.open(map2, newMarker);
        });
      }
    });
  })
  .catch(err => {
    alert("Something went wrong! 💩");
  });

const eachMap = document.querySelectorAll(".each-post-map");

eachMap.forEach(oneMap => {
  console.log(oneMap.dataset);
  const map5 = new google.maps.Map(oneMap, {
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
    map: map5,
    animation: google.maps.Animation.DROP
  });
});
