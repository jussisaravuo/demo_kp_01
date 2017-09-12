
/*
 * Zoom in (+).
 */
function handleZoomIn() {
	handleZoom(1.05);
}

/*
 * Zoom out (-).
 */
function handleZoomOut() {
	handleZoom(0.95);
}

/*
 *	Zoom in (+/-).
 *	@param {1 || -1} multiplier
 */
function handleZoom(multiplier) {

	let mapViewWidth = parseInt(mapHolder.style.width, 10);
	let mapViewHeight = parseInt(mapHolder.style.height, 10);

	// Calculate the center of mapHolder.
	let center = {x: mapViewWidth/2, y: mapViewHeight/2};

	// Calculate mapImageHolder's offset from the center of mapHolder.
	let offsetX1 = center.x - mapImageHolder.offsetLeft;
	let offsetY1 = center.y - mapImageHolder.offsetTop;

	// Calculate mapImageHolder's percentual offset from the center of mapHolder.
	let procentualOffsetX = offsetX1 / parseInt(mapImage.width, 10);
	let procentualOffsetY = offsetY1 / parseInt(mapImage.height, 10);

	// Calculate new zoom-value.
	mainConfig.zoomValue = parseFloat((mainConfig.zoomValue * multiplier).toFixed(2));

	let width_new = parseInt(mainConfig.zoomValue * mainConfig.mapWidth);
	let height_new = parseInt(mainConfig.zoomValue * mainConfig.mapHeight);

	// Make sure that the size of mapImage will fill the visible-area.
	let x;
	let y;
	let fit;
	if (width_new < mapViewWidth && height_new < mapViewHeight) {
		fit = (width_new / mapViewWidth < height_new / mapViewHeight ? 'width' : 'height');
		x = 0;
		y = 0;
	}
	else if (width_new < mapViewWidth && height_new >= mapViewHeight) {
		fit = 'width';
		x = 0;
	}
	else if (height_new < mapViewHeight && width_new >= mapViewWidth) {
		fit = 'height';
		y = 0;
	}

	if (fit === 'width') {
		width_new = mapViewWidth;
		height_new = (mainConfig.mapHeight / mainConfig.mapWidth) * mapViewWidth;
		mainConfig.zoomValue = parseFloat((width_new / mainConfig.mapWidth).toFixed(2));
	}
	else if (fit === 'height') {
		height_new = mapViewHeight;
		width_new = (mainConfig.mapWidth / mainConfig.mapHeight) * mapViewHeight;
		mainConfig.zoomValue = parseFloat((height_new / mainConfig.mapHeight).toFixed(2));
	}
	else {
		x = parseInt(center.x - procentualOffsetX * width_new);
		y = parseInt(center.y - procentualOffsetY * height_new);
	}

	// Restrict (x,y)-position of mapImageHolder so that it's edges won't arrive into the visible-area.
	let limits = {
		max: {x: 0, y: 0},
		min: {x: mapViewWidth - width_new, y: mapViewHeight - height_new}
	};
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

	// Set new scale of mapImage.
	mapImage.width = width_new;
	mapImage.height = height_new;

	// Set new position of mapImageHolder.
	mapImageHolder.style.left = x + 'px';
	mapImageHolder.style.top = y + 'px';
}
