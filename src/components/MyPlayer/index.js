import React from "react";

import "./MyPlayer.css";
import { AudioPlayerInstance } from "../../AudioPlayer/index";

import { useSelector } from "react-redux";

import {
  MdPlayCircleOutline,
  MdPauseCircleOutline,
  MdSkipPrevious,
  MdSkipNext,
  MdShuffle,
  MdRepeat,
  MdRepeatOne,
  MdRotateRight
} from "react-icons/md";

function MyPlayer() {
  return (
    <SongBanner>
      <MiniPlayer />
    </SongBanner>
  );
}

export default MyPlayer;

export function MiniPlayer() {
  return (
    <Player>
      {state => {
        return <Controls state={state} />;
      }}
    </Player>
  );
}

function SongBanner(props) {
  const { song_banner } = useSelector(state => state.nowplaying);
  return (
    <div
      className="h-100 position-relative"
      style={{ background: "currentColor" }}
    >
      <div
        className="img-fluid h-100 w-100 bannerblur"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundImage: `url(${song_banner})`
        }}
      />
      <div
        className="d-flex flex-row h-100 w-100 position-absolute text-white"
        style={{ top: "0", left: "0" }}
      >
        <div className="align-self-end flex-fill">
          <div className="d-flex flex-column px-3 py-3">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

function SongInfo() {
  const { song_name, song_artists, song_banner } = useSelector(
    state => state.nowplaying
  );
  return (
    <React.Fragment>
      <div className="d-none d-md-block">
        <div className="d-flex flex-row align-items-center px-2 py-2">
          <div>
            <img
              className="border border-white"
              src={`${song_banner}`}
              alt="song-banner"
              height="50px"
              width="50px"
            />
          </div>
          <div className="flex-grow-1 pl-2">
            <h6 className="m-0 mb-1 text-white">{song_name}</h6>
            <p className="m-0 text-white">{song_artists}</p>
          </div>
        </div>
      </div>
      <h6 className="m-0 mb-1 text-center text-white d-block d-md-none">
        {song_name}
      </h6>
    </React.Fragment>
  );
}

export class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      inLoop: false,
      inProgress: false,
      currentDuration: 0,
      totalDuration: 0
    };
  }

  componentDidMount() {
    this.listenerId = AudioPlayerInstance.addListener(data => {
      this.setState({
        isPlaying: data.isPlaying,
        inLoop: data.inLoop,
        inProgress: data.inProgress,
        currentDuration: data.currentDuration,
        totalDuration: data.totalDuration
      });
    });
    AudioPlayerInstance.initialUpdateForListeners();
  }

  componentWillUnmount() {
    AudioPlayerInstance.removeListener(this.listenerId);
  }

  playSong = () => {
    this.setState({ isPlaying: true }, () => {
      AudioPlayerInstance.play();
    });
  };

  pauseSong = () => {
    this.setState({ isPlaying: false }, () => {
      AudioPlayerInstance.pause();
    });
  };

  seekSongTo = value => {
    AudioPlayerInstance.seek(value);
  };

  onSongLoop = () => {
    this.setState(
      state => {
        return { inLoop: !state.inLoop };
      },
      () => {
        AudioPlayerInstance.loop(this.state.inLoop);
      }
    );
  };

  render() {
    const state = {
      ...this.state,
      playSong: this.playSong,
      pauseSong: this.pauseSong,
      seekSongTo: this.seekSongTo,
      onSongLoop: this.onSongLoop
    };

    return this.props.children(state);
  }
}

export function Controls(props) {
  const { state } = props;
  return (
    <div className="d-flex flex-column position-relative">
      <AudioProgress song_state={state} />
      <AudioControls song_state={state} />
    </div>
  );
}

function AudioProgress(props) {
  const ref = React.useRef();
  const { song_state } = props;

  React.useEffect(() => {
    ref.current.focus();
  }, []);

  const onChangeHandler = event => {
    song_state.seekSongTo(event.target.value);
  };

  const onKey = event => {
    if (event.which === 32) {
      if (song_state.isPlaying) {
        song_state.pauseSong();
      } else {
        song_state.playSong();
      }
    }
  };

  return (
    <div className="d-flex flex-row align-items-center">
      <span className="text-white tabularnums">
        {parseInt(song_state.currentDuration / 60)}:
        {parseInt(song_state.currentDuration % 60)}
      </span>

      <input
        id="myRange"
        type="range"
        ref={ref}
        className="slider flex-grow-1 mx-2"
        min={0}
        max={`${parseFloat(song_state.totalDuration)}`}
        value={`${song_state.currentDuration}`}
        onChange={onChangeHandler}
        onKeyPress={onKey}
      />

      <span className="text-white tabularnums">
        {parseInt(song_state.totalDuration / 60)}:
        {parseInt(song_state.totalDuration % 60)}
      </span>
    </div>
  );
}

function AudioControls(props) {
  const { song_state } = props;
  return (
    <div
      id="controls"
      className={`d-flex flex-column flex-md-row flex-wrap align-items-center justify-content-center justify-content-md-between`}
    >
      <div>
        <MdShuffle className="mr-3 hand" color="#fff" size="20px" />
        <MdSkipPrevious className="mr-3 hand" color="#fff" size="25px" />
        {song_state.inProgress ? (
          <MdRotateRight
            id="loading"
            className="mr-3 hand"
            color="#fff"
            size="40px"
          />
        ) : !song_state.isPlaying ? (
          <MdPlayCircleOutline
            className="mr-3 hand"
            color="#fff"
            size="40px"
            onClick={song_state.playSong}
          />
        ) : (
          <MdPauseCircleOutline
            className="mr-3 hand"
            color="#fff"
            size="40px"
            onClick={song_state.pauseSong}
          />
        )}
        <MdSkipNext className="mr-3 hand" color="#fff" size="25px" />

        {song_state.inLoop ? (
          <MdRepeatOne
            className="mr-3 hand"
            color="#fff"
            size="20px"
            onClick={song_state.onSongLoop}
          />
        ) : (
          <MdRepeat
            className="mr-3 hand"
            color="#fff"
            size="20px"
            onClick={song_state.onSongLoop}
          />
        )}
      </div>
      <SongInfo />
    </div>
  );
}
