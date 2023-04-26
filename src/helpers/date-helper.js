export const dateParser = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('id', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};
