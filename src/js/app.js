import '../scss/app.scss';
// elements
import { $ } from './helpers/elements';
// helpers
import { idGen } from './helpers/idGen';
// models
import { Player } from './models/Player';
import { Adnotation } from './models/Adnotation';
// views
import { updateProgressBar } from './views/playerView';
import { openCreateAdnotationModal } from './views/adnotationView';
import { renderAdnotations, showAdnotation, hideAdnotation } from './views/adnotationsListView';
import { renderRangePickers } from './views/rangePickerView';
import { RangePicker } from './models/RangePicker';

/*
- throtling on adnotation visibility 
- adnotation size connected with player size 
- consistent state update 
- delete event listeners after they become useless
- styling by adding classes, not inline styles in js
- apply functionality to mobile phones (touch screen)
- remove unused selectors and elements from helpers/elements
- give better html calsses names
- style the app...
- maybe change adnotations from text area to some more elegant, resizable element (styled div with state that changes it to input so user can edit it)
- ADD REMOVE-ADNOTATION BUTTON
- ADD STOP BUTTON
*/


const init = () => {
    let state = {
        adnotations: [],
    };

    const setState = (property, value) => Object.assign(state, { ...state, [property]: value });

    // controllers ----------- 
    // player controller
    const player = new Player($.video);
    setState('player', player);

    $.play.addEventListener('click', () => player.playVideo());
    $.pause.addEventListener('click', () => player.pauseVideo());
    $.back.addEventListener('click', () => player.rewindBack());
    $.forward.addEventListener('click', () => player.rewindForward());
    $.video.addEventListener('timeupdate', () => {
        updateProgressBar(player.getVideoProgress());
        player.showHideAdnotations(state.adnotations, showAdnotation, hideAdnotation);
    });
    $.progressContainer.addEventListener('click', (e) => player.handleProgressBarRewind(e, e.target.closest('.js-video-progress-container')));

    // add new adnotation controller
    $.addNewAdnotation.addEventListener('click', () => {
        openCreateAdnotationModal(setState, state, idGen(state), $.video, Adnotation, () => renderAdnotations(state.adnotations, renderRangePickers, RangePicker));
    });

    // drag and drop

    $.dropzone.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
    });

    $.dropzone.forEach(zone => {
        zone.addEventListener('dragenter', (e) => {
            e.target.classList.add('drop-zone--active');
        })
    });

    $.dropzone.forEach(zone => {
        zone.addEventListener('dragleave', (e) => {
            e.target.classList.remove('drop-zone--active');
        })
    });

    $.dropzone.forEach(zone => {
        zone.addEventListener('drop', (e) => {
            e.target.classList.remove('drop-zone--active');
            const data = JSON.parse(e.dataTransfer.getData('text'));
            const { id, x, y } = data;
            const draggableElement = document.getElementById(id);
            const dropzone = event.target;
            const draggableElementId = draggableElement.id;

            const ad = state.adnotations.find(ad => ad.id == draggableElementId);

            if (dropzone.getAttribute('videozone')) {
                ad.isDragged = true;
                draggableElement.style.position = "absolute";
                draggableElement.style.top = `${e.offsetY - y}px`;
                draggableElement.style.left = `${e.offsetX - x}px`;

            } else if (dropzone.getAttribute('listzone')) {
                ad.isDragged = false;
                draggableElement.style.position = "static";
            }

            renderRangePickers(state.adnotations, RangePicker);
            // without this if statement there was  'Failed to execute 'appendChild' on 'Node': The new child element contains the parent.' ERROR
            if (dropzone.getAttribute('videozone')) {
                if (draggableElement.parentNode.getAttribute('videozone')) return;
            }
            dropzone.appendChild(draggableElement);
            e.dataTransfer.clearData();
        });
    });

    window.state = state;
}

// ===============================================
$.video.addEventListener('loadedmetadata', () => {
    init();
});