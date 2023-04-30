class Product {
  constructor(title, image, price, desc) {
    this.title = title;
    this.image = image;
    this.price = price;
    this.desc = desc;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCartHandler(cartBtn) {
    cartBtn.addEventListener('click', () => {
      // this.cart를 어떻게 가져올건데?
      // this.cart.addToCart(this.product);
    });
  }

  render() {
    const productEl = document.createElement('li');
    productEl.className = 'product-item';
    const { title, image, price, desc } = this.product;
    productEl.innerHTML = `
      <div>
        <img src="${image}" alt="${title}" />
        <div class="product-item__content">
          <h2>${title}</h2>
          <h3>${price.toLocaleString()}원</h3>
          <p>${desc}</p>
          <button>장바구니 추가</button>
        </div>
      </div>
    `;

    const cartBtn = productEl.querySelector('button');
    this.addToCartHandler(cartBtn);

    return productEl;
  }
}

class ProductList {
  products = [
    new Product(
      '상품 1',
      'https://img-cf.kurly.com/shop/data/goodsview/20210930/gv10000230649_1.jpg',
      40000,
      '상품 1입니다!'
    ),
    new Product(
      '상품 2',
      'https://cdn.woodkorea.co.kr/news/photo/201911/36338_41505_3211.jpg',
      35000,
      '상품 2'
    ),
  ];

  render() {
    const productList = document.createElement('ul');
    productList.className = 'product-list';
    const frag = document.createDocumentFragment();
    this.products.forEach((product) => {
      const productItem = new ProductItem(product);
      frag.appendChild(productItem.render());
    });

    productList.appendChild(frag);

    return productList;
  }
}

class Cart {
  cart = [];

  getTotalPrice() {
    return this.cart.reduce((acc, item) => acc + item.price, 0);
  }

  updateTotalPrice() {
    const totalPrice = document.querySelector('.totalPrice');
    totalPrice.textContent = `전체 금액: ${this.getTotalPrice().toLocaleString()}원`;
  }

  addToCart(product) {
    this.cart.push(product);
    this.updateTotalPrice();
  }

  orderProductHandler(orderBtn) {
    orderBtn.addEventListener('click', () => {
      if (this.cart.length === 0) {
        alert('장바구니에 상품이 없습니다!');
      } else {
        alert('주문이 완료되었습니다!');
      }
    });
  }

  render() {
    const cartEl = document.createElement('section');
    cartEl.className = 'cart';
    cartEl.innerHTML = `
      <h2 class="totalPrice">전체 금액: 0원</h2>
      <button>주문하기</button>
    `;

    const orderBtn = cartEl.querySelector('button');
    this.orderProductHandler(orderBtn);

    return cartEl;
  }
}

class App {
  constructor(props) {
    this.props = props;
  }

  render() {
    const mainEl = document.querySelector(this.props.el);
    const cart = new Cart();
    const productList = new ProductList();
    mainEl.append(cart.render(), productList.render());
  }
}

const config = {
  el: '#app',
};

const app = new App(config);
app.render();
