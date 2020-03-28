export class Player {
    constructor(video) {
        this.video = video;
        this.isPlaying = false;
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
    }

    stopVideo() {
        this.video.currentTime = 0;
    }

    getVideoProgress() {
        const duration = this.video.duration;
        const currentTime = this.video.currentTime;
        const videoProgress = currentTime / duration * 100; //in %

        return videoProgress;
    }

    handleProgressBarRewind(e, clickedElement) {
        const width = clickedElement.getBoundingClientRect().width;
        const progress = e.offsetX / width;

        this.video.currentTime = progress * this.video.duration;
    }
}