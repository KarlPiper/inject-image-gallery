var isRev = 0;
var direction;

//generate random thumbnails
var i = 1;
while (i < 10) {
	var randomNumber = Math.floor(Math.random() * 400 + 200);
	$(".right").append(
		'<img class="right-inside" src="http://via.placeholder.com/' +
			randomNumber +
			"x" +
			randomNumber +
			"/1976D2/fff?text=" +
			i.toString() +
			'"/>'
	);
	i++;
}

/** triggers **/
/* jump to first button */
$(".jump-first").click(function() {
	var firstThumb = $(".right-inside:first");
	var lastThumb = $(".right-inside:last");
	if (isRev) {
		if (lastThumb.hasClass("highlight")) {
			return false;
		} else {
			lastThumb.click();
		}
	} else {
		if (firstThumb.hasClass("highlight")) {
			return false;
		} else {
			firstThumb.click();
		}
	}
});

/* jump to last button */
$(".jump-last").click(function() {
	var firstThumb = $(".right-inside:first");
	var lastThumb = $(".right-inside:last");
	if (isRev) {
		if (firstThumb.hasClass("highlight")) {
			return false;
		} else {
			firstThumb.click();
		}
	} else {
		if (lastThumb.hasClass("highlight")) {
			return false;
		} else {
			lastThumb.click();
		}
	}
});

/* sort direction button clicked */
$(".sort-switch").click(function() {
	$(".flex").toggleClass("reverse-order");
	isRev = !isRev;
});

$(".show-thumbs").click(function() {
	$('gallery').toggleClass('no-thumbnails');
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

$('.fit').change(function() {
	if ($(this :selected).val() === "sizing-fit-width") {
		$('.left').attr('class', 'left fit-width')
	} else if ($(this :selected).val() === "sizing-fit-height") {
		$('.left').attr('class', 'left fit-height')
	} else if ($(this :selected).val() === "sizing-fit-both") {
		$('.left').attr('class', 'left fit-height fit-width')
	} else {
		$('.left').attr('class','left')
	}
})

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
	transitionAnimation(activeThumbnail,mainImg,mainImgWrap,activeSrc);
	updateInfo(imgData);
}

function transitionAnimation(activeThumbnail,mainImg,mainImgWrap,activeSrc) {
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

$(".jump-over").click(function() {
	var activeIndex = $(".highlight").index();
	var skipThrough = 3;
	var skipTo = $("img.right-inside:eq(" + (activeIndex + skipThrough) + ")");
	$(".highlight").removeClass("highlight");
	$('.pulseGrow').removeClass('pulseGrow');
	$(skipTo).addClass("highlight");
	updateMainImg();
	activeIndex = $(".highlight").index();
	skipFade(skipThrough, activeIndex);
});


function skipFade(skip,active) {
	while (skip > 1) {
		$("img.right-inside")
			.eq(active - (skip - 1))
			.addClass('pulseGrow')
		skip--;
	}
}


// TO DO LIST
// ☑ better thumbnail change animation
// ☑ updated main image size change animation
// ☑ reverse sort order button
// ☑ contain width/height
// ☑ no thumbnails option
// ☑ show image index
// ☑ show image filename
// ☑ jump to start/end buttons
// ☑ skipped thumbnail animation
// ☑ skip button stops at end then starts over
// ☑ no thumbnail options if sidebar hidden
// ☑ animation for hiding sidebar using CLASSES
//   non looping mode, disable button when end is reached
//   disable first/last buttons if already on first/last
//   fix thumbnail hiding on vertical overflow