
let mainHolder;
let mapHolder;
let mapImageHolder;
let mapImage;

let zoomIn;
let zoomOut;

let mainConfig;

/*
 *	Initialize.
 */
function init() {
	console.log('init()');

	mainConfig = {
		imgPath: 'img/',
		maskOffsets: {left:20, right:20, top:20, bottom:20},
		mapWidth: 2579,
		mapHeight: 1838,
		zoomValue: 1
	};

	dragConfig = {
		dragging: false,
		savedValues: {
			pointer: null, // {x, y}
			map: null // {x, y}
		},
		limitedMapPositionValues: {
 			min: null, // {x, y}
 			max: null // {x, y}
 		}
	};

	// Initialize content.
	initContent();
}

/*
 *	Initialize Content. Add dom-elements and button-events.
 */
function initContent() {

	disableBodyScroll();

	//	Add main holders: mainHolder, mapHolder, mapImageHolder
	//
	//	document.body
	//		L mainHolder
	//			L mapHolder
	//				L mapImageHolder

	mainHolder = createMainHolder();
	document.body.appendChild(mainHolder);

	mapHolder = createMapHolder();
	mainHolder.appendChild(mapHolder);
	
	mapImageHolder = createMapImageHolder();
	mapHolder.appendChild(mapImageHolder);

	// Add map image.
	mapImage = createMapImage();
	mapImageHolder.appendChild(mapImage);

	// Add zoom.
	zoomBg = createZoomBg();
	mainHolder.appendChild(zoomBg);
	zoomIn = createZoomIn();
	mainHolder.appendChild(zoomIn);
	zoomOut = createZoomOut();
	mainHolder.appendChild(zoomOut);

	// Make sure that map will filll the whole map-view area.
	handleZoom(1);

	// Add buttons-events
	addEventListeners();
}

/*
 *	Create main holder.
 */
function createMainHolder() {
	let div = getNewDiv('main_holder', {left:0+'px', top:0+'px', padding:`0px 0px 0px 0px`, pointerEvents:'auto'});
	return div;
}

/*
 *	Disable body scroll.
 */
function disableBodyScroll() {
	document.body.style.overflow = 'hidden';
	document.body.scroll = 'no';
}

/*
 *	Create map holder.
 */
function createMapHolder() {
	let width = window.innerWidth - mainConfig.maskOffsets.left - mainConfig.maskOffsets.right;
	let height = window.innerHeight - mainConfig.maskOffsets.top - mainConfig.maskOffsets.bottom;
	let div = getNewDiv('map_holder', {
		left:mainConfig.maskOffsets.left+'px',
		top:mainConfig.maskOffsets.top+'px',
		width:width+'px',
		height:height+'px',
		padding:`0px 0px 0px 0px`,
		pointerEvents:'auto',
		overflow: 'hidden'
	});
	return div;
}

/*
 *	Create map image holder.
 */
function createMapImageHolder() {
	let div = getNewDiv('map_image_holder', {left:0+'px', top:0+'px', padding:`0px 0px 0px 0px`, pointerEvents:'none'});
	return div;
}

/*
 *	Create map image.
 */
function createMapImage() {
	let img = document.createElement('img');
	img.src =  mainConfig.imgPath + 'map.png';
	img.id = 'map';

	// Zoom and centralize image.
	let mapViewWidth = parseInt(mapHolder.style.width, 10);
	let mapViewHeight = parseInt(mapHolder.style.height, 10);
	if (mainConfig.mapWidth / mainConfig.mapHeight < mapViewWidth / mapViewHeight) {
		img.width = mapViewWidth;
		img.height = (mapViewWidth / mainConfig.mapWidth) * mainConfig.mapHeight;
		mainConfig.zoomValue = mapViewWidth / mainConfig.mapWidth;
		mapImageHolder.style.top = (mapViewHeight - img.height) / 2 + 'px';
	}
	else {
		img.height = mapViewHeight;
		img.width = mapViewHeight / mainConfig.mapHeight * mainConfig.mapWidth;
		mainConfig.zoomValue = mapViewHeight / mainConfig.mapHeight;
		mapImageHolder.style.left = (mapViewWidth - img.width) / 2 + 'px';
	}

	return img;
}

/*
 *	Create Zoom-bg element.
 */
function createZoomBg() {
	let scale = 0.5;
	let width = scale * 200;
	let height = scale * 380;
	let div = getNewDiv('zoomBg', {left:mainConfig.maskOffsets.left+'px', top:(mainConfig.maskOffsets.top - 4)+'px', width:width+'px', height:height+'px', padding:`0px 0px 0px 0px`, pointerEvents:'none', opacity:0.5});
	let img = document.createElement('img');
	img.src =  mainConfig.imgPath + 'zoomBg.png';
	img.id = 'zoomBg_image';
	img.width = width;
	img.height = height;
	div.appendChild(img);
	return div;
}

/*
 *	Create Zoom-in element.
 */
function createZoomIn() {
	let width = 60;
	let height = 60;
	let div = getNewDiv('zoomIn', {left:40+'px', top:48+'px', width:width+'px', height:height+'px', padding:`0px 0px 0px 0px`, pointerEvents:'auto'});
	let img = document.createElement('img');
	img.src =  mainConfig.imgPath + 'zoomIn.png';
	img.id = 'zoomIn_image';
	img.width = width;
	img.height = height;
	div.appendChild(img);
	return div;
}

/*
 *	Create Zoom-out element.
 */
function createZoomOut() {
	let width = 60;
	let height = 60;
	let div = getNewDiv('zoomIn', {left:40+'px', top:112+'px', width:width+'px', height:height+'px', padding:`0px 0px 0px 0px`, pointerEvents:'auto'});
	let img = document.createElement('img');
	img.src =  mainConfig.imgPath + 'zoomOut.png';
	img.id = 'zoomOut_image';
	img.width = width;
	img.height = height;
	div.appendChild(img);
	return div;
}

/*
 *	Get new DIV element.
 *	@param {String} id - (Optional)
 *	@param {Object} style
 */
function getNewDiv(id, style) {
	let div = document.createElement('div');
	if (id != '') { div.id = id; }
	for (let a in style) div.style[a] = style[a];
	div.style.position = 'absolute';
	return div;
}
