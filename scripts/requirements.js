var requirements = {
  vegetarian: false,
  glutenFree: false,
  organic: false,
  nonOrganic: false,
};

const getRequirements = () => {
  var data = document.getElementsByClassName("requirement1");
  for (const element of data) {
    var name = element.name;
    requirements[name] = element.checked;
  }
  filterChangeHandler(requirements);

  toastPop("Requirements confirmed");
  NextPage(2);
};
