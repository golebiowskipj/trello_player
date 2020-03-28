export class Adnotation {
    constructor(id, video) {
        this.id = id;
        this.text = '';
        this.size = 's';
        this.start = 0;
        this.stop = video.duration;
        this.offsetX = 0;
        this.offsetY = 0;
        this.isDragged = false;
    }
}