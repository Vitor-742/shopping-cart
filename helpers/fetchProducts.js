const url = 'https://api.mercadolibre.com/sites/MLB/search?q=';

const fetchProducts = (computador) => fetch(`${url}${computador}`)
  .then((response) => response.json())
  .then((data) => data.results);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
