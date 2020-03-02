import React from "react";

import { connect, useSelector } from "react-redux";
import { playSongAction } from "../../../redux/actions";

import { MdPlayCircleOutline, MdEqualizer } from "react-icons/md";

function SongListItem(props) {
  const nowPlaying = useSelector(state => state.nowplaying);

  const {
    song_src_url,
    song_name,
    song_artists,
    song_album,
    song_banner,
    song_released_year,
    song_duration
  } = props.data;
  return (
    <div
      id="songlistitem"
      className="d-flex flex-row px-2 py-2 justify-content-between align-items-center border-bottom hand my-1"
      onClick={() =>
        props.playSongAction({
          song_name: song_name,
          song_artists: song_artists,
          song_banner: song_banner,
          song_src_url: song_src_url,
          song_album: song_album
        })
      }
    >
      <div className="d-flex align-items-center">
        {nowPlaying && nowPlaying.song_name === song_name ? (
          <MdEqualizer className="mr-2" color="#000" size="25px" />
        ) : (
          <MdPlayCircleOutline className="mr-2" color="#000" size="25px" />
        )}
        <div className="d-flex flex-column">
          <strong>{song_name}</strong>
          <small className="light d-block d-md-none">{song_artists}</small>
        </div>
      </div>
      <div className="d-none d-md-block">{song_artists}</div>
      <div className="d-none d-md-block">{song_released_year}</div>
      <div>{song_duration}</div>
    </div>
  );
}

export default connect(null, { playSongAction })(SongListItem);
