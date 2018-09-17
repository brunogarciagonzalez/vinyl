import React from 'react';
import ReactPlayer from 'react-player';

import Timeout from './Timeout';
import Duration from './Duration';

class Uniplayer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			//Player State
			playing: false,
			volume: 1,
			muted: false,
			played: 0,
			loaded: 0,
			duration: 0,
			playbackRate: 1.0,
			loop: false,
			seeking: false,
			hoverTime: '',
			hoverRange: '',
			mousePosition: '',
			playerActive: true,
			expanded: false
		};
	}

	//React Player Functions
	stop = () => {
		this.setState({url: null, playing: false});
	};
	toggleLoop = () => {
		this.setState({loop: !this.state.loop});
	};
	setVolume = e => {
		this.setState({volume: parseFloat(e.target.value)});
	};
	toggleMuted = () => {
		this.setState({muted: !this.state.muted});
	};
	setPlaybackRate = e => {
		this.setState({playbackRate: parseFloat(e.target.value)});
	};
	onPlay = () => {
		this.setState({playing: true});
	};
	onPause = () => {
		this.setState({
			playing: false,
			playerActive: true
		});
	};
	onEnded = () => {
		this.setState({playing: false});
	};
	onProgress = state => {
		// We only want to update time slider if we are not currently seeking
		if (!this.state.seeking) {
			this.setState(state);
		}
	};
	onDuration = duration => {
		this.setState({duration});
	};

	//Click functions for scrubbing through the player
	onSeekMouseDown = e => {
		this.setState({seeking: true});
	};
	onSeekChange = e => {
		this.setState({played: parseFloat(e.target.value)});
	};
	onSeekMouseUp = e => {
		this.setState({seeking: false});
		this.YTPlayer.seekTo(parseFloat(e.target.value));
	};

	//Hover functions for showing current time
	onMouseMove = e => {
		var barWidth = this.refs.playerBar.offsetWidth,
			songDuration = this.state.duration,
			mousePosition = e.nativeEvent.offsetX,
			scrubTime = songDuration / barWidth * mousePosition,
			rangeTime = mousePosition / barWidth,
			minutes = Math.floor(scrubTime / 60),
			seconds = Math.round(scrubTime - minutes * 60);
		if (seconds <= 9) {
			seconds = '0' + seconds;
		}
		var hoverTime = '' + minutes + ':' + seconds + '';
		this.setState({hoverTime: hoverTime});
		this.setState({mousePosition: mousePosition});
		this.setState({hoverRange: rangeTime});
	};

	playerActive = () => {
		this.setState({playerActive: true});
		this.props.clearTimeouts();
		if (this.state.playing) {
			this.props.setTimeout(() => {
				this.setState({playerActive: false});
			}, 2500);
		}
	};

	//OpenRecord Player Addon Functions
	playToggle = () => {
		if (this.state.playing) {
			this.setState({playing: false});
		} else {
			this.setState({playing: true});
			this.props.setTimeout(() => {
				this.setState({playerActive: false});
			}, 2500);
		}
	};

	//OpenRecord Player Addon Functions
	expandToggle = () => {
		if (this.state.expanded) {
			this.setState({expanded: false});
		} else {
			this.setState({expanded: true});
		}
	};

	setYTPlayer = player => {
		this.YTPlayer = player;
	};

	renderYT(currentlyPlaying) {
		var player = {};
		player.id = 'https://www.youtube.com/watch?v=' + currentlyPlaying.id;
		return (
			<div className="player-inner">
				<ReactPlayer
					ref={this.setYTPlayer}
					className="react-player"
					width="100%"
					height="100%"
					url={player.id}
					playing={this.state.playing}
					loop={this.state.loop}
					playbackRate={this.state.playbackRate}
					volume={this.state.volume}
					muted={this.state.muted}
					onReady={() => console.log('onReady')}
					onStart={() => console.log('onStart')}
					onPlay={this.onPlay}
					onPause={this.onPause}
					onBuffer={() => console.log('onBuffer')}
					onSeek={e => console.log('onSeek', e)}
					onEnded={this.onEnded}
					onError={e => console.log('onError', e)}
					onProgress={this.onProgress}
					onDuration={this.onDuration}
				/>
			</div>
		);
	}

	render() {
		const {currentlyPlaying, queue} = this.props;

		var player = {},
			playback = this.state.played * 100;
		if (this.state.playing) {
			player.status = ' playing';
		} else {
			player.status = ' paused';
		}
		if (this.state.expanded) {
			player.expanded = ' expanded';
		} else {
			player.expanded = '';
		}

		return (
			<div className="uniplayer" onMouseMove={this.playerActive}>
				<div className="uniplayer-left">
					{currentlyPlaying && (
						<div className="info-box">
							<div className="image-holder">
								<img src={currentlyPlaying.content.thumbnails.default.url} />
							</div>
							<h5 className="song-title">{currentlyPlaying.content.title}</h5>
						</div>
					)}
				</div>
				<div className="uniplayer-middle">
					<div className="player-controls">
						<div className="player-buttons">
							<div className="arrow previous" />
							<div className={'play-button' + player.status} onClick={this.playToggle} />
							<div className="arrow next" />
						</div>
						<div className="playback-holder">
							<Duration className="duration" seconds={this.state.duration * this.state.played} />
							<div className="player-slider">
								<div className="progress-bar-bg">
									<span className="progress-bar" style={{right: 'calc(100% - ' + playback + '%)'}} />
								</div>
								<input
									className="player-bar"
									ref="playerBar"
									type="range"
									min={0}
									max={1}
									step="any"
									value={this.state.played}
									onMouseEnter={this.onMouseEnter}
									onMouseMove={this.onMouseMove}
									onMouseLeave={this.onMouseLeave}
									onMouseDown={this.onSeekMouseDown}
									onChange={this.onSeekChange}
									onMouseUp={this.onSeekMouseUp}
								/>
							</div>
							<Duration className="duration" seconds={this.state.duration} />
						</div>
					</div>
				</div>
				<div className="uniplayer-right" />
				<div className={'player-holder' + player.expanded}>
					<div className="player-outer">
						<div className="iframeblocker" onClick={this.playToggle} />
						<div className="size-buttons">
							<div className="expand-button" onClick={this.expandToggle} />
							<div className="minimize-button" />
						</div>
						{currentlyPlaying && this.renderYT(currentlyPlaying)}
					</div>
				</div>
				{this.state.expanded && <div className="player-background" />}
			</div>
		);
	}
}

export default Timeout(Uniplayer);
