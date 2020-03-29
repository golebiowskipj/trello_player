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
import { getDraggedAdnotations } from './views/adnotationsControlsView';
import { renderRangePicker, renderRangePickers } from './views/rangePickerView';
import { RangePicker } from './models/RangePicker';


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
            const id = e.dataTransfer.getData('text');
            const draggableElement = document.getElementById(id);
            const dropzone = event.target;
            const draggableElementId = draggableElement.id;

            const ad = state.adnotations.find(ad => ad.id == draggableElementId);

            if (dropzone.getAttribute('videozone')) {
                ad.isDragged = true;
            } else if (dropzone.getAttribute('listzone')) {
                ad.isDragged = false;
            }

            renderRangePickers(state.adnotations, RangePicker);

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