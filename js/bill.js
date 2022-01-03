const displayNumbers = (list) => {
  let marks = "";
  list.map((listItem) => {
    marks += `
          mark: ${listItem.innerText}`;
  });
  return marks;
};

const main = () => {
  const numbersSelectedDiv = document.querySelector(".bill-numbers");
  const totalDiv = document.querySelector(".bill-total");

  let numbersPicked = localStorage.getItem("numbersSelected");
  numbersSelectedDiv.innerText = ` ${numbersPicked}`;
  totalDiv.innerText = `Total: $${localStorage.getItem("betAmount")}`;
};

main();
