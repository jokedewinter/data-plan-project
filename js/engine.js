/* ------------------
 * Hide the monthly/annually section until a choice is made
 * -------------------------- */

$(".schedule").hide();


/* ------------------
 * Monthly / Annual price function
 * ------------------------------- */

function payment_schedule(plan, price) {
	
	price = parseFloat(price);
	$(plan + " .schedule--monthly").text("£ " + price.toFixed(2));
	$(plan + " .schedule--annually").text("£ " + (price * 12).toFixed(2));
	/* Show the monthly/annually section again */
	$(plan + ".schedule").show();
}


/* ------------------
 * wolf
 * -------------------------- */

$(".wolf--price").click(function(event) {

	$(".wolf--price").removeClass("active");
	$(this).addClass("active");

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
	
	$(".chatterbox--price").removeClass("active");
	$(this).addClass("active");

	chatterbox_price = 0;
	$(".schedule").hide();
	
	chatterbox_gb = this.getAttribute("data-gb");
	chatterbox_gb_price = parseInt(this.getAttribute("data-price"));
	
	$("#chatterbox .min").show();
});

$(".chatterbox--min").click(function(event) {

	$(".chatterbox--min").removeClass("active");
	$(this).addClass("active");

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

/* Hide the GB choices for the family cards */
function hide_card_choices() {
	$("#family .gb").hide();
}

var family_cards = '';
var family_gb = '';
var family_price = 0;
hide_card_choices();

/* Two dimensional array to store all the prices */
var cards = [
	["14.00", "20.00", "30.00", "40.00"],
	["21.20", "32.00", "50.00", "14.00"],
	["28.40", "44.00", "70.00", "96.00"],
	["35.60", "56.00", "90.00", "124.00"],
	["42.80", "68.00", "110.00", "152.00"]];


$(".family--cards").click(function(event) {
	
	hide_card_choices();
	$(".schedule").hide();
	
	$(".family--cards").removeClass("active");
	$(this).addClass("active");

	family_cards = this.getAttribute("data-cards");
	
	/* Update the amount of sim cards title */
	$("#family .gb h3 .amount").text(family_cards);
	if ( family_cards > 1 ) { 
		$("#family .gb h3 .plural").text("s");
	}
	
	/* Determine which row in the array to use. 
	   Arrays start from 0, so hence the -1 */
	var card_row = parseInt(family_cards)-1;
	
	/* Populate the buttons with prices */
	for ( var i = 1; i < 5; i++ ) {
		$("#family .gb button:nth-of-type(" + i + ") .data-price").text("£" + cards[card_row][i - 1]);
	}
	
	/* Show the buttons */
	$("#family .gb").show();
	
	/* Do something with the GB button click */
	$('.family--gb').click(function(event) {
		
		$(".family--gb").removeClass("active");
		$(this).addClass("active");

		family_gb = this.getAttribute("data-gb");
		
		switch (family_gb) {
			case "1GB":
				family_price = cards[card_row][0];
				break;
			case "10GB":
				family_price = cards[card_row][1];
				break;
			case "20GB":
				family_price = cards[card_row][2];
				break;
			case "40GB":
				family_price = cards[card_row][3];
				break;
		}
		
		$(".family--cost .schedule--cards").text(family_cards);
		$(".family--cost .schedule--gb").text(family_gb);
		payment_schedule(".family--cost", family_price);
	});
	
	
});