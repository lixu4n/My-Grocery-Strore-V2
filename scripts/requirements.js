var requirements = {
  vegetarian: false,
  glutenFree: false,
};

const getRequirements = () => {
  var data = document.getElementsByClassName("requirement1");
  for (const element of data) {
    const labelElement = document.querySelector(".products-filters").querySelector(`label[for="${element.id}"]`);
    ((element.checked) ? labelElement.setAttribute("data-selected", "true") : labelElement.removeAttribute("data-selected"));
    var name = element.name;
    requirements[name] = element.checked;
  }
  filterChangeHandler(requirements);
};
