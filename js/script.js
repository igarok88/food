'use strict';



//срабатывает событие, после того как HTML полностью прогрузился
window.addEventListener('DOMContentLoaded', () => {

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

	const deadLine = '2021-04-17'; // устанавливаем дату окончания отсчета

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
	const modalCloseBtn = document.querySelector('[data-close]');


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


	modalCloseBtn.addEventListener('click', modalClose);


	//проверяем что кликнули по подложке модального окна, и вызываем функцию
	modal.addEventListener('click', (event) => {
		if (event.target == modal) {
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


	let modalTimer = setTimeout(modalOpen, 3000);


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


	window.addEventListener('scroll', showModalByScroll);


});