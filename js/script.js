'use strict';

//срабатывает событие, после того как HTML полностью прогрузился
window.addEventListener('DOMContentLoaded', () => {

	const tabs = require('./modules/tabs'),
		modal = require('./modules/modal'),
		calc = require('./modules/calc'),
		cards = require('./modules/cards'),
		forms = require('./modules/forms'),
		slider = require('./modules/slider'),
		timer = require('./modules/timer');

	tabs();
	modal();
	calc();
	cards();
	forms();
	slider();
	timer();

});