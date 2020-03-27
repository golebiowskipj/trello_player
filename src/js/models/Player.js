export class Player {
    constructor(video) {
        this.video = video;
        this.isPlaying = false;

        console.log('player cons', this.video);
    }

    playVideo() {
        this.video.play();
        this.isPlaying = true;
    }

    pauseVideo() {
        this.video.pause();
        this.isPlaying = false;
    }

    rewindBack() {
        this.video.currentTime = this.video.currentTime - 5;
    }

    rewindForward() {
        this.video.currentTime = this.video.currentTime + 5;
        console.log(this.video.currentTime)
    }
}