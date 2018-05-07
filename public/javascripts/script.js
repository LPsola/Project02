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

// var file = document.getElementById("file");
// file.onchange = function() {
//   if (file.files.length > 0) {
//     document.getElementById("filename").innerHTML = file.files[0].name;
//   }
// };

var $el, $ps, $up, totalHeight, totalHeight1;
var buttonValue = $(".sidebar-box .button").html();
var buttonValue1 = $(".sidebar-box1 .button").html();
var showStatus = false;
var showStatus1 = false;

$(".sidebar-box .button").click(function() {
  totalHeight = 0;

  $el = $(this);
  $p = $el.parent();
  $up = $p.parent();
  $ps = $up.find("p:not('.read-more')");

  $ps.each(function() {
    totalHeight += $(this).outerHeight();
  });
  if (showStatus === false) {
    console.log(showStatus);
    showMore(showStatus);
    console.log(showStatus);
  } else if (showStatus === true) {
    showLess(showStatus);
    console.log(showStatus);
  }
});

function showMore() {
  $up
    .css({
      height: $up.height(),
      "max-height": 9999
    })
    .animate({
      height: totalHeight + 150
    });
  $(".rodrigo").css({
    height: $up.height(),
    "max-height": 9999
  });

  $(".sidebar-box .button").html("Show less..");
  buttonValue = "Show Less";
  showStatus = true;
}

function showLess() {
  $up.css({
    "max-height": 0,
    "min-height": 300
  });
  $(".rodrigo").css({
    "max-height": 0,
    "min-height": 0
  });

  $(".sidebar-box .button").html("Read More");
  buttonValue = "Read More";
  showStatus = false;
  console.log("3: " + showStatus);
}

$(".sidebar-box1 .button").click(function() {
  totalHeight1 = 0;

  $el = $(this);
  $p = $el.parent();
  $up = $p.parent();
  $ps = $up.find("p:not('.read-more1')");

  $ps.each(function() {
    totalHeight1 += $(this).outerHeight();
  });
  if (showStatus1 === false) {
    console.log(showStatus);
    showMore1(showStatus1);
    console.log(showStatus);
  } else if (showStatus1 === true) {
    showLess1(showStatus1);
    console.log(showStatus);
  }
});

function showMore1() {
  $up
    .css({
      height: $up.height(),
      "max-height": 9999
    })
    .animate({
      height: totalHeight1 + 160
    });
  $(".leo").css({
    height: $up.height(),
    "max-height": 9999
  });

  $(".sidebar-box1 .button").html("Show less..");
  buttonValue1 = "Show Less";
  showStatus1 = true;
}

function showLess1() {
  $up.css({
    "max-height": 0,
    "min-height": 300
  });
  $(".leo").css({
    "max-height": 0,
    "min-height": 0
  });

  $ps.each(function() {
    totalHeight1 -= $(this).outerHeight();
  });

  $(".sidebar-box1 .button").html("Read More");
  buttonValue1 = "Read More";
  showStatus1 = false;
  console.log("3: " + showStatus);
}
