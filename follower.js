window.onload = (event) => {
	const SIZE = 20;
	const centroid = {"X": 0, "Y": 0};
	document.getElementsByTagName("html")[0].style.backgroundColor = "black";
	const circle = document.createElement("div");
	circle.style.width = SIZE + "px";
	circle.style.height = SIZE + "px";
	circle.style.backgroundColor = "blue";
	circle.style.backgroundSize = "contain";
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
		circle.style.transform = "scale(" + (Math.sign(offset.X) * Math.log(Math.sqrt(offset.X ** 2 + offset.Y ** 2))) + ", 1)";
		circle.style.rotate = rads + "rad";

		if(Math.abs(offset.X) < SIZE && Math.abs(offset.Y) < SIZE) {
			// TODO: Do something
		}
		else {
			circle.style.top = (vector.Y + position.Y) + "px";
			circle.style.left = (vector.X + position.X) + "px";
		}
	}
};
