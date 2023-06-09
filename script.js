"use strict";

// HTML Elemente auslesen
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");
const filterAll = document.getElementById("filterAll");
const filterOpen = document.getElementById("filterOpen");
const filterDone = document.getElementById("filterDone");
const removeDoneBtn = document.getElementById("removeDoneBtn");

// Anfangszustand in Variable todos speichern (Array)
// kann eine Liste aller USER angelegten todos sein oder nur ein todo (string) sein
let todos = [];

// JSON
// setItem speichert todos im localStorage als String (JSON.stringify) ab
localStorage.setItem("todos", JSON.stringify(todos));

// getItem liest todos aus dem localStorage aus & speichert sie als Array (JSON.parse) in todos
if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
}

// prüfen gegen null, undefined, leeren String

// Event-Listener hinzufügen
/// FUNKTIONEN IM INNERHALB LISTENER FEHLEN NOCH
addTodoBtn.addEventListener("click", addTodo);
filterAll.addEventListener("click");
filterOpen.addEventListener("click");
filterDone.addEventListener("click");
removeDoneBtn.addEventListener("click", removeDoneTodos);

// StateManagement
/// Funktion für rendern der todos in HTML (ul) Liste (todoList)
function renderTodos() {
  // todoList Element aus HTML auslesen
  const list = document.querySelector("#todoList");

  // todoList leeren
  todoList.innerHTML = "";

  // todos durchlaufen
  for (let i = 0; i < todos.length; i++) {
    // li Element erstellen
    const newLi = document.createElement("li");
    // li Element mit todo Text befüllen
    newLi.innerText = todos[i];

    // Checkbox erstellen (input)
    const newCheckbox = document.createElement("input");
    // Checkbox an li Element anhängen
    newCheckbox.type = "checkbox";
    // Checkbox checked = true/false (je nachdem ob todo erledigt ist) setzen
    newCheckbox.checked = todos[i].done;
    // Checkbox Event-Listener hinzufügen
    newLi.appendChild(newCheckbox);

    // todo description erstellen
    const todoText = document.createTextNode(todo.decription);
    // todo description an li Element anhängen
    newLi.append(todoText);

    // li Element an todoList anhängen
    list.appendChild(newLi);
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
  } else {
    return "all";
  }
}

// prüfen gegen null, undefined, leeren String
// funktion für removeDoneBtn (alle erledigten todos löschen)
