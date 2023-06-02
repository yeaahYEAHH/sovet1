let count = 0;

let widthItem = function (windowWidth, widthContainer) {
	let width, countItem

	countItem = (windowWidth > 1180) ? 3:
		(windowWidth <= 1180 && windowWidth >= 767) ? 2 : 1;

	width = ((widthContainer / countItem)) - 13
	return [width, countItem]
}

function prev(countItem, Slidercontainer, Slidercontent, width) {
	count--
	if (count < 0) {
		count = Slidercontent.length - countItem
	}
	Slidercontainer.style.transform = `translate(-${count * width}px)`
}

function next(countItem, Slidercontainer, Slidercontent, width){;
	count++
	if (count > Slidercontent.length - countItem){
		count = 0
	}
	Slidercontainer.style.transform = `translate(-${count * width}px)`
}

function init(){
	const newsContent = document.querySelectorAll('.news-card__content');
	const newsContainer = document.querySelector('.news__container');
	let widthContainer = document.querySelector('.news__container').offsetWidth;

	let returnWidthCount = widthItem(window.screen.width, widthContainer)
	newsContent.forEach((item) => {
		item.style.width = returnWidthCount[0] + 'px'
	})

	let width = (window.screen.width > 767) ? document.querySelector('.news-card').offsetWidth : document.querySelector('.news__slider').offsetWidth;

	document.querySelector('.arrow__next').addEventListener('click', () => {
		next(returnWidthCount[1], newsContainer, newsContent, width)
	})

	document.querySelector('.arrow__prev').addEventListener('click', () => {
		prev(returnWidthCount[1], newsContainer, newsContent, width)
	})

	setInterval(next, 5000, returnWidthCount[1], newsContainer, newsContent, width)
}

window.addEventListener('resize', function () {
	init()
})

document.addEventListener('DOMContentLoaded', function () {
	init()
})


