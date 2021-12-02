const url1 = 'https://api.mercadolibre.com/items/';

const fetchItem = (id) => fetch(`${url1}${id}`)
.then((response) => response.json());

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
