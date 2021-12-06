require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  test('confere se a função fecthProducts existe', () => {
    expect(typeof fetchProducts).toBe('function')
  })
  test('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
    fetchProducts('computador')
    await expect(fetch).toHaveBeenCalled()
  })
  test("Teste se, ao chamar a função fetchProducts com o argumento 'computador', a função fetch utiliza o endpoint 'https://api.mercadolibre.com/sites/MLB/search?q=computador'", async () => {
    fetchProducts('computador')
    await expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador')
  })
  test('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch.results)
  })
  test('Teste se, ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    const espera = new Error('You must provide an url')
    expect(await fetchProducts()).toEqual(espera)
  })
});
