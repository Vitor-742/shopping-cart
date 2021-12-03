const getSavedCartItems = () => {
  /* for(i = 0; i < localStorage.length; i += 1) {
    console.log(Object.keys(localStorage))
  } */
  const ant = [];
  Object.keys(localStorage).forEach((item) => {
    ant.push(item);
  });
  return ant;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
