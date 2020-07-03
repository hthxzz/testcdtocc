<template>
  <div class="video-wrapper">
    <video-player
      class="video-player-box"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      customEventName="customstatechangedeventname"
      @ready="playerReadied"
    ></video-player>
    <!-- @play="onPlayerPlay($event)"
                 @pause="onPlayerPause($event)"
                 @ended="onPlayerEnded($event)"
                 @playing="onPlayerPlaying($event)"
                 @loadeddata="onPlayerLoadeddata($event)"
                 @timeupdate="onPlayerTimeupdate($event)"
                 @canplaythrough="onPlayerCanplaythrough($event)"

    @statechanged="playerStateChanged($event)"-->
  </div>
</template>

<script>
import "video.js/dist/video-js.css";
// import { videoPlayer } from 'vue-video-player';
// import index from "./index.js";
export default {
  name: "videoPlay",
  // components: {
  //     videoPlayer
  // },
  // mixins: ["index"],

  props: ["url"],
  data() {
    return {
      playerOptions: {
        // videojs options
        muted: true,
        autoplay: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        html5: {
          hls: {
            withCredentials: false
          }
        },
        flash: {
          hls: {
            withCredentials: false
          }
        },
        sources: [
          {
            // type: "rtmp/flv",
            type: "application/x-mpegURL",
            src: this.url
            // src: "http://172.18.0.142:83/openUrl/9VWCkne/live.m3u8"
          }
          // {
          //     type: "video/mp4",
          //     src: "https://www.runoob.com/try/demo_source/movie.mp4"
          // }
        ]
        // poster: "/static/images/author.jpg"
      }
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    onPlayerPlay(player) {
      // console.log('player play!', player)
    },
    onPlayerPause(player) {
      // console.log('player pause!', player)
    },
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied(player) {}
  }
};
</script>

<style lang="scss" scoped>
.video-wrapper {
  height: 100%;
  width: 100%;
}
</style>