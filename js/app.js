$(function() {

	// Variable for counting hits made global in order for it to be added to
	var hitCount;

	// All button click functions

	// The button to start the game and reveal player 1's screen

	$(".begin").click(function() {
		$(".display").show();
		$("#player1").show();
		$("#player2").hide();
		$(".start-display").hide();
		$("#reset-message").hide();
		$("header").addClass("go-left");
		$(".cancel-message").hide();
	});

	// Buttons to display and close instructions box
	$("#instr-btn").click(function() {
		$("#instr-box").show();
	});
	$("#close").click(function() {
		$("#instr-box").hide();
	});

	// Buttons to reveal either player 1's or player 2's screens (mainly used while under construction of the game)
	$("#show1").click(function() {
		$("#player12").show();
		$("#show1").hide();
		$("#hide1").show();
	});
	$("#hide1").click(function() {
		$("#player12").hide();
		$("#show1").show();
		$("#hide1").hide();
	});
	$("#show2").click(function() {
		$("#player22").show();
		$("#show2").hide();
		$("#hide2").show();
	});
	$("#hide2").click(function() {
		$("#player22").hide();
		$("#show2").show();
		$("#hide2").hide();
	});

	// Button for resetting the displays (regenerating player boards and resetting hit counts)
	$(".playAgain").click(function() {
		clearAll();
		run();
		$("#reset-message").show();
		$(".appendage").hide();
		$(".cancel-message").hide();
	});
	$(".cancel").click(function() {
		$(".appendage").hide();
		$(".cancel-message").show();
	});


	// All functions

	// The function that generates the players' boards and resets the score
	

	function run() {
		hitCount = [0,0];
		generatePlayerDisplay($("#player11"), $("#player12"), $("#player22"), 0);
		generatePlayerDisplay($("#player21"), $("#player22"), $("#player12"), 1);
	}
	
	// Clears all li elements to be then regenerated when run() is called again by the reset button
	
	function clearAll() {
		$("#player11").empty();
		$("#player12").empty();
		$("#player21").empty();
		$("#player22").empty();
	}

	// Generates both the blank board and the one with boats for one player - the one with boats doesn't have a clickable grid
		// displays 1 and 2 are the for the two boards the player sees, one being blanks and the second containing boats
		// opponent is for the other player's boat-board, to check if a square has a boat element to hit
		// player refers to the index of hitCount which increments on hit
	function generatePlayerDisplay(display1, display2, opponent, player) {
		generateBoard(display1, opponent, player);
		generateBoard(display2);
		addBoats(display2);
	}

	// Creates one board by adding li elements to a given ul
		// display is the ul to add li elements to
		// opponent is the other player's boat-board
	function generateBoard(display, opponent, player) {
		var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]; // To be displayed in first column of grid
		for(var i = 0; i < 121; i++) {
			$(display).append($("<li></li>"));
		}
	
		// What to display in each li in the grid

		$(display).children().each(function (index, li) {
			if(index === 0){
				$(li).html(" ");
			} else if(index < 11) {
				$(li).html(index);
			} else if(index%11 === 0) {
				$(li).html(letters[index/11-1]);
			} else if(opponent) {				// If an opponent's board is specified it makes the board clickable and checks hit
				$(li).one("click", function() {
					if(hitCheck(index, opponent) === true) {
						hit($(li), opponent, index, player);
						winCheck(player);
					} else {
						miss($(li), display, opponent, index);
					}
				});
			}
		});
	}

	// What happens when an enemy boat is hit
	function hit(li, opponent, index, player) {
		var enemySquare = $(opponent).children();
		li.html("&#x25cf");
		li.addClass("red");
		$(enemySquare[index]).html("&#x25cf");
		$(enemySquare[index]).addClass("red");
		$(".hit").show();
		hitCount[player]++;
		$("#hitSound")[0].play();
	}

	// What happens when no boat is hit
	function miss(li, display, opponent, index) {
		var enemySquare = $(opponent).children();
		$(".hit").hide();
		li.html("&#x25cf");
		li.addClass("white");
		$(enemySquare[index]).html("&#x25cf");
		$(enemySquare[index]).addClass("white");
		$("#missSound")[0].play();
		$(display).parent().fadeOut(500);
		$(".message").fadeOut(500);
		setTimeout(function() {
			$(".miss").fadeIn(500);
		}, 500);
		$("#miss-btn").click(function() {
			$(".appendage").hide();
			$(display).parent().hide();
			$(opponent).parent().show();
		});
	}

	// Checks to see if a player has won by checking hits made by each player and displaying win messages if one has
	function winCheck() {
		if(hitCount[0] === 17) {
			$(".display").fadeOut(2000);
			setTimeout(function() {
				$("#win-display1").fadeIn(2000);
			}, 2000);
		} else if(hitCount[1] === 17){
			$(".display").fadeOut(2000);
			setTimeout(function() {
				$("#win-display2").fadeIn(2000);
			}, 2000);
		}
	}

	// Checks to see if the grid square clicked corresponds to a boat element on the opponents board, which is the display arg
	function hitCheck(num, display) {
		var lis = $(display).children()
		if($(lis[num]).hasClass("boat") === true) {
			return true;
		} else {
			return false;
		}
	}

	// Randomly adds boats to a specified board


	function addBoats(display) {
		var lis = $(display).children();
		var boats = [2, 3, 3, 4, 5];
		var check = false;
		while(boats.length !== 0) {					// While there are still boats to place
			var boat = selectNumber(boats);			// Select one to place
			var dimension = selectNumber([0,1]);	// Randomly determines the dimension the boat will be placed in (vertical/horizontal)
			while(check === false){
				if(dimension === 0) {				// 0 corresponds to a horizontal placing
					var position = randomGridPos(boat, 0);	// Generates a random location to place the boat in
					if(verify(boat, position, display, 0) === true){	// Verify checks whether the boat will overlap with another
						for(var i = 0; i < boat; i++) {
							$(lis[position + i]).addClass("boat grey");
						}
						check = true;
					}
				} else {										// Vertical placement and overlapping checks
					var position = randomGridPos(boat, 1);
					if(verify(boat, position, display, 1) === true){
						for(var i = 0; i < boat; i++) {
							$(lis[position + (i*11)]).addClass("boat grey");
						}
						check = true;	// check variable is for entering in and out of the position generating while loop
					}
				}
			}
			check = false;
		}
	}

	// Function for checking whether the position a boat will be placed in will overlap with another
		// Takes in the boat and the position, the display it will be placed in and the dimension to make checks in

	function verify(boat, position, display, dim) {
		var lis = $(display).children();
		var count = 0;
		if(dim === 0){
			for(var i = 0; i < boat; i++) {
				if($(lis[position + i]).hasClass("boat") === true) {
					count++;
				}
			}
		} else {
			for(var i = 0; i < boat; i++) {
				if($(lis[position + (i*11)]).hasClass("boat") === true) {
					count++;
				}
			}
		}
		if(count === 0) {
			return true;
		}
	}
	
	// Generates a random position in the grid to possibly place a boat in
		// num depends in the size of the boat to be placed and dim the dimension in which it is being placed
	function randomGridPos(num, dim) {
		if(dim === 0) {
			var row = Math.ceil(Math.random()*10);
			var col = Math.ceil(Math.random()*(10 - num));	// Reduces the possible columns to place a boat in to stop them overlapping rows
		} else {												// eg. a boat of length 5 can only be placed in columns 1-5 so it doesn't carry on into the next row
			var row = Math.ceil(Math.random()*(10 - num));	// Same logic for vertical placement
			var col = Math.ceil(Math.random()*10);
		}
		return (row*11) + col;
	}

	// Returns a number from an array and removes it from the array
	function selectNumber(numberArray) {
        var randomNumber = Math.floor(Math.random()*numberArray.length);
        var number = numberArray.splice(randomNumber, 1)[0];
        
        return number;
    }

	
	
    run();


});

