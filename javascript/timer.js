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
