function modal() {

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

}

module.exports = modal;