
let dragConfig;

/*
 *	Handle events of map-content.
 *	@param e
 *	@param eventType
 *
 */
function handleEventsOfMapContent(e, eventType) {
	if (eventType === 'move') {
		if (dragConfig.dragging) {
			let xNew = Math.round(dragConfig.savedValues.map.x + e.clientX - dragConfig.savedValues.pointer.x);
			let yNew = Math.round(dragConfig.savedValues.map.y + e.clientY - dragConfig.savedValues.pointer.y);
			updateMapPosition(xNew, yNew);
		}
	}
	else if (eventType === 'down') {

		dragConfig.dragging = false;

		dragConfig.savedValues = {
			pointer: {x: e.clientX, y: e.clientY},
			map: {x: mapImageHolder.offsetLeft, y: mapImageHolder.offsetTop}
		};

		dragConfig.limitedMapPositionValues = {
			max: {x: 0, y: 0},
			min: {
				x: parseInt(mapHolder.style.width, 10) - parseInt(mapImage.width, 10),
				y: parseInt(mapHolder.style.height, 10) - parseInt(mapImage.height, 10)
			}
		};

		dragConfig.dragging = true;
	}
	else if (dragConfig.dragging && (eventType === 'up' || eventType === 'pointerout' || eventType === 'pointerleave' || eventType === 'pointercancel' || eventType === 'lostpointercapture')) {
		dragConfig.dragging = false;
	}
}

/*
 *	Update new position for mapImageHolder.
 *	@param {Number} x - Position x.
 *	@param {Number} y - Position y.
 */
function updateMapPosition(x, y) {

	// Restrict (x,y)-position of mapImageHolder so that it's edges won't arrive into the visible-area.
	let limits = dragConfig.limitedMapPositionValues;
	if (x > limits.max.x) {
		x = limits.max.x;
	} else if (x < limits.min.x) {
		x = limits.min.x;
	}
	if (y > limits.max.y) {
		y = limits.max.y;
	} else if (y < limits.min.y) {
		y = limits.min.y;
	}

	// Update position.
	mapImageHolder.style.left = x + 'px';
	mapImageHolder.style.top = y + 'px';
}
