export const $ = {
    body: document.querySelector('body'),
    video: document.querySelector('.js-video'),
    play: document.querySelector('.js-play'),
    pause: document.querySelector('.js-pause'),
    back: document.querySelector('.js-back'),
    forward: document.querySelector('.js-forward'),
    addNewAdnotation: document.querySelector('.js-add-adnotation-button'),
    progressContainer: document.querySelector('.js-video-progress-container'),
    progressBar: document.querySelector('.js-video-progress'),
    popup: document.querySelector('.js-popup'),
    list: document.querySelector('.js-list'),
    draggedControls: document.querySelector('.js-dragged-controls'),
    draggedControlsContainer: document.querySelector('.js-dragged-controls-container'),
    draggedControlsFill: document.querySelector('.js-dragged-controls-fill'),
    dropzone: Array.from(document.querySelectorAll('.js-dropzone')),
}

export const selectors = {
    popup: '.js-popup',
    closePopup: '.js-close-popup',
    popupOverlay: '.js-popup-overlay',
    textInput: '.js-text-input',
    sizeInput: '.js-size-input',
    radios: 'input[name="size"]',
    submit: '.js-submit-form',
    form: '.js-form',
    draggedControlsContainer: '.js-dragged-controls-container',
    draggedControlsFill: '.js-dragged-controls-fill',
    elementToDrag: '.js-element-to-drag',
}