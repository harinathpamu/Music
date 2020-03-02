class AudioPlayer {
  constructor() {
    this.initState();
    this.ignitePlayer();
    this.initListeners();
  }

  initState() {
    this.state = {
      hasError: false,
      isPlaying: false,
      inLoop: false,
      inProgress: false,
      currentDuration: 0,
      totalDuration: 0
    };
  }

  ignitePlayer() {
    this.player = new window.Audio();
    this.player.id = "audio";
    // this.player.autoplay = true;
    this.player.preload = "metadata";
  }

  initListeners() {
    this.player.onloadedmetadata = () => {
      this.state.totalDuration = this.player.duration;
      this.updateListeners(this.state);
      console.log("onloadedmetadata called");
    };

    this.player.oncanplaythrough = () => {
      if (!this.state.isPlaying) {
        this.play();
        console.log("oncanplaythrough called");
      }
      // console.log("oncanplaythrough called");
    };

    this.player.ontimeupdate = () => {
      this.state.currentDuration = this.player.currentTime;
      this.updateListeners(this.state);
    };

    this.player.onplay = () => {
      this.state.isPlaying = true;
      this.updateListeners(this.state);
      console.log("onplay called");
    };

    this.player.onpause = () => {
      this.state.isPlaying = false;
      this.updateListeners(this.state);
      console.log("onpause called");
    };

    this.player.onplaying = () => {
      this.state.inProgress = false;
      if (!this.state.isPlaying) {
        this.updateListeners(this.state);
      }
      console.log("onplaying called");
    };

    // this.player.onprogress = () => {
    //   this.state.inProgress = true;
    //   if (!this.state.isPlaying) {
    //     this.updateListeners(this.state);
    //   }
    //   console.log("onprogress called");
    // };

    this.player.onseeking = () => {
      this.state.inProgress = true;
      if (!this.state.isPlaying) {
        this.updateListeners(this.state);
      }
      console.log("onseeking called");
    };
    this.player.onseeked = () => {
      this.state.inProgress = false;
      if (!this.state.isPlaying) {
        this.play();
      }
      console.log("onseeked called");
    };

    this.player.onended = () => {
      this.state.isPlaying = false;
      this.updateListeners(this.state);
      console.log("onended called");
    };

    this.player.onerror = () => {
      this.state.hasError = true;
      this.updateListeners(this.state);
      console.log("onerror called");
    };
  }

  initAndPlay(song_url) {
    if (this.state.isPlaying) {
      this.pause();
      this.initState();
      this.player.load(song_url);
    }
    this.player.src = song_url;
    console.log("player intiated");
    console.dir(this.player);
  }

  play() {
    if (this.player) {
      this.player.play().then(() => {
        console.log("play called");
      });
    }
  }

  pause() {
    if (this.player) {
      this.player.pause();
      console.log("pause called");
    }
  }

  loop(loopIt) {
    if (this.player) {
      this.player.loop = loopIt;
      this.state.inLoop = loopIt;
      if (!this.state.isPlaying) {
        this.updateListeners(this.state);
      }
    }
  }

  seek = seekTo => {
    if (this.player) {
      this.player.currentTime = seekTo;
      this.state.time = this.player.currentTime;
      if (!this.state.isPlaying) {
        this.updateListeners(this.state);
      }
    }
  };

  updateListeners(data) {
    this.listeners &&
      this.listeners.forEach(listener => {
        listener(data);
      });
  }

  initialUpdateForListeners() {
    this.updateListeners(this.state);
  }

  addListener(listener) {
    this.listeners = this.listeners || [];
    this.listeners.push(listener);
    return this.listeners.length - 1;
  }

  removeListener(index) {
    if (this.listeners) {
      this.listeners.splice(index, 1);
    }
  }
}

export const AudioPlayerInstance = new AudioPlayer();
