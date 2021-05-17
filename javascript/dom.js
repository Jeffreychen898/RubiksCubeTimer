function $(id) {
	return document.getElementById(id);
}

/* element events */
function newScramble(element) {
	element.innerHTML = generateScramble(CONSTANTS.PROPERTIES.SCRAMBLE.MOVES).join(" ");
}

function displaySolve(element) {
	const index = parseInt(element.getAttribute("data-index"));
	const info = countup.solves_record[index];

	const displayer = $("timer-information");
	displayer.style.display="block";
	displayer.setAttribute("data-time", index);

	$("record-time").innerHTML = `Time: ${countup.readableTime(info.time)}`;
	$("record-scramble").innerHTML = info.scramble;
}

function removeTime() {
	const index = parseInt($("timer-information").getAttribute("data-time"));
	if(index == -1) return;
	countup.solves_record[index] = null;

	const solve_elements = document.getElementsByClassName("each-solve");
	let element_index = Math.max(solve_elements.length - 1, solve_elements.length - index - 1);

	while(element_index > -1 && element_index < solve_elements.length) {
		const element_attrib_index = parseInt(solve_elements[element_index].getAttribute("data-index"));
		if(element_attrib_index == index) {
			solve_elements[element_index].remove();
			break;
		} else if(element_attrib_index > index)
			element_index ++;
		else
			element_index --;
	}
}

class HTMLHelper {
	constructor() {
		this.openPopup();
		this.closePopup();
	}
	openPopup() {
		const elements = document.getElementsByClassName("popup");
		for(const element of elements) {
			element.addEventListener("click", () => {
				const target_id = element.getAttribute("data-target");
				const target = document.getElementById(target_id);
				target.style.display="block";
			});
		}
	}
	closePopup() {
		const elements = document.getElementsByClassName("popup-close");
		for(const element of elements) {
			element.addEventListener("click", () => {
				const target_id = element.getAttribute("data-target");
				const target = document.getElementById(target_id);
				target.style.display="none";
			})
		}
	}
}
