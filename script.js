const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');// tirar do localstorage quando remover da lista
const precoTotal = document.querySelector('.total-price')
let precoAt = 0

// fazer um jeito do numero ficar exatamente certo pra passar no av.

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function cartItemClickListener(event) {
  const a = event.target;
  a.parentNode.removeChild(a);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  li.addEventListener('click', (() => tiraDoStorage(sku)));
  return li;
}

const itemDoCarrinho = async (p1) => {
  const item = await fetchItem(p1);
  const a = createCartItemElement({
    sku: item.id,
    name: item.title,
    salePrice: item.price,
  });
  saveCartItems(p1, item);
  cartItems.appendChild(a);
};

const buscar = () => {
  const ids = getSavedCartItems();
  ids.forEach((id) => itemDoCarrinho(id));
  let cont = 0
  if (ids.length > 0) {
    ids.forEach( async (item) => {
    const a = await fetchItem(item)
    cont += a.price
    precoAt = cont
    precoTotal.innerHTML = (cont)
  })
}
};

const tiraDoStorage = async (p1) => {
  let a = await fetchItem(p1)
  localStorage.removeItem(a.id)
  precoTotal.innerHTML = (precoAt - a.price)
  precoAt = precoAt - a.price
}

const addProductToSection = async () => {
  const productElement = await fetchProducts('computador');
  productElement.forEach(({ id, title, thumbnail }, index) => {
    const productElement2 = createProductItemElement({
      sku: id,
      name: title,
      image: thumbnail,
    }); 
    const botao = productElement2.lastChild;
    botao.addEventListener('click', () => itemDoCarrinho(productElement[index].id));
    botao.addEventListener('click', () => totalPreco(productElement[index]));
    //botao.addEventListener('click', () => tiraDoStorage(productElement[index]));

    items.appendChild(productElement2);
  });
};

const totalPreco = async (p1) => {
  precoTotal.innerHTML = (precoAt + p1.price)
  precoAt += p1.price
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

window.onload = () => {
  addProductToSection();
  buscar();
};
