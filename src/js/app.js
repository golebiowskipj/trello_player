import '../scss/app.scss';
// elements
import { $ } from './helpers/elements';
// models
import { Player } from './models/Player';
// views

console.log('app is running');
// global state of the app
/** 
 * - video
 * 
 * */


let state = {
    elo: 'elo',
};

const setState = (property, value) => Object.assign(state, { ...state, [property]: value });


// controllers 

const player = new Player($.video);
setState('player', player);

$.play.addEventListener('click', () => player.playVideo());
$.pause.addEventListener('click', () => player.pauseVideo());
$.back.addEventListener('click', () => player.rewindBack());
$.forward.addEventListener('click', () => player.rewindForward());





















