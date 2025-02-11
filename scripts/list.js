const listInput = document.getElementById("list-Name-Input");
const submitButton = document.getElementById("list-Submit-Button");
const ul = document.getElementById("ul");
let inputNames = JSON.parse(localStorage.getItem("Names")) || [];

document.addEventListener("DOMContentLoaded", () => {
    displayNamestoList();
});
submitButton.addEventListener("click", () => {
  const userInput = listInput.value;
  AddNames(userInput);
  listInput.value = "";
  addNamestoLocalStorage();
});
const AddNames = (input) => {
  inputNames.push(input);
  displayNamestoList();
};
const displayNamestoList = () => {
  ul.innerHTML = "";
  inputNames.forEach((names, index) => {
    const button = document.createElement("button");
    const listName = document.createElement("li");
    listName.textContent = names;
    listName.classList.add("flex", "justify-between");
    button.textContent = "Delete";

    button.addEventListener("click", () => {
      inputNames.splice(index, 1);
      listName.remove();
      removeFromLocalStorage(names);
    });
    listName.appendChild(button);
    ul.appendChild(listName);
  });
};

const addNamestoLocalStorage = () => {
  let namesString = JSON.stringify(inputNames);
  localStorage.setItem("Names", namesString);
};
const removeFromLocalStorage = (namesToRemove) => {
  let namesTooRemove = JSON.parse(localStorage.getItem("Names")) || [];
  let namesIndex = namesTooRemove.indexOf(namesToRemove);
  namesTooRemove.splice(namesIndex, 1);
  localStorage.setItem("Names", JSON.stringify(namesTooRemove));
};
