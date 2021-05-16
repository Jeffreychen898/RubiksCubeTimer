const CONSTANTS = {
	ELEMENTS: {
		SCRAMBLE: $("scramble"),
		TIMER: $("timer")
	},
	PROPERTIES: {
		TIMER: {
			WAIT_TIME: 400,
			COLORS: {
				STOP: "#CDCDCD",
				WAIT: "#FF0000",
				RUN: "#00FF00"
			}
		},
		SCRAMBLE: {
			MOVES: 20
		}
	}
}

const scramble_element = $("scramble");
const timer_element = $("timer");

let wait = new Timer();
let timer = new Timer();

function setup() {
	CONSTANTS.ELEMENTS.SCRAMBLE.innerHTML = generateScramble(CONSTANTS.PROPERTIES.SCRAMBLE.MOVES).join(" ");
}

function keyPressed() {
	if(timer.started)
		stopTimer();
	else if(!wait.started) {
		wait.start();
		CONSTANTS.ELEMENTS.TIMER.style.color = CONSTANTS.PROPERTIES.TIMER.COLORS.WAIT;
		runAnimation();
	}
}

function keyReleased() {
	if(!timer.started) {
		if(wait.getTime() > CONSTANTS.PROPERTIES.TIMER.WAIT_TIME) {
			timer.start();
			wait.reset();
			startTimer();
		} else {
			wait.reset();
			CONSTANTS.ELEMENTS.TIMER.style.color = CONSTANTS.PROPERTIES.TIMER.COLORS.STOP;
		}
	}
}

function runAnimation() {
	if(wait.getTime() > CONSTANTS.PROPERTIES.TIMER.WAIT_TIME) {
		CONSTANTS.ELEMENTS.TIMER.style.color = CONSTANTS.PROPERTIES.TIMER.COLORS.RUN;
	}
	if(timer.started) {
		CONSTANTS.ELEMENTS.TIMER.innerHTML = readableTime(timer.getTime());
	}
	if(wait.started || timer.started)
		requestAnimationFrame(runAnimation);
}

function startTimer() {
	CONSTANTS.ELEMENTS.TIMER.style.color = CONSTANTS.PROPERTIES.TIMER.COLORS.RUN;
}

function stopTimer() {
	recordSolve(readableTime(timer.getTime()));
	timer.reset();
	CONSTANTS.ELEMENTS.SCRAMBLE.innerHTML = generateScramble(CONSTANTS.PROPERTIES.SCRAMBLE.MOVES).join(" ");
}

function recordSolve(solveTime) {
	const parent_element = $("solve-container");
	parent_element.innerHTML += `<li class="each-solve">${solveTime}</li>`;
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
	element.innerHTML = generateScramble(CONSTANTS.PROPERTIES.SCRAMBLE.MOVES).join(" ");
}

window.onload = () => {
	setup();

	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
}


