"use strict";

// HTML Elemente auslesen
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
  localStorage.setItem("todos", JSON.stringify(todos));
}

/// Funktion zum Laden der Todos aus dem Local Storage
function loadTodos() {
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

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

  // prüfen gegen null, undefined und oder leeren String
  if (newTodo.description !== "") {
    todos.push(newTodo); // neues todo in todos Array hinzufügen
    saveTodos(); // todos im Local Storage speichern
    renderTodos(); // todos rendern
    todoInput.value = ""; // todoInput leeren
  }
}

// StateManagement
/// Funktion für rendern der todos in HTML (ul) Liste (todoList)
function renderTodos() {
  const list = document.querySelector(".todoList"); // todoList Element aus HTML auslesen
  list.innerHTML = ""; // todoList leeren

  // Konstante für Filter auswerten
  const selectedFilter = getSelectedFilter();

  // todos durchlaufen
  for (let i = 0; i < todos.length; i++) {
    // todos durchlaufen
    const todo = todos[i]; // aktuelles todo aus todos Array auslesen

    // Filter auswerten
    if (
      selectedFilter === "all" ||
      (selectedFilter === "open" && !todo.done) ||
      (selectedFilter === "done" && todo.done)
    ) {
      const newLi = document.createElement("li"); // li Element erstellen
      const newCheckbox = document.createElement("input"); // Checkbox erstellen (input)

      newCheckbox.type = "checkbox"; // Checkbox an li Element anhängen
      newCheckbox.checked = todo.done; // Checkbox checked = true/false (je nachdem ob todo erledigt ist)

      newLi.style.listStyleType = "none"; // Punkte entfernen

      // Event-Listener für Checkbox hinzufügen
      newCheckbox.addEventListener("change", () => {
        todo.done = newCheckbox.checked;
        saveTodos(); // todos im Local Storage speichern
        renderTodos(); // todos rendern
      });

      // Styling der Checkbox über JavaScript festlegen
      newCheckbox.style.marginRight = "10px";
      newCheckbox.style.width = "20px";
      newCheckbox.style.height = "20px";

      // Checkbox an li Element anhängen
      newLi.appendChild(newCheckbox);

      // Event-Listener für li Element hinzufügen
      const todoText = document.createElement("span"); // span Element für Todo-Text erstellen

      // Todo-Text setzen
      todoText.textContent = todo.description;

      // Styling des Todo-Textes über JavaScript festlegen
      if (todo.done) {
        todoText.style.textDecoration = "line-through"; // Text durchstreichen, wenn todo erledigt ist
        todoText.style.color = "grey"; // Textfarbe grau, wenn todo erledigt ist
      }

      // Todo-Text an li Element anhängen
      newLi.appendChild(todoText);
      // li Element an todoList anhängen
      list.appendChild(newLi);
    }
  }
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
