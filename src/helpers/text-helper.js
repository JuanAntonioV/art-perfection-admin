export const upperFirst = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const textParser = (str, length) => {
    if (!str) return '';

    if (str.length > length) {
        return str.slice(0, length) + '...';
    }

    return str;
};
