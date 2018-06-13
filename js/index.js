var isRev = 0;
var direction;

var i = 1;
while (i < 10) {
	var randomNumber = Math.floor((Math.random() * 400) + 200);
	$(".right").append('<img class="right-inside" src="http://via.placeholder.com/'+randomNumber+'x' + randomNumber + '/1976D2/fff?text=' + i.toString() + '"/>');
	i++;
}

/** triggers **/
/* jump to first button */
$(".jump-first").click(function() {
	var jumpButton = $(this);
	if (isRev) {
		$(".right-inside:last").click();
	} else {
		$(".right-inside:first").click();
	}
});

/* jump to last button */
$(".jump-last").click(function() {
	var jumpButton = $(this);
	if (isRev) {
		$(".right-inside:first").click();
	} else {
		$(".right-inside:last").click();
	}
});

/* sort direction button clicked */
$(".sort-switch").click(function() {
	$(".flex").toggleClass("reverse-order");
	isRev = !isRev;
});

/* arrow button clicked */
$(".left button").click(function() {
	var arrowButton = $(this);
	checkDirection(arrowButton);
	if (direction === "prev") {
		if (isRev) {
			nextImg();
		} else {
			prevImg();
		}
	} else if (direction === "next") {
		if (isRev) {
			prevImg();
		} else {
			nextImg();
		}
	}
});

/* thumbnail clicked */
$(".right-inside").click(function() {
	$(".highlight").removeClass("highlight");
	$(this).addClass("highlight");
	updateMainImg();
	console.log("thumbnail clicked");
});

/** functions **/
function checkDirection(btn) {
	switch (btn.hasClass("arrow-left")) {
		case true:
			direction = "prev";
			break;
		case false:
			direction = "next";
			goLeft = 0;
	}
}

function prevImg() {
	//a thumbnail is highlighted
	if ($(".highlight").length >= 1) {
		//first child highlighted
		if ($(".highlight").is(":first-child")) {
			$(".highlight").removeClass("highlight");
			$(".right-inside:last-child").addClass("highlight");
			console.log("Wrap to last.");
			updateMainImg();
		} else {
			//first child not highlighted
			$(".highlight")
				.removeClass("highlight")
				.prev()
				.addClass("highlight");
			console.log("<< Prev");
			updateMainImg();
		}
		//no thumbnail is highlighted
	} else {
		$(".right-inside:last-child").addClass("highlight");
		console.log("Start at bottom.");
		updateMainImg();
	}
}

function nextImg() {
	if ($(".highlight").length >= 1) {
		//a thumbnail is highlighted
		if ($(".highlight").is(":last-child")) {
			//last child highlighted
			$(".highlight").removeClass("highlight");
			$(".right-inside:first-child").addClass("highlight");
			console.log("Wrap to first.");
			updateMainImg();
		} else {
			//first child not highlighted
			$(".highlight")
				.removeClass("highlight")
				.next()
				.addClass("highlight");
			console.log("Next >>");
			updateMainImg();
		}
	} else {
		//no thumbnail is highlighted
		$(".right-inside:first-child").addClass("highlight");
		console.log("Start at top.");
		updateMainImg();
	}
}

function updateMainImg() {
	var activeThumbnail = $(".highlight");
	var activeSrc = activeThumbnail.attr("src");
	var mainImg = $(".main-img");
	var mainImgWrap = $(".main-img-wrap");
	var imgData = {
		src: activeSrc,
		width: mainImg.width(),
		height: mainImg.height(),
		index: $("img.right-inside").index(activeThumbnail) + 1
	};
	//simulate switching out for a new image
	var widthAfter = activeThumbnail[0].naturalWidth;
	var heightAfter = activeThumbnail[0].naturalHeight;
	//animation
	mainImg.hide();
	mainImgWrap.stop().animate(
		{
			width: widthAfter,
			height: heightAfter
		},
		{
			duration: 500,
			complete: function() {
				console.log("animation ended");
				mainImg.attr("src", activeSrc).fadeIn(200);
			}
		}
	);
	updateInfo(imgData);
}

function fadeIn() {
	console.log("done");
}

function updateInfo(data) {
	var infoText = "";
	$.each(data, function(name, value) {
		infoText += name + ": " + value + "<br />";
	});
	//only show first piece of info
	$(".info").html(infoText.split("<")[0]);
}

// TO DO LIST
//   non looping mode, disable button when end is reached
// ☑ better thumbnail change animation
// ☑ updated main image size change animation
// ☑ reverse sort order button
// ☑ fit width/height
//   stretch to fit option
//   no thumbnails option
// ☑ show image index
// ☑ show image filename
// ☑ jump to start/end buttons