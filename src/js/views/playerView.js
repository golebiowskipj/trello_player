import { $ } from '../helpers/elements';

export const updateProgressBar = (progress) => {
    $.progressBar.style.width = progress + '%';
}