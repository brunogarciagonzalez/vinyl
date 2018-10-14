import React from 'react';

export default function PlayPause({play, onClick}) {
	if (play) {
		return <Play onClick={onClick} />;
	} else {
		return <Pause onClick={onClick} />;
	}
}

const Play = props => (
	<svg viewBox="0 0 100 100" {...props}>
		<polygon points="25,0 100, 50, 25,100" />
	</svg>
);

const Pause = props => (
	<svg viewBox="0 0 353.562 353.562" {...props}>
		<path d="M41.064,353.562h109.014V0H41.064V353.562z" />
		<path d="M203.482,0v353.562h109.017V0H203.482z" />
	</svg>
);
