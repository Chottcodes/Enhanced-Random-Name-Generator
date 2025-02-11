const slider = document.getElementById("myRange");
const sliderOutput = document.getElementById("slider-Output");
const randomizeButton = document.getElementById("randomize-Group");
const groupsContainer = document.getElementById("groups-Container");

sliderOutput.innerHTML = slider.value;
slider.oninput = () => {
  sliderOutput.innerHTML = slider.value;
};
randomizeButton.addEventListener("click", () => {
  const sliderValue = slider.value;
  let createdGroups = createGroups(sliderValue);
  createElementsForGroups(createdGroups);
  console.log(createGroups(sliderValue));

});
const getLocalStorage = () => {
  const namesfromStorage = localStorage.getItem("Names");
  const myArray = namesfromStorage ? JSON.parse(namesfromStorage) : [];
  return myArray;
};
const createGroups = (sliderInput) => {
  let newArr = [];
  const peopleArr = getLocalStorage();

  for (let i = 0; i < peopleArr.length; i++) {
    newArr.push(peopleArr[i]);
  }
  const shuffledPeople = shuffleArr(newArr);
  // console.log(shuffledPeople)
  const groupsBySlider = groupingPeople(shuffledPeople, sliderInput);
  return groupsBySlider;
};

const shuffleArr = (Array) => {
  for (let i = Array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [Array[i], Array[j]] = [Array[j], Array[i]];
  }
  return Array;
};
const groupingPeople = (Array, slider) => {
  const groups = [];
  let currentgroups = [];

  for (let i = 0; i < Array.length; i++) {
    currentgroups.push(Array[i]);
    if (currentgroups.length === Math.ceil(Array.length / slider)) {
      groups.push(currentgroups);
      currentgroups = [];
    }
  }
  if (currentgroups.length > 0) {
    groups.push(currentgroups);
  }
  return groups;
};
const createElementsForGroups = (groupsArray) => {
  groupsContainer.innerHTML = "";
  groupsArray.forEach((group, i) => {
    const div = document.createElement("div");
    div.classList.add("flex", "flex-col", "justify-center", "items-center");
    const h1 = document.createElement("h1");
    h1.innerHTML = `Group${i + 1}`;
    groupsContainer.appendChild(div);
    div.appendChild(h1);
    const groupList = document.createElement("ul");
    groupList.classList.add("text-lg", "text-white");
    group.forEach((person) => {
      const li = document.createElement("li");
      li.textContent = person;
      groupList.appendChild(li);
    });
    div.appendChild(groupList);
    groupsContainer.appendChild(div);
  });
};
