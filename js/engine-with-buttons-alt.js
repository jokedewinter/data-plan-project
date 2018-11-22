/* ------------------
 * Hide the monthly/annually section until a choice is made
 * -------------------------- */

$(".schedule").hide();


/* ------------------
 * Monthly / Annual price function
 * ------------------------------- */

function payment_schedule(plan, price) {
	
	$(plan + " .schedule--monthly").text("£ " + price);
	$(plan + " .schedule--annually").text("£ " + (price * 12));
	/* Show the monthly/annually section again */
	$(plan + ".schedule").show();
}


/* ------------------
 * wolf
 * -------------------------- */

$(".wolf--price").click(function(event) {

	var wolf_gb = this.getAttribute("data-gb");
	var wolf_price = this.getAttribute("data-price");
	
	$(".wolf--cost .schedule--gb").text(wolf_gb);
	payment_schedule(".wolf--cost", wolf_price);
});


/* ------------------
 * chatterbox
 * -------------------------- */

var chatterbox_gb = '';
var chatterbox_min = '';
var chatterbox_gb_price = 0;
var chatterbox_min_price = 0;
var chatterbox_price = 0;

$("#chatterbox .min").hide();

$(".chatterbox--price").click(function(event) {
	
	chatterbox_price = 0;
	$(".schedule").hide();
	
	chatterbox_gb = this.getAttribute("data-gb");
	chatterbox_gb_price = parseInt(this.getAttribute("data-price"));
	
	$("#chatterbox .min").show();
});

$(".chatterbox--min").click(function(event) {

	chatterbox_min = this.getAttribute("data-min");
	chatterbox_min_price = parseInt(this.getAttribute("data-price"));
	
	chatterbox_price = chatterbox_gb_price + chatterbox_min_price;
	
	$(".chatterbox--cost .schedule--gb").text(chatterbox_gb);
	$(".chatterbox--cost .schedule--min").text(chatterbox_min);
	payment_schedule(".chatterbox--cost", chatterbox_price);
});
	

/* ------------------
 * family
 * -------------------------- */

function hide_card_choices() {

	/* Hide the GB choices for the family cards */
	$("#family .gb h4").hide();
	for ( i = 1; i < 6; i++ ) {
		$('#family--' + i).hide();
	}
}

var family_cards = '';
var family_gb = '';
var family_price = 0;
hide_card_choices();

$(".family--cards").click(function(event) {
	
	hide_card_choices();
	$(".schedule").hide();
	
	family_cards = this.getAttribute("data-cards");
	
	$("#family .gb h4").show();
	$('#family--' + family_cards).show();	
	
	$('.family-' + family_cards).click(function(event) {
		
		family_gb = this.getAttribute("data-gb");
		family_price = parseInt(this.getAttribute("data-price"));

		$(".family--cost .schedule--cards").text(family_cards);
		$(".family--cost .schedule--gb").text(family_gb);
		payment_schedule(".family--cost", family_price);
	});
});


	