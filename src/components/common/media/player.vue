<template>
    <div class="video-container">
        <video-player  class="video-player-box"
                 ref="videoPlayer"
                 :options="playerOptions"
                 :playsinline="true"
                 customEventName="customstatechangedeventname"
                 @play="onPlayerPlay($event)"
                 @pause="onPlayerPause($event)"
                 @ended="onPlayerEnded($event)"
                 @waiting="onPlayerWaiting($event)"
                 @playing="onPlayerPlaying($event)"
                 @loadeddata="onPlayerLoadeddata($event)"
                 @timeupdate="onPlayerTimeupdate($event)"
                 @canplay="onPlayerCanplay($event)"
                 @canplaythrough="onPlayerCanplaythrough($event)"

                 @statechanged="playerStateChanged($event)"
                 @ready="playerReadied">
        </video-player>
    </div>
</template>

<script>


import { videoPlayer } from 'vue-video-player'
    export default {
        name: 'player',
        components: {
            videoPlayer
        },
        methods: {
            onPlayerPlay(player) {
        // console.log('player play!', player)
            },
            onPlayerPause(player) {
                // console.log('player pause!', player)
            },
            // ...player event

            // or listen state event
            playerStateChanged(playerCurrentState) {
                // console.log('player current update state', playerCurrentState)
            },
            
            // player is ready
            playerReadied(player) {
                console.log('the player is readied', player)
                // you can use it to do something...
                // player.[methods]
            }
        },
        data() {
            return {
                playerOptions: {
                muted: false,
                language: 'en',
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                // height:200,
                // width:200,
                fluid:true,
                sources: [{
                    type: "video/mp4",
                    src: "http://localhost:3000/video"
                    // src: "http://vjs.zencdn.net/v/oceans.mp4"
                }],
                // poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
                 poster: "https://d2zihajmogu5jn.cloudfront.net/sintel/poster.png",
                }
            }
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            }
        },
    }
</script>

<style lang="scss" scoped>
    .video-container{
        width: 100%;
        height: 100%;
    }
</style>