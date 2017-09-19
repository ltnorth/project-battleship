$(function() {

	
	generatePlayerDisplay($("#player11"), $("#player12"), $("#player22"));
	generatePlayerDisplay($("#player21"), $("#player22"), $("#player12"));
	
	$("#begin").click(function() {
		$(".display").show();
		$("#player1").show();
		$("#player2").hide();
		$("#startDisplay").hide();
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
	$("#missBtn").click(function() {
		$(".appendage").hide();
		$("div:visible").hide();
		$("div:hidden").show();
	});

	function generatePlayerDisplay(display1, display2, opponent) {
		generateBoard(display1, opponent);
		generateBoard(display2);
		addBoats(display2);
	}

	function generateBoard(display, display2) {
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
			} else {
				$(li).one("click", function() {
					if(hitCheck(index, display2) === true) {
						hit($(li));

					} else {
						miss($(li), display);
						

					}
				});
			}
		});

	}

	function hit(li) {
		li.html("&#x25cf");
		li.addClass("red");
		$(".hit").show();
	}

	function miss(li, display) {
		li.html("&#x25cf");
		li.addClass("white");
		$(display).parent().fadeOut(500);
		$(".message").fadeOut(500);
		setTimeout(function() {
			$(".miss").fadeIn(500);
		}, 500);
	}

	// function winCheck(num) {
	// 	if(num === 17) {

	// 	}
	// }

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
			while(check === false){
				var position = randomGridPos(boat);
				if(verify(boat, position, display) === true){
					for(var i = 0; i < boat; i++) {
						$(lis[position + i]).addClass("boat");
					}
					check = true;
				}
			}
			check = false;
		}
	}

	function verify(boat, position, display) {
		var lis = $(display).children();
		var count = 0;
		for(var i = 0; i < boat; i++) {
			if($(lis[position + i]).hasClass("boat") === true) {
				count++;
			}
		}
		if(count === 0) {
			return true;
		}
	}
	
	function randomGridPos(num) {
		var row = Math.ceil(Math.random()*10);
		var col = Math.ceil(Math.random()*(10 - num));
		return (row*11) + col;
	}


	function selectNumber(numberArray) {
        var randomNumber = Math.floor(Math.random()*numberArray.length);
        var number = numberArray.splice(randomNumber, 1)[0];
        
        return number;
    }

	
	

















});

