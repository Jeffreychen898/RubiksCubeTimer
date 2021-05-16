function generateScramble(moves) {
	const rotations = "UDLRFB";

	let result = [];
	let previous = -1;

	for(let i=0;i<moves;i++) {
		let move;
		if(i == 0)
			move = Math.floor(Math.random() * rotations.length);
		else {
			const random = Math.floor(Math.random() * (rotations.length - 1));
			if(random == previous)
				move = rotations.length - 1;
			else
				move = random;
		}
		previous = move;

		let character = rotations[move];
		const suffix = Math.random();
		if(suffix < 0.33)
			character += "'";
		else if(suffix < 0.66)
			character += "2";

		result.push(character);
	}
	
	return result;
}
