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
        template.addEventListener('dragstart', handleDragStart);
        template.addEventListener('dragend', handleDragEnd);

        fragment.appendChild(template);
    });

    $.list.innerHTML = '';
    $.list.appendChild(fragment);
}

export const handleAdnotationTextChange = (e, adnotation, renderRangePickers, list, RangePicker) => {
    adnotation.text = e.target.value;
    renderRangePickers(list, RangePicker);
}

export const handleDragStart = (e) => {
    e.currentTarget.classList.add('list__item--dragging');
    e.dataTransfer.setData('text/plain', e.target.id)
}

export const handleDragEnd = (e) => {
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