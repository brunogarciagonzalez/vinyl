import MediaQuery from 'react-responsive';
import React from 'react';
import styled from 'styled-components';

import {device, size} from '../../../../styles/utilities/device';
import {ifElse} from '../../../common/utils';
import AddSong, {StyledAddSong} from './AddSong';
import Message, {StyledMessage} from './Message';
import link from './images/copy-link.svg';

export default function CollectionInfo({playlist, toggleSearch, isSearchOpen, trackCount}) {
	const desktop = (
		<StyledCollectionInfo>
			<Stack>
				<h5>COLLECTION</h5>
				<PlaylistLink>
					<PlaylistName>/{playlist}</PlaylistName>
					<img src={link} />
				</PlaylistLink>
				<AddSong onClick={toggleSearch} isSearchOpen={isSearchOpen} />
			</Stack>
			<Message isSearchOpen={isSearchOpen} trackCount={trackCount} />
		</StyledCollectionInfo>
	);

	const mobile = (
		<StyledCollectionInfo>
			<PlaylistName>/{playlist}</PlaylistName>
			<Stack>
				<AddSong onClick={toggleSearch} isSearchOpen={isSearchOpen} />
				<Message isSearchOpen={isSearchOpen} trackCount={trackCount} />
			</Stack>
		</StyledCollectionInfo>
	);

	return <MediaQuery maxWidth={size.medium}>{ifElse(mobile, desktop)}</MediaQuery>;
}

const StyledCollectionInfo = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;

	h5 {
		color: rgba(60, 60, 60, 1);
		margin-bottom: 0.25rem;
	}
`;

const PlaylistLink = styled.a`
	align-items: center;
	cursor: pointer;
	display: flex;
	flex-direction: row;

	img {
		align-self: bottom;
		height: 1rem;
		margin-top: 0.375rem;
		margin-left: 0.675rem;
		width: 1rem;
	}
`;

const PlaylistName = styled.h1`
	color: white;
	max-width: 15rem;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;

	@media ${device.small} {
		margin: auto 0;
		max-width: 8rem;
	}
`;

const Stack = styled.div`
	display: flex;
	flex-direction: column;

	@media ${device.small} {
		align-items: flex-end;
		margin: 0.75rem;

		${StyledMessage} {
			text-align: right;
		}
	}

	${StyledAddSong} {
		margin-top: auto;
	}
`;
