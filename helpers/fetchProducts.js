const url = 'https://api.mercadolibre.com/sites/MLB/search?q=';

const fetchProducts = async (computador) => fetch(`${url}${computador}`)
  .then((response) => response.json())
  .then((data) => data.results)
  .catch(() => new Error('You must provide an url'));// generaliza todos os erros, ver como faz pra lidar com o erro específico

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
