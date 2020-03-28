import { $, selectors } from '../helpers/elements';

export const openCreateAdnotationModal = (setState, state, id, video, Adnotation, rerenderList) => {
    let data;
    const template = `
    <section class="popup js-popup">
        <div class="popup__overlay js-popup-overlay"></div>
        <div class="popup__body">
        <button class="close-popup-button js-close-popup">x</button>
        <form class="form js-form">
            <article class="form__adnotations">
                <label class="form__label" for="adnotation-text">Adnotation text:</label>
                <input class="js-text-input" id="adnotation-text" type="text" maxlength="80" autocomplete="off" />
            </article>
            <article class="form__sizes">
                <p>Sizes:</p>
                <label class="form__label" for="size-s">S</label>
                <input id="size-s" type="radio" name="size" value="s" checked>
                <label class="form__label" for="size-m">M</label>
                <input id="size-m" type="radio" name="size" value="m">
                <label class="form__label" for="size-l">L</label>
                <input id="size-l" type="radio" name="size" value="l">
            </article>
            <button class="form__submit-button js-submit-form">save</button>
        </form>
        </div>
    </section>
    `;

    $.body.insertAdjacentHTML('beforeend', template);
    document.querySelector(selectors.closePopup).addEventListener('click', destroyModal);
    document.querySelector(selectors.popupOverlay).addEventListener('click', destroyModal);
    document.querySelector(selectors.form).addEventListener('submit', (e) => getFormData(e, setState, state, id, video, Adnotation, rerenderList));
}

const destroyModal = () => {
    document.querySelector(selectors.popup).remove();
}

const getFormData = (e, setState, state, id, video, Adnotation, rerenderList) => {
    e.preventDefault();
    const textInput = document.querySelector(selectors.textInput).value;
    const radioInput = Array.from(document.querySelectorAll(selectors.radios)).find(radio => radio.checked).value;

    const adnotation = new Adnotation(id, video);
    adnotation.text = textInput;
    adnotation.size = radioInput;

    setState('adnotations', state.adnotations.concat(adnotation));
    rerenderList();
    destroyModal();
}