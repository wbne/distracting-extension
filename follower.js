window.onload = (event) => {
	const SIZE = 50;
	const centroid = {"X": 0, "Y": 0};
	document.getElementsByTagName("html")[0].style.backgroundColor = "black";
	const circle = document.createElement("div");
	const randomWalkVector = {"X": 0, "Y": 0};
	let randomStep = 0;
	circle.style.width = SIZE + "px";
	circle.style.height = SIZE + "px";
	circle.style.background = 'url("./Canon_Niolet_Running.gif")';
	circle.style.backgroundSize = 'contain';
	circle.style.position = "absolute";
	circle.style.left = 0;
	circle.style.top = 0;
	circle.style.zIndex = 9001;
	
	const root = document.getElementsByTagName("html")[0];
	root.appendChild(circle);
	
	setInterval(slowFollow, 10);
	document.addEventListener("mousemove", updateCoords);

	function updateCoords(cursor) {
		centroid.X = cursor.clientX - (SIZE / 2);
		centroid.Y = cursor.clientY - (SIZE / 2);
	}
	
	function slowFollow(e) {
		const position = {"X": parseInt(circle.style.left, 10), "Y": parseInt(circle.style.top, 10)};
		const offset = {"X": centroid.X - position.X, "Y": centroid.Y - position.Y};
		const magnitude = {"X": Math.min(Math.abs(offset.X), 5), "Y": Math.min(Math.abs(offset.Y), 5)};
		const rads = (Math.sign(offset.X > 0)) ? Math.atan(offset.Y / offset.X) : Math.atan(offset.Y / offset.X) + Math.PI;
		const vector = {"X": Math.cos(rads) * magnitude.X, "Y": Math.sin(rads) * magnitude.Y};
		randomWalkVector.X += vector.X;
		randomWalkVector.Y += vector.Y;
		circle.style.transform = "scale(" + Math.sign(offset.X) * -1 + ", 1)";

		if((Math.abs(offset.X) < SIZE && Math.abs(offset.Y) < SIZE)) {
			randomWalk(100);
		}
		else {
			if(position.Y > 0 && position.Y < window.screen.height && position.X > 0 && position.X < window.screen.width && Math.random() > 0.95) {
				randomWalk(5);
			}
			else if(randomStep > 0) {
				randomWalk();
			}
			else {
				circle.style.top = (vector.Y + position.Y) + "px";
				circle.style.left = (vector.X + position.X) + "px";
			}
		}
	}

	function randomWalk(addSteps = 0) {
		randomStep += addSteps;
		const position = {"X": parseInt(circle.style.left, 10), "Y": parseInt(circle.style.top, 10)};
		if(position.Y < 0 || position.Y > window.screen.height || position.X < 0 || position.X > window.screen.width) {
			randomStep = 0;
		}
		if(Math.random() > .975) {
			randomStep = Math.max(randomStep - 10, 0);
		}
		randomWalkVector.X = Math.min(Math.random() - 0.5 + randomWalkVector.X, 5);
		randomWalkVector.Y = Math.min(Math.random() - 0.5 + randomWalkVector.Y, 5);	
		circle.style.transform = "scale(" + Math.sign(randomWalkVector.X) * -1 + ", 1)";
		circle.style.top = (randomWalkVector.Y + position.Y) + "px";
		circle.style.left = (randomWalkVector.X + position.X) + "px";
		randomStep = Math.max(randomStep - 1, 0);
	}

};
