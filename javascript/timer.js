class CountUp {
	constructor() {
		this.countup_timer = 0;
		this.wait = new Timer();
		this.timer = new Timer();

		this.solves_record = [];
	}

	keyPressed() {
		if(this.timer.started)
			this.timerStop();
		else if(!this.wait.started) {
			this.wait.start();
			CONSTANTS.ELEMENTS.TIMER.style.color = CONSTANTS.PROPERTIES.TIMER.COLORS.WAIT;
			this.runAnimationFrame();
		}
	}

	keyReleased() {
		if(!this.timer.started) {
			if(this.wait.getTime() > CONSTANTS.PROPERTIES.TIMER.WAIT_TIME) {
				this.timer.start();
				this.wait.reset();
				this.timerStart();
			} else {
				this.wait.reset();
				CONSTANTS.ELEMENTS.TIMER.style.color = CONSTANTS.PROPERTIES.TIMER.COLORS.STOP;
			}
		}
	}

	readableTime(millis) {
		let centisec = Math.floor(millis / 10) % 100;
		let seconds = Math.floor(millis / 1000) % 60;
		let minutes = Math.floor(millis / 60000);

		centisec = (centisec > 9)?centisec:"0" + centisec;
		const minutes_result = (minutes > 0)?minutes + ":":"";
		return minutes_result + seconds + "." + centisec;
	}

	/* @private */
	timerStart() {
		CONSTANTS.ELEMENTS.TIMER.style.color = CONSTANTS.PROPERTIES.TIMER.COLORS.RUN;
	}

	timerStop() {
		this.recordSolve();
		this.timer.reset();
		CONSTANTS.ELEMENTS.SCRAMBLE.innerHTML = generateScramble(CONSTANTS.PROPERTIES.SCRAMBLE.MOVES).join(" ");
	}

	runAnimationFrame() {
		if(this.wait.getTime() > CONSTANTS.PROPERTIES.TIMER.WAIT_TIME)
			CONSTANTS.ELEMENTS.TIMER.style.color = CONSTANTS.PROPERTIES.TIMER.COLORS.RUN;

		if(this.timer.started) {
			CONSTANTS.ELEMENTS.TIMER.innerHTML = this.readableTime(this.timer.getTime());
			this.countup_timer = this.timer.getTime();
		}

		if(this.wait.started || this.timer.started) {
			requestAnimationFrame(() => {
				this.runAnimationFrame();
			});
		}
	}

	recordSolve() {
		const new_element = `
		<li class="each-solve" onclick="displaySolve(this)" data-index=${this.solves_record.length}>
		${this.readableTime(this.countup_timer)}
		</li>`;

		const parent_element = $("solve-container");
		parent_element.innerHTML = new_element + parent_element.innerHTML;
		this.solves_record.push({
			time: this.countup_timer,
			scramble: CONSTANTS.ELEMENTS.SCRAMBLE.innerHTML
		});
	}
}

class Timer {
	constructor() {
		this.started = false;
		this.started_time = 0;
	}

	getTime() {
		if(this.started) {
			const current_time = new Date().getTime();
			return current_time - this.started_time;
		}
		return 0;
	}

	reset() {
		this.started = false;
	}

	start() {
		this.started = true;
		this.started_time = new Date().getTime();
	}
}

function average(amount, record) {
	let outlier = {
		max: undefined,
		min: undefined
	};
	let list = [];
	for(let i=record.length - 1;i>=0;i--) {
		if(record[i]) {
			if(outlier.max) {
				if(record[i] > outlier.max)
					outlier.max = record[i];
			} else
				outlier.max = record[i];

			if(outlier.min) {
				if(record[i] < outlier.min)
					outlier.min = record[i];
			} else
				outlier.min = record[i];

			list.push(record[i]);
			if(list.length == amount)
				break;
		}
	}
	if(list.length == amount) {
		let sum = 0;
		for(let i=0;i<list.length;i++) {
			if(list[i] != outlier.max && list[i] != outlier.min)
				sum += list[i];
		}
		return sum / (amount - 2);
	}

	return undefined;
}
