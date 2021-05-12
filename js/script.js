'use strict';


import tabs from './modules/tabs';
import modal from './modules/modal';
import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import timer from './modules/timer';
import { openModal } from './modules/modal';

//срабатывает событие, после того как HTML полностью прогрузился
window.addEventListener('DOMContentLoaded', () => {

	let modalTimerId = setTimeout(() => modalOpen('.modal', modalTimerId), 500000);


	tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
	modal('[data-modal]', '.modal', modalTimerId);
	calc();
	cards();
	forms('form', modalTimerId);
	slider({

		prevArrow: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner',
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',

	});
	timer('.timer', '2021-06-11');

});