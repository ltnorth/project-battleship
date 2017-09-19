$(function() {

	var hitCountP1 = 0;
	var hitCountP2 = 0;
	var hitCount = [0,0];
	generatePlayerDisplay($("#player11"), $("#player12"), $("#player22"), 0);
	generatePlayerDisplay($("#player21"), $("#player22"), $("#player12"), 1);
	
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
			} else {
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
		$("#missBtn").click(function() {
			$(".appendage").hide();
			$(display).parent().hide();
			$(opponent).parent().show();
		});
	}

	function winCheck() {
		console.log("You got here");
		if(hitCount[0] === 17) {
			$(".display").fadeOut(2000);
			setTimeout(function() {
				$("#winDisplay1").fadeIn(2000);
			}, 2000);
		} else if(hitCount[1] === 17){
			$(".display").fadeOut(2000);
			setTimeout(function() {
				$("#winDisplay2").fadeIn(2000);
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

