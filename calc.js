/* global console, alert */

jQuery(document).ready( function ($) {
	'use strict';

	$('.clear_results').click(function () {
		$('#' + $(this).attr('data-rel')).html('');
	});

	$('input[name=type]').change(function () {

		$('[for="proof"]').text(
			$(this).attr('id') === 'type_spirit' ?
				'Proof' :
				'ABV %'
		);

	});

	$('#drink_cost').submit(function (e) {
		e.preventDefault();

		// Cached selectors

		var thisForm = $(this);
		var percentEl = $('#proof');
		var volumeEl = $('#volume');
		var costEl = $('#cost');

		var percent = parseInt(percentEl.val(), 10);
		var type = thisForm.find('[name="type"]:checked').val();

		if (!percent) {
			alert('Need a ' + $('[for="proof"]').text());
			return;
		}

		// Cost calc below expects percent
		// Converts proof to percent

		if (type === 'spirit') {
			percent = percent / 2;
		}

		var volume = parseInt(volumeEl.val(), 10);
		var units = thisForm.find('[name="units"]:checked').val();

		if (!volume) {
			alert('Need a volume');
			return;
		}

		// Cost calc below expects mL
		// Converts from ounces to mL

		if (units === 'oz') {
			volume = volume * 29.5735;
		}

		var cost = costEl.val();

		if (!cost) {
			alert('Need a cost');
			return;
		}

		var costPerDrink = calcDrinkCost(percent, volume, cost);

		$('#drink_cost_rows')
			.append($('<tr/>')
				.append($('<td/>').text(percent + '%'))
				.append($('<td/>').text(Math.round(volume * 10) / 10 + ' mL'))
				.append($('<td/>').text('$' + cost))
				.append($('<td/>').text('$' + Math.round(costPerDrink * 100) / 100))
			);

		// Clear out fields
		percentEl.val('');
		volumeEl.val('');
		costEl.val('');

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