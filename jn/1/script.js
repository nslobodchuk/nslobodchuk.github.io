var a = Math.floor(Math.random()*100+1);

var count = 0;
var input = document.getElementsByTagName("input")[0];
var feedback = document.getElementsByClassName("feedback")[0];

var guess = -1;

document.getElementsByClassName('button')[0]
.addEventListener('click', function(){
	if(guess!==input.value){
		processInput(input.value)
		guess = input.value;
	}
});

document.getElementsByTagName('input')[0]
.addEventListener('input', function(e){
	(function (value){
		setTimeout(function(){
			if(value===input.value&&guess!==input.value) {
				processInput(value);
				guess=input.value;
			}
		}, 4000)
		})(e.target.value)
});

function processInput(value) {

	if ((+value)<a&&value!==""){
		feedback.textContent =value + ' is too low!';
		++count;
	} else if ((+value)>a&&value!=="") {
		feedback.textContent = value + ' is too high!';
		++count;
	} else if ((+value)===a){
		feedback.textContent = "Correct! The answer is " +a +". You made "+ (++count) + " tries. We've generated a new number. Try again.";
		a = Math.floor(Math.random()*100+1);
		count = 0;
	}
}
