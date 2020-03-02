import React from "react";

//third-party
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import { useSelector } from "react-redux";

//componentss
import Drawer from "./components/mini-components/Drawer";

//pages
import MyMusic from "./pages/MyMusic";
import RecentPlays from "./pages/RecentPlays";
import NowPlaying from "./pages/NowPlaying";
import PlayLists from "./pages/PlayLists";
import Detail from "./pages/Detail";

import { AudioPlayerInstance } from "./AudioPlayer";

import WidthProvider from "./components/global/WidthProvider";
import DrawerProvider from "./components/mini-components/Drawer/DrawerProvider";

import { MiniPlayer } from "./components/MyPlayer";

import {
  MdClose,
  MdMusicNote,
  MdHistory,
  MdEqualizer,
  MdPlaylistPlay,
  MdAdd
} from "react-icons/md";

function App() {
  const isPlaying = useSelector(state => state.nowplaying);
  React.useEffect(() => {
    return () => {
      AudioPlayerInstance.clear();
    };
  }, []);

  return (
    <Router>
      <WidthProvider>
        <Switch>
          {isPlaying && <Route path="/now-playing" component={NowPlaying} />}
          <DrawerProvider>
            <Route path="/" component={Wrapper} />
          </DrawerProvider>
        </Switch>
      </WidthProvider>
    </Router>
  );
}

export default App;

function Wrapper() {
  const isPlaying = useSelector(state => state.nowplaying);
  return (
    <div className="d-flex flex-column h-100">
      <div className="h-100" style={{ overflowY: "auto" }}>
        <div className="d-flex flex-row h-100">
          <Drawer />
          <div className="flex-grow-1">
            <Switch>
              <Route path="/my-music" component={MyMusic} />
              <Route path="/recent-plays" component={RecentPlays} />
              <Route path="/playlists" component={PlayLists} />
              <Route
                path="/album/:album_id/detail"
                component={() => <Detail type="album" />}
              />
              <Route
                path="/artist/:artist_id/detail"
                component={() => <Detail type="artist" />}
              />
              <Redirect to="/my-music" />
            </Switch>
          </div>
        </div>
      </div>
      {isPlaying && (
        <div className="p-2" style={{ backgroundColor: "cornflowerblue" }}>
          <MiniPlayer />
        </div>
      )}
      {/* <div className="d-flex flex-row align-items-center justify-content-around p-2 shadow-lg border-top d-block d-md-none">
        <MdMusicNote className="p-2" color="#000" size="40px" />
        <MdHistory className="p-2" color="#000" size="40px" />
        <MdEqualizer className="p-2" color="#000" size="40px" />
        <MdPlaylistPlay className="p-2" color="#000" size="40px" />
      </div> */}
    </div>
  );
}
