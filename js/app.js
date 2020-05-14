const button = document.querySelector("#button");
const inputDiv = document.querySelector("#input-text");
const translitDiv = document.querySelector("#translit-text");
const inputField = document.querySelector("#input");
const deleteButton = document.querySelector("#delete");

function translit(str) {
  const ru = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "j",
    з: "z",
    и: "i",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ы: "y",
    э: "e",
    ю: "u",
    я: "ya",
  };

  const newStr = [];

  str = str.replace(/[ъь]+/g, "").replace(/й/g, "i");

  for (let i = 0; i < str.length; i += 1) {
    newStr.push(
      ru[str[i]] ||
        (ru[str[i].toLowerCase()] === undefined && str[i]) ||
        ru[str[i].toLowerCase()].replace(/^(.)/, (match) => match.toUpperCase())
    );
  }
  return newStr.join("");
}

// Показывать красную рамку вокруг инпута если пытаются отправить пустую строку
function showError() {
  inputField.style.border = "2px solid red";
}

// Генерация рандомных ID для элементов, на случай если текст инпута будет одинаковый
function randomIdGenerator() {
  const min = 100;
  const max = 1000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Добавление текста в дивы
function addToDiv(inputValue) {
  const newPElement = document.createElement("p");
  newPElement.innerText = inputValue;
  newPElement.style.textOverflow = "ellipsis";
  newPElement.style.overflow = "hidden";
  newPElement.style.whiteSpace = "nowrap";
  newPElement.setAttribute("aria-label", `${inputValue}`);
  newPElement.setAttribute("data-balloon-pos", "left");

  newPElement.id = randomIdGenerator();
  inputDiv.appendChild(newPElement);

  // запись транслита
  const translitValue = translit(inputValue);
  const newPTranslitElement = document.createElement("p");
  newPTranslitElement.innerText = translitValue;
  newPTranslitElement.style.textOverflow = "ellipsis";
  newPTranslitElement.style.overflow = "hidden";
  newPTranslitElement.style.whiteSpace = "nowrap";
  newPTranslitElement.setAttribute("aria-label", `${translitValue}`);
  newPTranslitElement.setAttribute("data-balloon-pos", "right");

  newPTranslitElement.id = randomIdGenerator();
  translitDiv.appendChild(newPTranslitElement);
}

// Обработчик событий кнопки ввода
function eventHandling() {
  const inputValue = document.querySelector("#input").value;
  addToDiv(inputValue);
  // отчистка поля ввода после всех действий
  document.querySelector("#input").value = "";
}

function deleteHandler() {
  const allPTag = document.querySelectorAll("#input-text p, #translit-text p");
  for (let i = 0; i < allPTag.length; i++) {
    allPTag[i].remove();
  }
}

button.addEventListener("click", eventHandling);
deleteButton.addEventListener("click", deleteHandler);
