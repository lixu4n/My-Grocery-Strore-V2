/**
 *Changing tabs
 *
 */

document.addEventListener(
  "DOMContentLoaded",
  function () {
    const tabs = document.getElementsByClassName("tab");
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener("click", tabSwitch, false);
    }

    function tabSwitch() {
      document
        .getElementsByClassName("is-active")[0]
        .classList.remove("is-active");
      this.classList.add("is-active");
      this.classList.add("tab-active"); // add class tab-active

      //ACTIVE tab switching
      const allTabs = document.getElementsByClassName("tab");
      for (let i = 0; i < allTabs.length; i++) {
        allTabs[i].classList.remove("is-active", "tab-active");
      }
      this.classList.add("is-active", "tab-active");

      document.getElementsByClassName("is-show")[0].classList.remove("is-show");
      const arrayTabs = Array.prototype.slice.call(tabs);
      const index = arrayTabs.indexOf(this);
      document.getElementsByClassName("panel")[index].classList.add("is-show");
    }
  },
  false
);

/**
 * List of products to appear (all products at first)
 */
const productsToAppear = [...products];

/**
 * @param {{vegetarian: boolean, glutenFree: boolean, organic: boolean, nonOrganic: boolean}} filters
 */
const filterChangeHandler = (filters) => {
  const filtersCopy = {...filters};

  if (filters.nonOrganic && filters.organic) {
    filtersCopy.organic = "all";
    delete filtersCopy.nonOrganic;
  } else if (filters.nonOrganic) {
    filtersCopy.organic = "nonOrganic";
    delete filtersCopy.nonOrganic;
  } else if (filters.organic) {
    filtersCopy.organic = "organic";
    delete filtersCopy.nonOrganic;
  } else {
    filtersCopy.organic = "all";
    delete filtersCopy.nonOrganic;
  }

  const filteredProducts = filterProducts(filtersCopy);
  filteredProducts.sort((a, b) => a.price - b.price);
  renderProducts(filteredProducts);
};

/**
 * Renders the products
 * @param {Array} products
 */
const renderProducts = (products) => {
  const productsContainer = document.querySelector(".products-container");
  productsContainer.innerHTML = "";
  products.forEach((product) => {
    const productCheckbox = document.createElement("input");
    productCheckbox.type = "checkbox";
    productCheckbox.name = product.name;

    const productLabel = document.createElement("label");
    productLabel.classList.add("product");
    productLabel.innerHTML = `
            <img src="images/${product.img}" alt="${product.name}" />
            <div>
            <span class="product-name" price="${product.price}">${product.name}</span>
            <span class="product-price">$${product.price}</span>
            </div>
        `;

    productLabel.prepend(productCheckbox);
    productsContainer.appendChild(productLabel);
  });
};

const renderCart = () => {
  toastPop("Products added to cart");

  var products = document.getElementsByClassName("product");
  var productsName = [];
  var cart = document.getElementById("displayCart");
  cart.innerHTML = "";
  var content = document.createElement("P");

  content.innerHTML = "You have selected: ";
  content.append(document.createElement("br"));

  for (const ele of products) {
    let checkboxElement = ele.querySelector("input[type=checkbox]");
    let productName = ele.querySelector("input[name]").getAttribute("name");
    let productPrice = ele.querySelector("div > .product-name[price]").getAttribute("price");
    console.log(ele.childNodes[2]);
    var checked = checkboxElement.checked;
    if (checked) {
      var item = document.createTextNode(
        productName + " $" + productPrice
      );
      console.log("checked: " + productName);
      content.append(item);
      content.append(document.createElement("br"));
      productsName.push(productName);
    }
  }

  console.log(productsName);
  var price = getTotalPrice(productsName);
  content.append(document.createTextNode("The total price is $" + price));
  cart.append(content);

  document.getElementById("cart-button").classList.remove("button-hidden");
};

const getTotalPrice = (productsName) => {
  var total = 0;
  for (const ele of products) {
    if (productsName.indexOf(ele.name) > -1) {
      total += ele.price;
    }
  }
  return total;
};

if (document.readyState === "loading") {
  // Loading hasn't finished yet
  document.addEventListener("DOMContentLoaded", () =>
    renderProducts(productsToAppear)
  );
} else {
  // `DOMContentLoaded` has already fired
  renderProducts(productsToAppear);
}

function toastPop(text) {
  var x = document.getElementById("toast");
  x.innerText = text;
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 2000);
}

const NextPage = (index) => {
  const tabs = document.getElementsByClassName("tab");
  tabs[index].click();

  if (index == 3) {
    document.getElementById("order-button").classList.remove("button-hidden");
  }
};
