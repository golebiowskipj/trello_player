import '../scss/app.scss';
// elements
import { $ } from './helpers/elements';
// models
import { Player } from './models/Player';
import { AdnotationsList } from './models/AdnotationsList';
import { addNewAdnotation } from './views/adnotationsListView';
import { openCreateAdnotationModal } from './views/createAdnotationView';
import { Adnotation } from './models/Adnotation';
// views
import { updateProgressBar } from './views/playerView';
import { CreateAdnotation } from './models/Adnotation';

console.log('app is running');
// global state of the app
/** 
 * - video
 * - list of addnotations
 * */


let state = {
    adnotations: [],
};

const setState = (property, value) => Object.assign(state, { ...state, [property]: value });

// controllers 

// player controller

const player = new Player($.video);
setState('player', player);

$.play.addEventListener('click', () => player.playVideo());
$.pause.addEventListener('click', () => player.pauseVideo());
$.back.addEventListener('click', () => player.rewindBack());
$.forward.addEventListener('click', () => player.rewindForward());
$.video.addEventListener('timeupdate', () => updateProgressBar(player.getVideoProgress()));
$.progressContainer.addEventListener('click', (e) => player.handleProgressBarRewind(e, e.target.closest('.js-video-progress-container')));

// add new adnotation controller

$.addNewAdnotation.addEventListener('click', () => {
    openCreateAdnotationModal(setState, state, idGen(), $.video, Adnotation, ()=>{});
});

// adnotation list controller

const adnotationsList = new AdnotationsList();


const idGen = () => {
    let newId = state.adnotations.length + 1;
    state.adnotations.forEach(adnotation => {
        if (adnotation.id === newId) {
            return newId++;
        }
    })
    return newId;
}

window.state = state;





















