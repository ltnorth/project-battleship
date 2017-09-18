$(function() {
	var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
	var which = true;
	for(var i = 0; i < 121; i++) {
		$("ul").append($("<li></li>"));
	}

	$("li").each(function (index, li) {
		if(index === 0){
			$(li).html("x");
		} else if(index < 11) {
			$(li).html(index);
		} else if(index%11 === 0) {
			$(li).html(letters[index/11-1]);
		} else {
			$(li).one("click", function() {
				switch(which){
					case true:
						red($(li));
						which = false;
						break;
					case false:
						white($(li));
						which = true;
						break;
				}
			});
		}
	});
});

function red(li) {
	li.html("&#x25cf");
	li.addClass("red");
}
function white(li) {
	li.html("&#x25cf");
	li.addClass("white");
}