"use strict";

// HTML Elemente im body auslesen
const filterAll = document.getElementById("filterAll");
const filterOpen = document.getElementById("filterOpen");
const filterDone = document.getElementById("filterDone");
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.querySelector(".todoList"); // Klasse "todoList" mit querySelector Methode
const removeDoneBtn = document.getElementById("removeDoneBtn");

// Anfangszustand in Variable todos speichern (Array)
let todos = [];

// JSON
/// Funktion zum Speichern der Todos im Local Storage
function saveTodos() {
  // speichern
  localStorage.setItem("todos", JSON.stringify(todos));
}

/// Funktion zum Laden der Todos aus dem Local Storage
function loadTodos() {
  // wenn todos eintrag haben dann verwenden
  if (localStorage.getItem("todos")) {
    // laden
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

// HILFSFUNKTIONEN
// Filterfunktion
function filterTodos(filter) {
  return todos.filter((todo) => {
    if (
      filter === "all" ||
      (filter === "open" && !todo.done) ||
      (filter === "done" && todo.done) // alle - offen - erledigt
    ) {
      return true;
    } else {
      return false;
    }
  });
}

// HILFSFUNKTIONEN
// li in ul Funktion
function createListItem(todo) {
  const newLi = document.createElement("li");
  const newCheckbox = createCheckbox(todo.done);
  const todoText = createTodoText(todo); //

  newLi.style.listStyleType = "none"; // keine Punkte als Listenvorzeichen

  newCheckbox.addEventListener("change", () => {
    todo.done = newCheckbox.checked;
    saveTodos(); // im local Storage speichen
    renderTodos(); // auslesen
  });

  newLi.appendChild(newCheckbox); // checkbox zufügen
  newLi.appendChild(todoText); // user Text zufügen

  return newLi;
}

// HILFSFUNKTIONEN
// Checkbox Funktion
function createCheckbox(isChecked) {
  const newCheckbox = document.createElement("input");
  newCheckbox.type = "checkbox";
  newCheckbox.checked = isChecked; // blauen Haken setzen
  newCheckbox.style.marginRight = "10px";
  newCheckbox.style.width = "20px";
  newCheckbox.style.height = "20px";

  return newCheckbox;
}

// HILFSFUNKTIONEN
// User - Todo Text Funktion
function createTodoText(todo) {
  const todoText = document.createElement("span"); // span Element weil Textinhalt in span Element gehört
  todoText.textContent = todo.description; // Todo-Text setzen

  if (todo.done) {
    todoText.style.textDecoration = "line-through";
    todoText.style.color = "grey";
  }
  return todoText;
}

// // HILFSFUNKTIONEN
// // upperCase - lowerCase Funktion
// function upperCaseFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }
// // upperCase - lowerCase Funktion aufrufen
// upperCaseFirstLetter("string");

// GENERELLE FUNKTIONEN
// Funktion zum Hinzufügen eines neuen Todos
function addTodo() {
  // todoInput auslesen (value) & mit trim-Methode USER Eingabe bereinigen & Leerzeichen entfernen
  const newTodo = {
    id: +new Date(), // aktuelle Zeit als ID
    description: todoInput.value
      .trim() // USER Eingabe bereinigen & Leerzeichen entfernen,
      .replace(/ä/g, "ä;") // Umlaute korrekt darstellen
      .replace(/ö/g, "ö")
      .replace(/ü/g, "ü;")
      .replace(/ß/g, "ss;"), // Sonderzeichen korrekt darstellen
    done: false, // done = false (Todo ist nicht erledigt)
  };

  // prüfen ob User Eingabe Text vorhanden ist oder  null, undefined und oder leeren String
  if (newTodo.description !== "") {
    todos.push(newTodo); // neues todo in todos Array hinzufügen
    saveTodos(); // todos im Local Storage speichern
    renderTodos(); // todos rendern
    todoInput.value = ""; // todoInput Textfeld leeren
  }
}

// STATEMANAGEMENT
function renderTodos() {
  /// Funktion zum rendern (= übertragen)
  const list = document.querySelector(".todoList");
  list.innerHTML = ""; // todoList leeren

  const selectedFilter = getSelectedFilter(); // Konstante für Filter auswerten
  const filteredTodos = filterTodos(selectedFilter); // Konstante für FilteredTodos

  filteredTodos.forEach((todo) => {
    // forEach Schleife für jedes todo Element in filteredTodos Array
    const newLi = createListItem(todo); // Konstante für neues li Element
    list.appendChild(newLi); // li Element an ul Element anhängen
  });
}

// Funktion zum All, Open, Done Filter auswerten & Userwahl radio Button markieren
function getSelectedFilter() {
  if (filterOpen.checked) {
    return "open";
  }
  if (filterDone.checked) {
    return "done";
  }
  if (filterAll.checked) {
    return "all";
  }
}

// Funktion für removeDoneBtn - Entfernen erledigte Todos
function removeDoneTodos() {
  todos = todos.filter((todo) => !todo.done); // todos filtern (alle todos die nicht erledigt sind)
  saveTodos(); // todos im Local Storage speichern
  renderTodos(); // todos rendern
}

// Funktion zum Hinzufügen des Button-Stylings
function styleButtons(button) {
  (button.style = "background-color: rgb(237, 146, 232)"),
    "color: white",
    "border: none",
    "padding: 10px 20px",
    "border-radius: 5px",
    "cursor: pointer",
    "box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2)";

  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "rgb(106, 28, 195)";
  });

  button.addEventListener("mouseout", () => {
    button.style.backgroundColor = "rgb(237, 146, 232)";
  });
}

// Glow-Effekt für die Box bei Klick auf Add Button
addTodoBtn.addEventListener("click", (glow) => {
  // Event-Listener für den Add Button

  const box = document.querySelector(".box"); // Container aus HTML auslesen
  box.classList.add("glow"); // Glow-Klasse hinzufügen (CSS)

  setTimeout(() => {
    // setTimeout Funktion für den Glow-Effekt
    box.classList.remove("glow"); // Glow-Klasse entfernen (CSS)
  }, 200); // glow-Effekt nach 500ms entfernen
});

// Button-Styling anwenden
styleButtons(addTodoBtn);
styleButtons(removeDoneBtn);

// Event-Listener hinzufügen
addTodoBtn.addEventListener("click", addTodo);
filterAll.addEventListener("click", renderTodos);
filterOpen.addEventListener("click", renderTodos);
filterDone.addEventListener("click", renderTodos);
removeDoneBtn.addEventListener("click", removeDoneTodos);

// Todos aus Local Storage laden & rendern
loadTodos();
renderTodos();
