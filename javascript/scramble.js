function generateScramble(moves) {
	const rotations = "RLFBUD";
	let exclusion = [];

	let result = [];
	for(let i=0;i<moves;i++) {
		const possible_moves = rotations.length - exclusion.length;
		let index = Math.floor(Math.random() * possible_moves);
		while(exclusion.indexOf(index) > -1)
			index ++;
		const letter = rotations[index];
		
		let iterator = 0;
		while(iterator < exclusion.length) {
			let character = rotations[exclusion[iterator]];
			if(opposite(character) != letter && character != letter)
				exclusion.splice(iterator, 1);
			else
				iterator ++;
		}
		exclusion.push(index);

		result.push(getSuffix(letter));
	}

	return result;
}

function opposite(character) {
	switch(character) {
		case "R":
			return "L";
			break;
		case "L":
			return "R";
			break;
		case "U":
			return "D";
			break;
		case "D":
			return "U";
			break;
		case "F":
			return "B";
			break;
		case "B":
			return "F";
			break;
	}
}

function getSuffix(character) {
	let suffix = Math.random();
	if(suffix < 0.33)
		return character + "'";
	else if(suffix < 0.66)
		return character + "2";

	return character;
}
