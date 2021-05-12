function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {


	// Tabs ------------------------------------------------------

	const tabs = document.querySelectorAll(tabsSelector), //получаем заголовки табов
		tabsContent = document.querySelectorAll(tabsContentSelector), //получаем контент табов
		tabsParent = document.querySelector(tabsParentSelector); //получаем родителей заголовков табов

	function hideTabContent() {
		tabsContent.forEach((item) => { //перебираем массив и каждому элементу добавляем класс hide и удаляем add
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});
		//убираем класс у заголовков табов
		tabs.forEach((item) => {
			item.classList.remove(activeClass);
		});
	}
	//показываем текущий таб, по умолчанию с индексом 0
	function showTabContent(index = 0) {
		tabsContent[index].classList.add('show', 'fade');
		tabsContent[index].classList.remove('hide');
		tabs[index].classList.add(activeClass);
	}

	hideTabContent();
	showTabContent();
	//делегируем событие. в родителе табов отслеживаем событие клик, и проверяем если выбраный элемент имеет класс tabheader__item, то начинаем перебор табов и ищем элемент на который мы кликнули, запускаем ф-ции очистки hideTabContent и showTabContent(index) с индексом выбранного элемента
	tabsParent.addEventListener('click', (event) => {
		const target = event.target;
		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, index) => {
				if (target == item) {
					hideTabContent();
					showTabContent(index);
				}
			});
		}
	});

}

export default tabs;