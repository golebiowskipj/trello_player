export const getDraggedAdnotations = (adnotations) => {
    return adnotations.filter(adnotation => adnotation.isDragged);
}