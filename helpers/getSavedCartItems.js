const getSavedCartItems = () => {
  const ant = [];
  Object.keys(localStorage).forEach((item) => {
    ant.push(item);
  });
  return ant;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
