export const idGen = (state) => {
    let newId = state.adnotations.length + 1;
    state.adnotations.forEach(adnotation => {
        if (adnotation.id === newId) {
            return newId++;
        }
    })
    return newId;
}