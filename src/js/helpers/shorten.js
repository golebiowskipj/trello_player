export const shorten = (str, n) => {
    if (str.length <= n || str === '') return str;

    const shortened = str.substring(0, n - 3);

    return `${shortened}...`;
}