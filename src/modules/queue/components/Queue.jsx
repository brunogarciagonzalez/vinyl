import React from 'react';
import styled from 'styled-components';
import {has} from 'shades';

import {device} from '../../../styles/utilities/device';
import Track from '../../search/components/Track';

export default function Queue({
	tracks,
	updatePlaying,
	togglePlaying,
	currentlyPlayingId,
	playing,
	deleteTrack
}) {
	const isCurrentSong = has({id: currentlyPlayingId});

	return (
		<QueueList id="queue">
			{tracks.map(track => (
				<Track
					{...track.info}
					key={track.id}
					onClick={isCurrentSong(track) ? togglePlaying : () => updatePlaying(track)}
					deleteTrack={() => deleteTrack(track)}
					playing={playing}
					isCurrentSong={isCurrentSong(track)}
					highRes
				/>
			))}
		</QueueList>
	);
}

const QueueList = styled.div`
	margin-bottom: 5rem;

	@media ${device.small} {
		margin-bottom: 10.25rem;
	}

	::-webkit-scrollbar {
		display: none;
	}
`;
