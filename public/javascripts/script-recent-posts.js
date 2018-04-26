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
      console.log("onePost", onePost);
      console.log("x,y", latitude, longitude);
      if (latitude === undefined || longitude === undefined) {
        return;
      } else {
        new google.maps.Marker({
          position: {
            lat: latitude,
            lng: longitude
          },
          map: map2,
          title: onePost.title,
          animation: google.maps.Animation.DROP
        });
      }
    });
  })
  .catch(err => {
    alert("Something went wrong! 💩");
  });
