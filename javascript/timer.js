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

/*
Timer wait
Timer time
bool started

void startFunc() {
	started = true;
	green text
	animationframe
}

void animationframe() {
}

void keydown
	if(started)
		time stopped
	else
		start wait time

void keyup
	if(!started)
		check wait time
			start time
			reset wait time
			startFunc();
		else
			reset wait time
			black text
*/
