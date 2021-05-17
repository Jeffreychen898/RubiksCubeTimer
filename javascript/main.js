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
			MOVES: 15
		}
	}
}

const htmlHelper = new HTMLHelper();
const countup = new CountUp();

function setup() {
	CONSTANTS.ELEMENTS.SCRAMBLE.innerHTML = generateScramble(CONSTANTS.PROPERTIES.SCRAMBLE.MOVES).join(" ");
}

function keyPressed(event) {
	if(event.keyCode == 32)
		countup.keyPressed();
}

function keyReleased() {
	if(event.keyCode == 32)
		countup.keyReleased();
}

window.onload = () => {
	setup();

	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
}


