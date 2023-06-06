let totalAmount = document.getElementById("totalAmount");
let userAmount = document.getElementById("userAmount");
let checkAmountButton = document.getElementById("checkAmount");
let totalButton = document.getElementById("totalButton");
let productTitle = document.getElementById("productTitle");
let budgetError = document.getElementById("budgetError");
let productError = document.getElementById("productError");
let costError = document.getElementById("costError");
let totalBudget = document.getElementById("totalBudget");
let Expenses = document.getElementById("Expenses");
let Remaining = document.getElementById("Remaining");
let list = document.getElementById("list");
let stAmount = "";

function ProductTitle() {
  stAmount = totalAmount.value;
  if (stAmount === "" || stAmount < 0) {
    budgetError.classList.remove("hide");
  } else {
    budgetError.classList.add("hide");
    totalBudget.innerHTML = stAmount;
    Remaining.innerText = stAmount - Expenses.innerText;
    totalAmount.value = "";
  }
};

let disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};


let listCreator = (expenseName, expenseValue) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  list.appendChild(sublistContent);
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(sublistContent);
};
let modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = Remaining.innerText;
  let currentExpense = Expenses.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }
  Remaining.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  Expenses.innerText = parseInt(currentExpense) - parseInt(parentAmount);
  parentDiv.remove();
};

function amountChecker() {
  if (!userAmount.value || !productTitle.value) {
    productError.classList.remove("hide");
        return false;
  }
  disableButtons(false);
  let expenditure = parseInt(userAmount.value);
  let sum = parseInt(Expenses.innerText) + expenditure;
  Expenses.innerText = sum;
  const totalBalance = stAmount - sum;
  Remaining.innerText = totalBalance;
  listCreator(productTitle.value, userAmount.value);
  productTitle.value = "";
  userAmount.value = "";
};
