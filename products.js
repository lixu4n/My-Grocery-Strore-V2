const products = [
    {
      id: 1,
      name: "Chicken",
      organic: false,
      vegetarian: false,
      glutenFree: false,
      price: 8,
      img: "chicken-leg.png",
      category: "meat",
    },
    {
      id: 2,
      name: "Salmon",
      organic: false,
      vegetarian: false,
      glutenFree: false,
      price: 12,
      img: "salmon.png",
      category: "meat",
    },
    {
      id: 3,
      name: "Rice",
      organic: false,
      vegetarian: true,
      glutenFree: false,
      price: 3,
      img: "rice.png",
      category: "grains",
    },
    {
      id: 4,
      name: "Bread",
      organic: false,
      vegetarian: true,
      glutenFree: true,
      price: 5,
      img: "bread.png",
      category: "grains",
    },
    {
      id: 5,
      name: "Tofu",
      organic: false,
      vegetarian: true,
      glutenFree: true,
      price: 2,
      img: "tofu.png",
      category: "meat",
    },
    {
      id: 6,
      name: "Broccoli",
      organic: true,
      vegetarian: true,
      glutenFree: true,
      price: 2,
      img: "broccoli.png",
      category: "vegetables",
    },
    {
      id: 7,
      name: "Yogurt",
      organic: false,
      vegetarian: true,
      glutenFree: false,
      price: 5,
      img: "yogurt.png",
      category: "dairy",
    },
    {
      id: 8,
      name: "Milk",
      organic: false,
      vegetarian: true,
      glutenFree: false,
      price: 5,
      img: "milk.png",
      category: "dairy",
    },
    {
      id: 9,
      name: "Almond Milk",
      organic: true,
      vegetarian: true,
      glutenFree: true,
      price: 3,
      img: "almond-milk.png",
      category: "dairy",
    },
    {
      id: 10,
      name: "Strawberries",
      organic: true,
      vegetarian: true,
      glutenFree: true,
      price: 6,
      img: "strawberry.png",
      category: "fruits",
    },
  ];
  
  /**
   * List of available filters
   */
  const Filter = {
    VEGETARIAN: "vegetarian",
    GLUTEN_FREE: "glutenFree",
    ORGANIC: "organic",
    PRICE: "price",
  };
  
  /**
   * Checks if the product has the given filter
   * @param {Object} product
   * @param {Filter} filter
   */
  const checkProduct = (product, filter) => product[filter];
  
  /**
   * Filters products based on the given filters
   * @param {{vegetarian: boolean, glutenFree: boolean,
   *  organic: 'all'|'organic'|'nonOrganic', price:number}} filters
   */
  const filterProducts = (filters) =>
    products.filter((product) =>
      Object.entries(filters).every(([filter, value]) => {
        if (value === "all") {
          return true;
        }
        if (filter === Filter.ORGANIC) {
          return value === "organic" ? product.organic : !product.organic;
        }
        if (value) {
          return checkProduct(product, filter);
        }
        return true;
      })
    );
  