import { $ } from '../helpers/elements';

export const renderAdnotations = (adnotationsList, renderRangePickers, RangePicker) => {
    const fragment = document.createDocumentFragment();

    const filtered = adnotationsList.filter(adnotation => !adnotation.isDragged);

    filtered.forEach(ad => {
        const template = document.createElement('textarea');
        template.value = ad.text;
        template.id = ad.id;
        template.classList.add('list__item', `list__item--${ad.size}`, 'js-element-to-drag');
        template.setAttribute('draggable', true);

        template.addEventListener('change', (e) => handleAdnotationTextChange(e, ad, renderRangePickers, adnotationsList, RangePicker));
        template.addEventListener('dragstart', (e) => handleDragStart(e, ad));
        template.addEventListener('dragend', (e) => handleDragEnd(e, ad));

        fragment.appendChild(template);
    });

    $.list.innerHTML = '';
    $.list.appendChild(fragment);
}

export const handleAdnotationTextChange = (e, adnotation, renderRangePickers, list, RangePicker) => {
    adnotation.text = e.target.value;
    renderRangePickers(list, RangePicker);
}

export const handleDragStart = (e, adnotation) => {
    e.currentTarget.classList.add('list__item--dragging');

    const data = {
        id: e.target.id,
        x: e.offsetX,
        y: e.offsetY,
    }

    e.dataTransfer.setData('text/plain', JSON.stringify(data));
}

export const handleDragEnd = (e, adnotation) => {
    e.target.classList.remove('list__item--dragging');
}

export const showAdnotation = (id) => {
    const ad = document.getElementById(id);

    ad.style.display = 'block';
}

export const hideAdnotation = (id) => {
    const ad = document.getElementById(id);

    ad.style.display = 'none';
}