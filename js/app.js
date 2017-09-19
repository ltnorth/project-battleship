$(function() {

	var hitCount;

	function run() {
		hitCount = [0,0];
		generatePlayerDisplay($("#player11"), $("#player12"), $("#player22"), 0);
		generatePlayerDisplay($("#player21"), $("#player22"), $("#player12"), 1);
	}
	
	
	$(".begin").click(function() {
		$(".display").show();
		$("#player1").show();
		$("#player2").hide();
		$("#start-display").hide();
	});
	$("#show1").click(function showP1() {
		$(".display").show();
		$("#player2").hide();
		$("#player1").show();
	});
	$("#show2").click(function showP2() {
		$(".display").show();
		$("#player1").hide();
		$("#player2").show();
	});
	$(".reset").click(function() {
		clearAll();
		run();
		$("#start-display").show();
		$(".appendage").hide();
	});
	
	function clearAll() {
		$("#player11").empty();
		$("#player12").empty();
		$("#player21").empty();
		$("#player22").empty();
	}

	function generatePlayerDisplay(display1, display2, opponent, player) {
		generateBoard(display1, opponent, player);
		generateBoard(display2);
		addBoats(display2);
	}

	function generateBoard(display, opponent, player) {
		var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
		for(var i = 0; i < 121; i++) {
			$(display).append($("<li></li>"));
		}
	
		$(display).children().each(function (index, li) {
			if(index === 0){
				$(li).html(" ");
			} else if(index < 11) {
				$(li).html(index);
			} else if(index%11 === 0) {
				$(li).html(letters[index/11-1]);
			} else if(opponent) {
				$(li).one("click", function() {
					if(hitCheck(index, opponent) === true) {
						hit($(li), player);
						winCheck(player);
					} else {
						miss($(li), display, opponent);
					}
				});
			}
		});

	}

	function hit(li, player) {
		li.html("&#x25cf");
		li.addClass("red");
		$(".hit").show();
		hitCount[player]++;
	}

	function miss(li, display, opponent) {
		$(".hit").hide();
		li.html("&#x25cf");
		li.addClass("white");
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

	function hitCheck(num, display) {
		var lis = $(display).children()
		if($(lis[num]).hasClass("boat") === true) {
			return true;
		} else {
			return false;
		}
	}


	function addBoats(display) {
		var lis = $(display).children();
		var boats = [2, 3, 3, 4, 5];
		var check = false;
		while(boats.length !== 0) {
			var boat = selectNumber(boats);
			var dimension = selectNumber([0,1]);
			while(check === false){
				if(dimension === 0) {
					var position = randomGridPos(boat, 0);
					if(verify(boat, position, display, 0) === true){
						for(var i = 0; i < boat; i++) {
							$(lis[position + i]).addClass("boat");
						}
						check = true;
					}
				} else {
					var position = randomGridPos(boat, 1);
					if(verify(boat, position, display, 1) === true){
						for(var i = 0; i < boat; i++) {
							$(lis[position + (i*11)]).addClass("boat");
						}
						check = true;
					}
				}
			}
			check = false;
		}
	}

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
	
	function randomGridPos(num, dim) {
		if(dim === 0) {
			var row = Math.ceil(Math.random()*10);
			var col = Math.ceil(Math.random()*(10 - num));
		} else {
			var row = Math.ceil(Math.random()*(10 - num));
			var col = Math.ceil(Math.random()*10);
		}
		return (row*11) + col;
	}


	function selectNumber(numberArray) {
        var randomNumber = Math.floor(Math.random()*numberArray.length);
        var number = numberArray.splice(randomNumber, 1)[0];
        
        return number;
    }

	
	














    run();


});

