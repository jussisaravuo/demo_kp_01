
/*
 *	Resize.
 */
function resize() {
	
	// update mapHolder.
	let width = window.innerWidth - mainConfig.maskOffsets.left - mainConfig.maskOffsets.right;
	let height = window.innerHeight - mainConfig.maskOffsets.top - mainConfig.maskOffsets.bottom;
	mapHolder.style.width = width + 'px';
	mapHolder.style.height = height + 'px';

	// Make sure that map will fill the whole map-view area.
	handleZoom(1);
}
