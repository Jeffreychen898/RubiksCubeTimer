const WAIT_TIME = 400;
const scramble_element = $("scramble");
const timer_element = $("timer");

let wait = new Timer();
let timer = new Timer();

function setup() {
	scramble_element.innerHTML = generateScramble().join(" ");
}

function keyPressed() {
	if(timer.started)
		stopTimer();
	else if(!wait.started) {
		wait.start();
		timer_element.style.color = "red";
		runAnimation();
	}
}

function keyReleased() {
	if(!timer.started) {
		if(wait.getTime() > WAIT_TIME) {
			timer.start();
			wait.reset();
			startTimer();
		} else {
			wait.reset();
			timer_element.style.color = "#CDCDCD";
		}
	}
}

function runAnimation() {
	if(wait.getTime() > WAIT_TIME) {
		timer_element.style.color = "#00FF00";
	}
	if(timer.started) {
		timer_element.innerHTML = readableTime(timer.getTime());
	}
	if(wait.started || timer.started)
		requestAnimationFrame(runAnimation);
}

function startTimer() {
	timer_element.style.color = "#00FF00";
}

function stopTimer() {
	timer.reset();
	scramble_element.innerHTML = generateScramble().join(" ");
}

function readableTime(millis) {
	let centisec = Math.floor(millis / 10) % 100;
	let seconds = Math.floor(millis / 1000) % 60;
	let minutes = Math.floor(millis / 60000);

	centisec = (centisec > 9)?centisec:"0" + centisec;
	const minutes_result = (minutes > 0)?minutes + ":":"";
	return minutes_result + seconds + "." + centisec;
}

/* element events */
function newScramble(element) {
	element.innerHTML = generateScramble().join(" ");
}

window.onload = () => {
	setup();

	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
}


