const scramble_element = $("scramble");

window.onload = () => {
	scramble_element.innerHTML = generateScramble().join(" ");
}

function newScramble(element) {
	element.innerHTML = generateScramble().join(" ");
}
