/* global console, alert */

jQuery(document).ready( function ($) {
	'use strict';

	$('.js-clear-results').click(function () {
		$('#' + $(this).attr('data-rel')).find('.calc-row').remove();
		$('#js-no-results').show();
	});


	$('#drink_cost').submit(function (e) {
		e.preventDefault();

		// Cached selectors

		var thisForm = $(this);
		var percentEl = $('[name="alc-content"]');
		var volumeEl = $('[name="volume"]');
		var costEl = $('[name="cost"]');

		var percent = parseInt(percentEl.val(), 10);
		var type = thisForm.find('[name="alc-type"]:checked').val();

		if (!percent) {
			alert('Need ' + $('[for="proof"] .label-text').text());
			return;
		}

		// Cost calc below expects percent
		// Converts proof to percent

		if (type === 'proof') {
			percent = percent / 2;
		}

		var volume = parseInt(volumeEl.val(), 10);
		var units = thisForm.find('[name="units"]:checked').val();

		if (!volume) {
			alert('Need ' + $('[for="volume"] .label-text').text());
			return;
		}

		// Cost calc below expects mL
		// Converts from ounces to mL

		if (units === 'oz') {
			volume = volume * 29.5735;
		}

		var cost = costEl.val();

		if (!cost) {
			alert('Need ' + $('[for="cost"] .label-text').text());
			return;
		}

		var costPerDrink = calcDrinkCost(percent, volume, cost);

		$('#js-no-results').hide();

		$('#drink-calcs')
			.append($('<tr/>')
				.addClass('calc-row')
				.append($('<td/>').text(percent + '%'))
				.append($('<td/>').text(Math.round(volume * 10) / 10 + ' mL'))
				.append($('<td/>').text('$' + cost))
				.append($('<td/>').text('$' + Math.round(costPerDrink * 100) / 100))
			);

	});

});

function calcDrinkCost(p, v, c) {
	'use strict';

	// USA standard drink is 1.4mL of pure ethanol
	// https://en.wikipedia.org/wiki/Standard_drink#Defined_by_various_countries

	var percentAlc = ( p / 100 );
	var totalAlc = v * percentAlc;
	var totalDrinks = totalAlc / 17.7;

	return c / totalDrinks;
}