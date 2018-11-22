
function convert_schedule(schedule) {
	var months = 0;	
	if ('monthly' == schedule) { months = 1; }
	if ('annually' == schedule) { months = 12; }	
	
	return months;
}

function hide_card_choices() {
	/* Hide the Gb choices for the family cards */
	for ( i = 1; i < 6; i++ ) {
		$('#card--' + i).hide();
	}
}


$('#wolf--calculate').click(function(event) {
	event.preventDefault();

	var price = $('#wolf input[name="plan--price"]:checked').val();
	var schedule = $('#wolf input[name="plan--schedule"]:checked').val();	
	var months = convert_schedule(schedule);

	var total = price * months;
		
	$('#wolf .plan--cost p').html('Total cost: £' + total + ' ' + schedule);
});

$('#chatterbox--calculate').click(function(event) {
	event.preventDefault();
	
	var price = $('#chatterbox input[name="plan--price"]:checked').val();
	var minutes = $('#chatterbox input[name="plan--min"]:checked').val();
	var schedule = $('#chatterbox input[name="plan--schedule"]:checked').val();	
	var months = convert_schedule(schedule);

	var total = ( parseInt(price) + parseInt(minutes) ) * months;
	
	$('#chatterbox .plan--cost p').html('Total cost: £' + total + ' ' + schedule);
});


var cards = 0;
hide_card_choices();

$('button[name="plan--cards"]').click(function(event) {
	event.preventDefault();
	hide_card_choices();
	
	cards = $(this).attr('value');
	$('#card--' + cards).show();
});


$('#family--calculate').click(function(event) {
	event.preventDefault();
	
	var price = $('#card--' + cards + ' input[name="plan--price"]:checked').val();
	var schedule = $('#family input[name="plan--schedule"]:checked').val();	
	var months = convert_schedule(schedule);

	var total = price * months;
	
	$('#family .plan--cost p').html('Total cost: £' + total.toFixed(2) + ' ' + schedule);

});
