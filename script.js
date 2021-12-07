const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');
const precoTotal = document.querySelector('.total-price');
const botaoLimpa = document.querySelector('.empty-cart');
const container = document.querySelector('.container');
let precoAt = 0;

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
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
}

function cartItemClickListener(event) {
  const a = event.target;
  a.parentNode.removeChild(a);
}

const carregando = () => {
  const span = document.createElement('span');
  span.className = 'loading';
  span.innerHTML = 'carregando...';
  container.appendChild(span);
};

const carregado = () => {
  const achaSpan = document.querySelector('.loading');
  achaSpan.parentNode.removeChild(achaSpan);
};

const tiraDoStorage = async (p1) => {
  carregando();
  const a = await fetchItem(p1);
  carregado();
  localStorage.removeItem(a.id);
  precoTotal.innerHTML = precoAt - a.price;
  precoAt -= a.price;
};

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  li.addEventListener('click', () => tiraDoStorage(sku));
  return li;
}

const itemDoCarrinho = async (p1) => {
  carregando();
  const item = await fetchItem(p1);
  carregado();
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
  let cont = 0;
  if (ids.length > 0) {
    ids.forEach(async (item) => {
      carregando();
      const a = await fetchItem(item);
      carregado();
      cont += a.price;
      precoAt = cont;
      precoTotal.innerHTML = cont;
    });
  }
};

const totalPreco = async (p1) => {
  precoTotal.innerHTML = precoAt + p1.price;
  precoAt += p1.price;
};

const addProductToSection = async () => {
  carregando();
  const productElement = await fetchProducts('computador');
  carregado();
  productElement.forEach(({ id, title, thumbnail }, index) => {
    const productElement2 = createProductItemElement({
      sku: id,
      name: title,
      image: thumbnail,
    });
    const botao = productElement2.lastChild;
    botao.addEventListener('click', () =>
      itemDoCarrinho(productElement[index].id));
    botao.addEventListener('click', () => totalPreco(productElement[index]));

    items.appendChild(productElement2);
  });
};

const limparTudo = () => {
  localStorage.clear();
  const a = document.querySelectorAll('.cart__item');
  a.forEach((b) => b.parentNode.removeChild(b));
  precoTotal.innerHTML = 0;
  precoAt = 0;
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

window.onload = () => {
  addProductToSection();
  buscar();
  botaoLimpa.addEventListener('click', limparTudo);
};
