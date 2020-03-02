import React from "react";

import Portal from "../Portal";
import { WidthContext } from "../../global/WidthProvider";
import { DrawerContext } from "./DrawerProvider";

// third-party
import { NavLink } from "react-router-dom";
import { connect, useSelector } from "react-redux";

// Material Icons from react-icons
import {
  MdClose,
  MdMusicNote,
  MdHistory,
  MdEqualizer,
  MdPlaylistPlay,
  MdAdd
} from "react-icons/md";

function Drawer(props) {
  const isPlaying = useSelector(state => state.nowplaying);
  const drawerRef = React.createRef();
  const drawerContext = React.useContext(DrawerContext);
  const isMatched = React.useContext(WidthContext);
  React.useEffect(() => {
    drawerRef.current.focus();
  }, [drawerContext.open, drawerRef]);
  return (
    <div
      ref={drawerRef}
      className={`h-100 sidenav${
        isMatched
          ? ` shadow-lg overlapsidenav${
              drawerContext.open ? " opennav" : " closenav"
            }`
          : " opennav"
      }`}
      tabIndex={0}
      onBlur={() => {
        drawerContext.onChangeNav(false);
      }}
    >
      <nav id="nav-items" className="d-flex flex-column">
        {isMatched && (
          <div className="nav-item d-flex flex-row flex-nowrap text-nowrap align-items-center py-1 px-1 disabled">
            <MdClose
              className="p-2 hand"
              color="#000"
              size="40px"
              onClick={() => drawerContext.onChangeNav(false)}
            />
          </div>
        )}
        <NavLink
          to="/my-music"
          className="nav-item d-flex flex-row flex-nowrap text-nowrap align-items-center py-1"
        >
          <MdMusicNote className="p-2" color="#000" size="40px" />
          <span className="p-2 ">My music</span>
        </NavLink>
        <NavLink
          to="/recent-plays"
          className="nav-item d-flex flex-row flex-nowrap text-nowrap align-items-center py-1"
        >
          <MdHistory className="p-2" color="#000" size="40px" />
          <span className="p-2 ">Recent plays</span>
        </NavLink>
        <NavLink
          to={`${isPlaying ? "/now-playing" : "#"}`}
          className="nav-item d-flex flex-row flex-nowrap text-nowrap align-items-center py-1"
        >
          <MdEqualizer className="p-2" color="#000" size="40px" />
          <span className="p-2 ">Now playing</span>
        </NavLink>
        <hr className="m-0" />
        <div className="d-flex flex-row flex-nowrap text-nowrap">
          <div className="flex-grow-1">
            <NavLink
              to="/playlists"
              className="nav-item d-flex flex-row flex-nowrap text-nowrap align-items-center py-1"
            >
              <MdPlaylistPlay className="p-2" color="#000" size="40px" />
              <span className="p-2 flex-grow-1">Playlists</span>
            </NavLink>
          </div>

          {!isMatched && (
            <div
              className="d-flex align-items-center justify-content-center clickable"
              onClick={() => drawerContext.onChangeNav(false)}
            >
              <RenderAddPlayistButton />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
export default Drawer;

function RenderAddPlayistButton() {
  const [state, setState] = React.useState(false);
  return (
    <React.Fragment>
      <MdAdd
        className="p-2 hand"
        color="#000"
        size="40px"
        onClick={() => setState(true)}
      />
      {state && (
        <Portal>
          <div
            className="h-100 w-100 d-flex justify-content-center align-items-center position-fixed"
            style={{
              top: "0",
              left: "0",
              backgroundColor: "rgba(0, 0, 0, 0.16)",
              zIndex: "1025"
            }}
          >
            <div className="container">
              <div className="mx-auto" style={{ maxWidth: "500px" }}>
                <div className="d-flex flex-column align-items-center justify-content-center px-2 py-5 border bg-white rounded shadow">
                  <div
                    className="p-5 bg-primary rounded mb-3"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgb(0, 98, 204), rgba(0, 7, 15, 0.62))"
                    }}
                  >
                    <MdPlaylistPlay color="#fff" size="50px" />
                  </div>

                  <input
                    type="text"
                    style={{ height: "45px" }}
                    className="w-75 text-center"
                    placeholder="Name this playlist"
                  />
                  <span className="mb-5">Created by you</span>

                  <div
                    className="w-75 p-2 mb-2 text-center border text-white hand rounded"
                    style={{
                      backgroundColor: "#0062cc"
                    }}
                    onClick={() => setState(true)}
                  >
                    Create Playlist
                  </div>
                  <div
                    className="w-75 p-2 mb-2 text-center hand"
                    onClick={() => setState(false)}
                  >
                    Cancel
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </React.Fragment>
  );
}
