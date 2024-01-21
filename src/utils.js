// Fisher-Yates shuffle
const shuffle = (array) => {
  let m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
};

const capitalize = (text) => {
  return `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`;
};

export { shuffle, capitalize };
