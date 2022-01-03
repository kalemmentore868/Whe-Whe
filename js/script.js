const displayNumbers = (list) => {
  let marks = "";
  list.map((listItem) => {
    marks += `
        mark: ${listItem.innerText}`;
  });
  return marks;
};

const showCashAndClear = (
  numbersSelected,
  betAmount,
  cashButton,
  clearButton
) => {
  if (numbersSelected.length == 5 && betAmount > 0) {
    cashButton.classList.remove("fade");
    clearButton.classList.remove("fade");
  } else {
    cashButton.classList.add("fade");
    clearButton.classList.add("fade");
  }
};

const main = () => {
  const numberGrid = document.querySelector(".number-grid");
  const amountButtonsDiv = document.querySelector(".amount-buttons");
  const betTotalDiv = document.querySelector(".bet-total");
  const numbersSelectedDiv = document.querySelector(".numbers-selected");
  const cashButton = document.querySelector(".cash");
  const clearButton = document.querySelector(".clear");
  const modal = document.querySelector(".modal");
  const totalDiv = document.querySelector("#total");

  let betAmount = 0;
  let numbersSelected = [];

  amountButtonsDiv.addEventListener("click", (event) => {
    if (event.target.tagName == "BUTTON") {
      betAmount += parseInt(event.target.innerText.substring(1));
      betTotalDiv.innerText = `Total: $${betAmount}`;
    }

    showCashAndClear(numbersSelected, betAmount, cashButton, clearButton);
  });

  numberGrid.addEventListener("click", (event) => {
    if (
      event.target.tagName == "BUTTON" &&
      !isNaN(event.target.innerText) &&
      event.target.classList.contains("picked") == false &&
      numbersSelected.length < 5
    ) {
      event.target.classList.add("picked");
      numbersSelected.push(event.target);
      numbersSelectedDiv.innerText = `Select 5 Numbers
      Numbers Selected: ${displayNumbers(numbersSelected)}`;
    }
    showCashAndClear(numbersSelected, betAmount, cashButton, clearButton);
  });

  clearButton.addEventListener("click", () => {
    if (!clearButton.classList.contains("fade")) {
      numbersSelected.map((number) => {
        number.classList.remove("picked");
      });
      numbersSelected = [];
      betAmount = 0;
      betTotalDiv.innerText = `Total $${betAmount}`;
      numbersSelectedDiv.innerText = `Select 5 Numbers
              Numbers Selected`;
    }
  });

  cashButton.addEventListener("click", () => {
    const inputs = document.querySelectorAll("input");
    const enterChangeDiv = document.querySelector(".enter-change");
    const modalCloseButton = document.querySelector("#close");
    const modalCashButton = document.querySelector("#confirm");
    if (!cashButton.classList.contains("fade")) {
      modal.classList.remove("hide");
      totalDiv.innerText = `$${betAmount}`;

      enterChangeDiv.addEventListener("click", (event) => {
        if (!isNaN(event.target.innerText) || event.target.innerText == ".") {
          inputs[0].value += `${event.target.innerText}`;
        } else if (event.target.innerText == "cl") {
          inputs[0].value = "";
        }

        setTimeout(() => {
          const change = parseFloat(inputs[0].value) - betAmount;
          if (change >= 0) {
            inputs[1].value = change.toFixed(2);
          } else {
            inputs[1].value = "Not enough funds";
          }
        }, 2000);
      });

      modalCloseButton.addEventListener("click", () => {
        inputs[0].value = "";
        inputs[1].value = "";
        modal.classList.add("hide");
      });

      modalCashButton.addEventListener("click", () => {
        if (inputs[1].value != "Not enough funds" && inputs[1].value != "") {
          const link = modalCashButton.children[0];
          link.href = "../html/bill.html";
          localStorage.setItem("betAmount", betAmount);
          const numbersForBill = numbersSelectedDiv.innerText;
          localStorage.setItem("numbersSelected", numbersForBill);
        }
      });
    }
  });
};

main();
