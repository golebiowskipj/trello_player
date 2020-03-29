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

    showHideAdnotations(adnotations, show, hide) {
        const filtered = adnotations.filter(adnotation => adnotation.isDragged);

        filtered.forEach(adnotation => {
            // visible
            if (adnotation.start <= this.video.currentTime && adnotation.stop >= this.video.currentTime) {
                if (adnotation.isVisible) {
                    return;
                } else {
                    show(adnotation.id);
                    adnotation.isVisible = true;
                }
            } else {
                hide(adnotation.id);
                adnotation.isVisible = false;
            }
        });
    }

    handleProgressBarRewind(e, clickedElement) {
        const width = clickedElement.getBoundingClientRect().width;
        const progress = e.offsetX / width;

        this.video.currentTime = progress * this.video.duration;
    }
}