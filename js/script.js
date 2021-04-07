'use strict';
//срабатывает событие, после того как HTML полностью прогрузился
window.addEventListener('DOMContentLoaded', () => {

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

});