import classname from 'classnames';
import Color from 'color';
import * as React from 'react';
import styled, {css} from 'styled-components';

import {device} from '../../../../styles/utilities/device';
import PlayPause from '../../../common/components/PlayPause';
import {ifEnter} from '../../../common/utils';
import {$Color} from '../../../store';
import Options from './Options';

const speaker = require('../../../controls/components/images/speaker.svg');
const scIcon = require('../images/soundcloud.svg');
const ytIcon = require('../images/youtube.svg');

interface $Props {
  thumbnail: string | null;
  title: string;
  id?: string;
  onClick(): any;
  deleteTrack?: () => any;
  search?: boolean;
  playing?: boolean;
  isCurrentSong?: boolean;
  youtube?: boolean;
  soundcloud?: boolean;
}

export default function Track({
  thumbnail,
  title,
  id,
  onClick,
  deleteTrack,
  search = false,
  playing = false,
  isCurrentSong = false,
  soundcloud = false
}: $Props) {
  return (
    <StyledResult
      onClick={onClick}
      className={classname({'is-current-song': isCurrentSong})}
      onKeyPress={ifEnter(onClick)}
      tabIndex={0}
      data-id={id}
      data-track-type={search ? 'search' : 'queue'}
      search={search}
    >
      <OrderLines>
        <span />
        <span />
      </OrderLines>
      <ImageHolder search={search}>
        {thumbnail ? (
          <Thumbnail
            crossOrigin="anonymous"
            src={getThumbnailUrl(thumbnail)}
            data-id={id}
            search={search}
          />
        ) : (
          <NoArtwork />
        )}
        <PlayBackground>
          <IconContainer>
            {search ? (
              <AddPlus />
            ) : (
              <>
                {isCurrentSong && <Speaker src={speaker} />}
                <PlayPause play={!playing || !isCurrentSong} />
              </>
            )}
          </IconContainer>
        </PlayBackground>
      </ImageHolder>
      <h5>{title}</h5>
      {search && (
        <SourceIcon>
          <img src={soundcloud ? scIcon : ytIcon} />
        </SourceIcon>
      )}
      {!search && !!deleteTrack && <Options deleteTrack={deleteTrack} />}
    </StyledResult>
  );
}

const IconContainer = styled.span`
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 40%;
    fill: white;
  }
`;

const PlayBackground = styled.span`
  background: rgba(16, 16, 16, 0.8);
  height: 100%;
  position: absolute;
  opacity: 0;
  width: 100%;
  transition: all 0.1s;
`;

const Speaker = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 1.25rem;
  width: 1.5rem;
  transform: translate(-50%, -50%);
`;

const AddPlus = styled.span`
  height: 1.5rem;
  left: 50%;
  opacity: 0;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1.5rem;

  @media ${device.small} {
    height: 1rem;
    width: 1rem;
  }

  &:before {
    background: white;
    content: '';
    height: 1.5rem;
    left: 50%;
    position: absolute;
    width: 0.25rem;
    transform: translateX(-50%);

    @media ${device.small} {
      height: 1rem;
      width: 0.165rem;
    }
  }

  &:after {
    background: white;
    content: '';
    height: 1.5rem;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%) rotate(90deg);
    width: 0.25rem;

    @media ${device.small} {
      height: 1rem;
      width: 0.165rem;
    }
  }
`;

interface $ImageHolderProps {
  search: boolean;
}

const OrderLines = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.5rem;

  span {
    background: #e2e2e2;
    border-radius: 1px;
    display: block;
    height: 1px;
    margin: 1px 0;
    width: 8px;
  }
`;

const ImageHolder = styled.div`
  display: inline-block;
  position: relative;
  height: 3rem;
  overflow: hidden;
  margin-right: 0.5rem;
  min-width: 5.5rem;

  @media ${device.small} {
    height: 2.75rem;
    min-width: 5rem;
  }

  ${({search}: $ImageHolderProps) =>
    search &&
    css`
      height: 3.3rem;
      min-width: 6rem;

      @media ${device.small} {
        height: 2.75rem;
        min-width: 5rem;
      }

      div {
        height: 3.3rem;
        min-width: 6rem;
        @media ${device.small} {
          height: 2.75rem;
          min-width: 5rem;
        }
      }
    `};
`;

interface $ThumbnailProps {
  search: boolean;
}

const Thumbnail = styled.img`
  height: 4.125rem;
  position: absolute;
  top: -0.55rem;
  width: 5.5rem;

  @media ${device.small} {
    height: 3.75rem;
    top: -0.5rem;
    width: 5rem;
  }
`;

const NoArtwork = styled.div`
  background-image: linear-gradient(135deg, #846170, #e6846e);
  height: 3rem;
  min-width: 5.5rem;
  @media ${device.small} {
    height: 2.75rem;
    min-width: 5rem;
  }
`;

const SourceIcon = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 0.5rem;
  opacity: 1;
  filter: invert(100%);
  img {
    align-content: center;
  }
`;

interface $StyledResultProps {
  search: boolean;
}

const StyledResult = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem 0;
  box-sizing: border-box;
  width: 100%;
  transition: background-color 0.1s linear;

  ${PlayPause} {
    left: 50%;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &.is-current-song,
  :hover {
    ${PlayBackground}, ${AddPlus} {
      opacity: 1;
    }
  }

  &.is-current-song:not(:hover) {
    ${PlayPause} {
      opacity: 0;
    }
    ${Speaker} {
      opacity: 1;
    }
  }

  :hover {
    background: rgba(34, 34, 34, 0.4);
    ${PlayPause} {
      opacity: 1;
    }

    ${Speaker} {
      opacity: 0;
    }

    .options {
      opacity: 0.8;
    }
  }

  :focus {
    outline: none;
  }

  h5 {
    overflow: hidden;
    color: rgba(255, 255, 255, 0.8);
    display: -webkit-box;
    margin-right: 0.5rem;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    transition: color 0.1s linear;

    @media ${device.small} {
      margin-right: 0.25rem;
    }
  }

  ${({search}: $ImageHolderProps) =>
    search &&
    css`
      &:hover {
        background: #f2f2f2;
      }
      h4 {
        color: black;
      }
    `};
`;

function getThumbnailUrl(url: string): string {
  return `https://cors-anywhere.herokuapp.com/` + url;
}
