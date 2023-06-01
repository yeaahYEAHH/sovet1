function toggle(parametr1, parametr2){
	parametr1.classList.toggle('active')
	parametr2.classList.toggle('active')
	document.body.classList.toggle('lock')
}

function remove(parametr1, parametr2){
	parametr1.classList.remove('active')
	parametr2.classList.remove('active')
	document.body.classList.remove('lock')
}

// Бургер меню
const burherMenu = {
	iconMenu: document.querySelector('.menu_icon'),
	menuBody: document.querySelector('.menu__body'),
	listMenu: document.querySelectorAll('.menu__link'),
	addEventListener(){
		this.iconMenu.addEventListener('click', () => {
			toggle(this.iconMenu, this.menuBody);
			this.iconMenu.style.position = 'fixed';

			if (this.iconMenu.style.position == 'fixed'){
				this.iconMenu.style.position = 'relative';
			}
		})
	// Закрытие Бургер меню при нажатии на ссылки в шапке
		this.listMenu.forEach((item) => {
			item.addEventListener('click', () => {
				if (this.iconMenu.classList.contains('active')) {
					remove(this.iconMenu, this.menuBody);
					this.iconMenu.style.position = 'relative';
				}
			})
		})
	}
}

//Кнопка прокрутки вверх
const btnUp = {
	el: document.querySelector('.btn-up'),
	show() {
		// удалим у кнопки класс btn-up_hide
		this.el.style.opacity = '1'
	},
	hide() {
		// добавим к кнопке класс btn-up_hide
		this.el.style.opacity = '0'
	},
	addEventListener() {
		// при прокрутке содержимого страницы
		window.addEventListener('scroll', () => {
			// определяем величину прокрутки
			const scrollY = window.scrollY || document.documentElement.scrollTop;
			// если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
			scrollY > 400 ? this.show() : this.hide();
		});
		// при нажатии на кнопку .btn-up
		document.querySelector('.btn-up').onclick = () => {
			// переместим в начало страницы
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'smooth'
			});
		}
	}
}

//Модальное окно 
const modalBlock = {
	listBoardCar: document.querySelectorAll('.board-card'),
	listEventInit: document.querySelectorAll('.board-card__name'),
	modalWindow: document.querySelector('.board__modal'),
	btn_close: document.querySelector('.modal__close'),
	addEventListener() {
		this.listEventInit.forEach((item, index) => {
			item.addEventListener('click', () => {
				toggle(this.modalWindow, this.btn_close)
				document.querySelector('.modal__content').append(this.listBoardCar[index].cloneNode(true))
			})

			this.btn_close.addEventListener('click', () => {
				remove(this.btn_close, this.modalWindow);
				document.querySelector('.modal__content').innerHTML =  '';
			})
		})
	}
}

document.addEventListener('DOMContentLoaded', () => {
	modalBlock.addEventListener();
	btnUp.addEventListener();
	burherMenu.addEventListener();
	if (document.querySelector('.news__slider')){
		
		//Слайдер
		const sliderBlock = {
			items: document.querySelectorAll('.news__slider .news__container .news-card'),
			sliderLine: document.querySelector('.news__container'),
			images: document.querySelectorAll('.news__slider .news__container .news-card .news-card__content img'),
			count: 0,
			width: document.querySelector('.news__slider').offsetWidth,
			init() {
				this.sliderLine.style.width = this.width * this.items.length + 'px';
				this.items.forEach((item) => {
					item.style.width = this.width + 'px';
				})
				if (window.screen.width <= 320) {
					this.images.forEach((item) => {
						item.style.width = this.width + 'px';
					})
				}
				this.sliderLine.style.transform = `translate(-${this.count * this.width}px)`
			},

			next() {
				document.querySelector('.btn__next').addEventListener('click', () => {
					this.count++
					if (this.count >= this.items.length) { this.count = 0 }
					this.sliderLine.style.transform = `translate(-${this.count * this.width}px)`
				})
			},

			prev() {
				document.querySelector('.btn__prev').addEventListener('click', () => {
					this.count--
					if (this.count < 0) { this.count = this.items.length - 1 }
					this.sliderLine.style.transform = `translate(-${count * width}px)`
				})
			},

			addEventListener() {
				this.next()
				this.prev()
			}
		}

		sliderBlock.addEventListener();
		sliderBlock.init()
		window.addEventListener('resize', sliderBlock.init())
	}
})