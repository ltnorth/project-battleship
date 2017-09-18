$(function() {
	var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
	var player1;
	var player2;

	generatePlayerDisplay($("#player11"), $("#player12"), $("#player22"));
	generatePlayerDisplay($("#player21"), $("#player22"), $("#player12"));


	$("#show1").click(function() {
		$(".display").show();
		$("#player2").hide();
		$("#player1").show();
	});
	$("#show2").click(function() {
		$(".display").show();
		$("#player1").hide();
		$("#player2").show();
	});

	function generatePlayerDisplay(display1, display2, display3) {
		generateBoard(display1, display3);
		generateBoard(display2);
		addBoats(display2);
	}

	function generateBoard(display, display2) {
		for(var i = 0; i < 121; i++) {
			$(display).append($("<li></li>"));
		}
	
		$(display).children().each(function (index, li) {
			if(index === 0){
				$(li).html("x");
			} else if(index < 11) {
				$(li).html(index);
			} else if(index%11 === 0) {
				$(li).html(letters[index/11-1]);
			} else {
				$(li).one("click", function() {
					if(hitCheck(index, display2) === true) {
						red($(li));
					} else {
						white($(li));
					}
					
				});
			}
		});

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

	function red(li) {
		li.html("&#x25cf");
		li.addClass("red");
	}
	function white(li) {
		li.html("&#x25cf");
		li.addClass("white");
	}


















});

