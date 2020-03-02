import { combineReducers } from "redux";
import { AudioPlayerInstance } from "../../AudioPlayer";

import { PLAY_SONG } from "../constants";

export const mymusic = {
  allsongs: [
    {
      album_name: "Changes",
      album_released_year: 2020,
      album_picture:
        "https://www.billboard.com/files/media/justin-bieber-changes-2020-billboard-embed.jpg",
      all_songs: [
        {
          song_name: "Intentions",
          song_artists: "Justin Beiber",
          song_duration: "3:32",
          song_src_url: "http://192.168.0.2:3000/Intentions.mp3"
        }
      ]
    },
    {
      album_name: "Eega",
      album_released_year: 2012,
      album_picture:
        "https://upload.wikimedia.org/wikipedia/en/a/a3/Eega_soundtrack.jpg",
      all_songs: [
        {
          song_name: "Nene – Nanine",
          song_artists: "Deepu,Sahiti Galidevara,M.M Keeravani",
          song_duration: "4:11",
          song_src_url: "http://192.168.0.2:3000/Nene Nanine.mp3"
        }
      ]
    }
  ],
  allartists: [
    {
      artist_picture:
        "https://assets.capitalfm.com/2016/03/justin-bieber-press-shot-1453117791-editorial-long-form-1.jpg",
      artist_name: "Justin Bieber"
    },
    {
      artist_picture:
        "https://www.andhrawishesh.com/media/k2/items/src/MM-Keeravani-Music-For-NTR-Biopic.jpg",
      artist_name: "M.M Keeravani"
    }
  ],
  allalbums: [
    {
      album_picture: "https://pbs.twimg.com/media/EPWHxAXWkAA7QaR.jpg",
      album_name: "Changes",
      album_artist: "Justin Bieber",
      album_released_year: 2020
    },
    {
      album_picture:
        "https://upload.wikimedia.org/wikipedia/en/a/a3/Eega_soundtrack.jpg",
      album_name: "Eega",
      album_artist: "M.M Keeravani",
      album_released_year: 2012
    }
  ]
};

const myMusicReducer = (state = mymusic, action) => {
  return state;
};

// const nowplaying = {
//   song_name: "Intention",
//   song_artists: "Justin Beiber",
//   song_banner:
//     "https://www.billboard.com/files/media/justin-bieber-changes-2020-billboard-embed.jpg",
//   song_src_url: "http://192.168.0.2:3000/Intentions.mp3"
// };

const nowPlayingReducer = (state = null, action) => {
  if (action.type === PLAY_SONG) {
    AudioPlayerInstance.initAndPlay(action.payload.song_src_url);
    return action.payload;
  } else {
    return state;
  }
};

export default combineReducers({
  mymusic: myMusicReducer,
  recentplays: null,
  nowplaying: nowPlayingReducer,
  playlists: null
});
