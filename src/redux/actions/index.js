import { PLAY_SONG } from "../constants";

export const playSongAction = song => {
  return {
    type: PLAY_SONG,
    payload: {
      ...song
    }
  };
};
