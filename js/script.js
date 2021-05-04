'use strict';



//срабатывает событие, после того как HTML полностью прогрузился
window.addEventListener('DOMContentLoaded', () => {

	//Slider-------------------------------------

	const prev = document.querySelector('.offer__slider-prev'),
		slider = document.querySelector('.offer__slider'),
		next = document.querySelector('.offer__slider-next'),
		slides = document.querySelectorAll('.offer__slide'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesField = document.querySelector('.offer__slider-inner'),
		width = window.getComputedStyle(slidesWrapper).width;

	let slideIndex = 1;
	let offset = 0;

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = 'relative';

	const indicators = document.createElement('ol'),
		dots = [];

	indicators.classList.add('carousel-indicators');
	indicators.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
	`;
	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			opacity: .5;
			transition: opacity .6s ease;
		`;

		if (i == 0) {
			dot.style.opacity = 1;
		}

		indicators.append(dot);
		dots.push(dot);
	}

	function deleteNotDigits(str) {
		return +str.replace(/\D/g, '');
	}

	next.addEventListener('click', () => {
		if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = 1;

	});

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = 1;

	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {

			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;

			offset = deleteNotDigits(width) * (slideTo - 1);

			slidesField.style.transform = `translateX(-${offset}px)`;

			if (slides.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}

			dots.forEach(dot => dot.style.opacity = '.5');
			dots[slideIndex - 1].style.opacity = 1;

		});
	});

	// showSlides(slideIndex);
	// if (slides.length < 10) {
	// 	total.textContent = `0${slides.length}`;
	// } else {
	// 	total.textContent = slides.length;
	// }

	// function showSlides(n) {

	// 	if (n > slides.length) {
	// 		slideIndex = 1;
	// 	}

	// 	if (n < 1) {
	// 		slideIndex = slides.length;
	// 	}

	// 	slides.forEach(item => item.style.display = 'none');

	// 	slides[slideIndex - 1].style.display = 'block';

	// 	if (slides.length < 10) {
	// 		current.textContent = `0${slideIndex}`;
	// 	} else {
	// 		current.textContent = slideIndex;
	// 	}
	// }

	// function plusSlides(n) {
	// 	showSlides(slideIndex += n);
	// }


	// next.addEventListener('click', () => {
	// 	plusSlides(1);
	// });

	// prev.addEventListener('click', () => {
	// 	plusSlides(-1);
	// });

	// Tabs ------------------------------------------------------

	const tabs = document.querySelectorAll('.tabheader__item'), //получаем заголовки табов
		tabsContent = document.querySelectorAll('.tabcontent'), //получаем контент табов
		tabsParent = document.querySelector('.tabheader__items'); //получаем родителей заголовков табов

	function hideTabContent() {
		tabsContent.forEach((item) => { //перебираем массив и каждому элементу добавляем класс hide и удаляем add
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});
		//убираем класс у заголовков табов
		tabs.forEach((item) => {
			item.classList.remove('tabheader__item_active');
		});
	}
	//показываем текущий таб, по умолчанию с индексом 0
	function showTabContent(index = 0) {
		tabsContent[index].classList.add('show', 'fade');
		tabsContent[index].classList.remove('hide');
		tabs[index].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();
	//делегируем событие. в родителе табов отслеживаем событие клик, и проверяем если выбраный элемент имеет класс tabheader__item, то начинаем перебор табов и ищем элемент на который мы кликнули, запускаем ф-ции очистки hideTabContent и showTabContent(index) с индексом выбранного элемента
	tabsParent.addEventListener('click', (event) => {
		const target = event.target;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, index) => {
				if (target == item) {
					hideTabContent();
					showTabContent(index);
				}
			});
		}
	});

	// Timer ------------------------------------------------


	let now = new Date();


	const deadLine = '2021-04-30'; // устанавливаем дату окончания отсчета

	function getTimeRemaining(endtime) {
		//получаем разницу от текущей даты и окончательной даты, в милисекундах
		const t = Date.parse(endtime) - Date.parse(new Date()),
			//конвертируем милисекунды в дни, часы, минуты, секунды
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor((t / (1000 * 60 * 60) % 24)),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);

		//функция возвращает объект данных
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	//функция добавляет 0 к числу с одним символом
	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	//функция получает HTML элементы и обновляет их каждую секунду
	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		//вставляем в HTML новые значения
		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			//останавливаем таймер
			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	setClock('.timer', deadLine);


	//Modal (POPUP)-----------------------------------

	//получаем все кнопки по атрибуту data-modal
	const btns = document.querySelectorAll('[data-modal]');
	//получаем родительский элемент модального окна
	const modal = document.querySelector('.modal');
	//получаем кнопку закрыть в модальном окне
	// const modalCloseBtn = document.querySelector('[data-close]');


	function modalOpen() {
		modal.classList.remove('hide');
		modal.classList.add('show');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimer);
	}


	btns.forEach((btn) => {
		btn.addEventListener('click', modalOpen);
	});


	function modalClose() {
		modal.classList.remove('show');
		modal.classList.add('hide');
		document.body.style.overflow = '';
	}


	// modalCloseBtn.addEventListener('click', modalClose);


	//проверяем что кликнули по подложке модального окна, и вызываем функцию
	modal.addEventListener('click', (event) => {
		if (event.target == modal || event.target.getAttribute('data-close') == '') {
			modalClose();
		}
	});


	//вешаем событие на весь документ, и проверяем что нажата кнопка ESC (код 27)
	//и модальное окно открыто
	document.addEventListener('keydown', (event) => {
		if (event.keyCode == 27 && modal.classList.contains('show')) {
			modalClose();
		}
	});


	let modalTimer = setTimeout(modalOpen, 500000);


	function showModalByScroll() {
		//window.pageYOffset - прокрученная часть страницы
		//document.documentElement.clientHeight - видимая часть сайта, которую видим в данный момент
		//window.pageYOffset + document.documentElement - прокрутка страницы + та часть которую мы выдим в данный момент (до нижней части видимого контента)
		//document.documentElement.scrollHeight- Вся высота документа
		if (window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight) {
			modalOpen();
			//удаляем обработчик событий, что-бы окно больше не вызывалось
			window.removeEventListener('scroll', showModalByScroll);
		}
	}


	// window.addEventListener('scroll', showModalByScroll);

	//Card template --------------------------------------------

	class MenuCard {
		constructor(src, alt, title, descr, price, parent, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.tansfer = 27;
			this.parent = document.querySelector(parent);
			this.classes = classes;
			this.changeToUAH();
		}

		changeToUAH() {
			this.price = this.price * this.tansfer;
		}

		render() {
			const element = document.createElement('div');

			if (this.classes.length === 0) {
				this.classes = 'menu__item';
				element.classList.add(this.classes);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML =
				`
					<img src=${this.src} alt=${this.alt}>
					<h3 class="menu__item-subtitle">${this.title}</h3>
					<div class="menu__item-descr">${this.descr}</div>
					<div class="menu__item-divider"></div>
					<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
					</div>
				`;
			this.parent.append(element);
		}
	}
	const getResource = async (url) => {
		const res = await fetch(url);

		return await res.json();
	};

	// getResource('http://localhost:3000/menu')
	// 	.then(data => {
	// 		data.forEach(({ img, altimg, title, descr, price }) => {
	// 			new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
	// 		});
	// 	});

	// getResource('http://localhost:3000/menu')
	// 	.then(data => createCard(data));

	axios.get('http://localhost:3000/menu')
		.then(data => {
			data.data.forEach(({ img, altimg, title, descr, price }) => {
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});

	function createCard(data) {
		data.forEach(({ img, altimg, title, descr, price }) => {

			const element = document.createElement('div');

			element.classList.add('menu__item');

			element.innerHTML = `
				<img src=${img} alt=${altimg}>
				<h3 class="menu__item-subtitle">${title}</h3>
				<div class="menu__item-descr">${descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${price}</span> грн/день</div>
				</div>
			`;

			document.querySelector('.menu .container').append(element);

		});
	}

	//Forms--------------------------------

	//получаем все формы
	const forms = document.querySelectorAll('form');

	//создаем объект с разными типами сообщений
	const message = {
		loading: "img/form/spinner.svg",
		success: "Спасибо! Скоро с вами свяжемся",
		failure: "Что-то пошло не так..."
	};

	//для каждой формы запускаем функцию postData
	forms.forEach(item => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});

		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {//событие когда пользователь нажал button в форме
			e.preventDefault();//сбрасываем стандартное поведение браузера

			//Создаем элемент с информационным сообщением и добавляем в конец формы
			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText =
				`
					display: block;
					margin: 0 auto;
				`;

			form.insertAdjacentElement('afterend', statusMessage);

			//Создаем объект конструктор, во внутрь помещаем форму из которой нужно собрать данные
			const formData = new FormData(form);//что-бы формы правильно работали, в верстке в input(и др эл. формы) должен быть атрибут name, иначе FormData() не сможет найти значения и правильно сформировать обьект

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(message.success);//инфо-сообщение о успешной операции
					statusMessage.remove();//удаляем инфо-сообщение через 2 секунды
				})
				.catch(() => {
					showThanksModal(message.failure);
				})
				.finally(() => {
					form.reset();//сбрасываем форму
				});
		});
	}


	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');

		modalOpen();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML =
			`
				<div class="modal__content">
					<div class="modal__close" data-close>&times;</div>
					<div class="modal__title">${message}</div>
				</div>
			`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			modalClose();
		}, 4000);
	}

	fetch('http://localhost:3000/menu')
		.then(data => data.json()
			.then(res => console.log(res)));


	//calc---------------------------------

	const result = document.querySelector('.calculating__result span');

	let sex,
		height,
		weight,
		age,
		ratio = 1.375;


	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', 1.375);
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);
		elements.forEach(elem => {
			elem.classList.remove(activeClass);
			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activeClass);
			}
			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activeClass);
			}
		});
	}

	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

	function calcTotal() {

		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '____';
			return;

		}

		if (sex === 'female') {

			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);

		} else {

			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);

		}

	}

	calcTotal();

	function getStaticInformation(selector, activeClass) {

		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}

				elements.forEach(elem => {
					elem.classList.remove(activeClass);
				});

				e.target.classList.add(activeClass);

				calcTotal();

			});
		});

	}

	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

	function getDinamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {

			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
			} else {
				input.style.border = 'none';
			}
			switch (input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}

			calcTotal();

		});



	}


	getDinamicInformation('#height');
	getDinamicInformation('#weight');
	getDinamicInformation('#age');
});