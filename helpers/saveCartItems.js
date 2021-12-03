const saveCartItems = (p1, item) => {
  localStorage.setItem(p1, item);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
