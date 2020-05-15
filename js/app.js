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
    ц: "ts",
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

// Добавление текста в дивы
function addToDiv(inputValue) {
  const newPElement = document.createElement("p");
  newPElement.innerText = inputValue;
  newPElement.setAttribute("aria-label", `${inputValue}`);
  newPElement.setAttribute("data-balloon-pos", "up");
  newPElement.setAttribute("data-balloon-length", "large");
  inputDiv.append(newPElement);

  // получение транслита текста
  const translitValue = translit(inputValue);

  // запись транслита
  const newPTranslitElement = document.createElement("p");
  newPTranslitElement.innerText = translitValue;
  newPTranslitElement.setAttribute("aria-label", `${translitValue}`);
  newPTranslitElement.setAttribute("data-balloon-pos", "up");
  newPTranslitElement.setAttribute("data-balloon-length", "large");
  translitDiv.append(newPTranslitElement);
}

// Обработчик событий кнопки ввода
function eventHandling() {
  const inputValue = document.querySelector("#input").value;
  addToDiv(inputValue);
  // отчистка поля ввода после всех действий
  inputField.value = "";
}

// удаление всех данных из поля отображения ввода
function deleteHandler() {
  const allPTag = document.querySelectorAll("#input-text p, #translit-text p");
  for (let i = 0; i < allPTag.length; i++) {
    allPTag[i].remove();
  }
}

// устанока прослушивателей
button.addEventListener("click", eventHandling);
deleteButton.addEventListener("click", deleteHandler);
