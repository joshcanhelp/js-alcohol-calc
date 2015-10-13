jQuery(document).ready( function ($) {
	"use strict";

	$('.clear_results').click(function () {
		$('#' + $(this).attr('data-rel')).html('');
	});

	$('input[name=type]').change(function () {

	});

	$('#drink_cost').submit(function (e) {
		e.preventDefault();

		var proof = $(this).find('#proof').val();
		var volume = $(this).find('#volume').val();
		var cost = $(this).find('#cost').val();
		var costPerDrink = calc_drink_cost(proof, volume, cost);

		if (isNaN(costPerDrink)) {
			alert('Cannot calc!');
			return;
		}

		$('#drink_cost_rows')
			.append($('<tr/>')
				.append($('<td/>').text(proof))
				.append($('<td/>').text(volume))
				.append($('<td/>').text(cost))
				.append($('<td/>').text(Math.round(costPerDrink * 100) / 100))
			);

	});

});

function calc_drink_cost(p, v, c) {
	"use strict";

	return ( c * 1.205 + ( ( v / 1000 ) * 3.7708 ) ) / ( ( ( p / 200 ) / 0.4 ) * v * 0.033814 );
}