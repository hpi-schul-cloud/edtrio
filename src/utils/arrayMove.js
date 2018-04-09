//https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
const arrayMove = (arr, from, to) => {
    arr.splice(to, 0, arr.splice(from, 1)[0]);
};

export default arrayMove;