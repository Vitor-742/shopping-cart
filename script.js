const items = document.querySelector('.items');
const cartItems = document.querySelector('.cart__items');

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
  return li;
}

const itemDoCarrinho = async (p1) => {
  console.log(p1);
  const item = await fetchItem(p1);
  const a = createCartItemElement({
    sku: item.id,
    name: item.title,
    salePrice: item.price,
  });
  cartItems.appendChild(a);
};

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
    items.appendChild(productElement2);
  });
};

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

window.onload = () => {
  addProductToSection();
};
