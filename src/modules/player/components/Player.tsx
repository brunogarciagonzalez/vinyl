import * as React from 'react';
import ReactPlayer from 'react-player';
import {find, includes} from 'shades';
import styled from 'styled-components';

import {$Track} from '../../search/components/types';

export interface $PlayerProps {
  played: number;
  setPlayed(played: number): void;
  duration: number;
  setDuration(duration: number): void;
  currentlyPlaying: $Track | undefined;
  playing: boolean;
  muted: boolean;
  playNext(options: {local: boolean}): void;
  className?: string;
}

class Player extends React.Component<$PlayerProps> {
  playerRef: React.RefObject<ReactPlayer> = React.createRef();

  componentDidUpdate(oldProps: $PlayerProps) {
    const secondsElapsed = (this.props.played - oldProps.played) * this.props.duration;
    if (secondsElapsed > 2.5 || secondsElapsed < 0) {
      this.playerRef.current && this.playerRef.current.seekTo(this.props.played);
    }

    // Very long youtube tracks (1hr+) cause a bug where if the song finishes naturally
    // onDuration fires too early for the next track and it will keep the old duration
    // causing it to skip through the next song
    if (this.playerRef.current) {
      const duration = this.playerRef.current.getDuration();
      if (duration && duration != this.props.duration) {
        this.props.setDuration(duration);
      }
    }

    const iframes = Array.from(document.getElementsByTagName('iframe'));
    const sc = find({src: includes('soundcloud')})(iframes);
    if (sc) {
      // @ts-ignore: HTMLIFrameElements DO have an 'allow' property, it's just new
      sc.allow = 'autoplay';
    }
  }

  render() {
    const {
      currentlyPlaying,
      playing,
      playNext,
      setDuration,
      setPlayed,
      className,
      muted
    } = this.props;
    if (!currentlyPlaying) {
      return null;
    }

    return (
      <ReactPlayer
        className={className}
        data-style-id="react-player"
        key="react-player"
        width="100%"
        height="100%"
        ref={this.playerRef}
        url={getTrackUrl(currentlyPlaying)}
        muted={muted}
        playing={playing}
        config={{
          soundcloud: {
            options: {
              auto_play: true
            },
            // @ts-ignore: they forgot to put this in the types, but it works
            preload: true
          },
          youtube: {
            preload: true
          }
        }}
        onEnded={() => playNext({local: true})}
        onDuration={setDuration}
        onProgress={({played}) => setPlayed(played)}
      />
    );
  }
}

export default styled(Player)``;

function getTrackUrl(track: $Track) {
  if (track.info.url.startsWith('http')) {
    return track.info.url;
  }

  if (track.info.source === 'YOUTUBE') {
    return 'https://www.youtube.com/watch?v=' + track.info.url;
  }

  throw new Error(`Can't format URL of ${track.info.title}`);
}
