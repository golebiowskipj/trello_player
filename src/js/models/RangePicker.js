import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

export class RangePicker {
    constructor(adnotation) {
        this.from = adnotation.start;
        this.to = adnotation.stop;
        this.id = adnotation.id;
        this.videoLength = adnotation.video.duration,
        this.setStart = adnotation.setStart;
        this.setStop = adnotation.setStop;
    }

    createSlider() {
        const slider = document.getElementById(`slider-${this.id}`);

        noUiSlider.create(slider, {
            start: [this.from, this.to],
            connect: true,
            range: {
                'min': 0,
                'max': this.videoLength
            }
        });


        slider.noUiSlider.on('update', (e) => this.appendEventControls(e, this.setStart, this.setStop))
    }

    appendEventControls(e, setStart, setStop) {
        setStart(e[0]);
        setStop(e[1]);
    }
}