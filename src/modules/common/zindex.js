const baseZIndexList = [
	0,
	'add-container',
	'search-background',
	`search-holder`,
	'search-icon',
	'search-results',
	'toast',
	'player-expanded',
	'controls',
	'iframeblocker',
	'player',
	'slider-track',
	'slider-handle',
	'nav'
];

export default function zindex(element, list = baseZIndexList) {
	const z = list.indexOf(element);
	const zero = list.includes(0) ? list.indexOf(0) : 0;

	if (z > -1) {
		return z - zero;
	}

	throw new Error(`There is no item ${element} in list: ${list}`);
}
