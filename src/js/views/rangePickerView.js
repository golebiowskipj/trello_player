import { $ } from '../helpers/elements';
import { shorten } from '../helpers/shorten';

export const renderRangePickers = (adnotations, RangePicker) => {
    const dragged = adnotations.filter(adnotation => adnotation.isDragged);
    const container = $.draggedControls;
    container.innerHTML = '';

    dragged.forEach(adnotation => {
        const template = `
        <div class="dragged-controls__item">
            <p>Adnotation ${adnotation.id} | ${shorten(adnotation.text, 20)}</p>
            <div id="slider-${adnotation.id}"></div>
        </div>
        `;

        container.insertAdjacentHTML('beforeend', template);

        const rangePicker = new RangePicker(adnotation);
        rangePicker.createSlider();
    });
}




