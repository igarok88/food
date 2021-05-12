import { modalOpen, modalClose } from './modal';
import { postData } from '../services/services';

function forms(formSelector, modalTimerId) {

	//Forms--------------------------------

	//получаем все формы
	const forms = document.querySelectorAll(formSelector);

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

		modalOpen('.modal', modalTimerId);

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
			modalClose('.modal');
		}, 4000);
	}

	fetch('http://localhost:3000/menu')
		.then(data => data.json()
			.then(res => console.log(res)));

}

export default forms;