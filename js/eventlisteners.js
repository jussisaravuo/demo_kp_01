
/*
 *	Add event listeners.
 *
 *	TODO:
 *		- Add touchstart/touchend/touchmove for mobile devices.
 *		- Add mousedown/mouseup/mousemove for example for Safari (mac).
 */
function addEventListeners() {

	// Add pointer-event listeners of mapHolder to handle dragging of map-content.
	mapHolder.addEventListener('pointerdown', function(e) { handleEventsOfMapContent(e, 'down'); }, false);
	mapHolder.addEventListener('pointerup', function(e) { handleEventsOfMapContent(e, 'up'); }, false);
	mapHolder.addEventListener('pointermove', function(e) { handleEventsOfMapContent(e, 'move'); }, false);
	mapHolder.addEventListener('pointerout', function(e) { handleEventsOfMapContent(e, 'pointerout'); }, false);
	mapHolder.addEventListener('pointerleave', function(e) { handleEventsOfMapContent(e, 'pointerleave'); }, false);
	mapHolder.addEventListener('pointercancel', function(e) { handleEventsOfMapContent(e, 'pointercancel'); }, false);
	mapHolder.addEventListener('lostpointercapture', function(e) { handleEventsOfMapContent(e, 'lostpointercapture'); }, false);

	// Add pointer-event listeners of zoomIn/zoomOut to set zoom of map-content.
	zoomIn.addEventListener('pointerdown', function(e) { handleZoomIn(); }, false);
	zoomOut.addEventListener('pointerdown', function(e) { handleZoomOut(); }, false);

	// Add resize listeners.
	window.addEventListener('resize', resize);
	window.addEventListener('deviceOrientation', resize);
}
