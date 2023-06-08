"use strict";

// HTML Elemente auslesen
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");
const filterAll = document.getElementById("filterAll");
const filterOpen = document.getElementById("filterOpen");
const filterDone = document.getElementById("filterDone");
const removeDoneBtn = document.getElementById("removeDoneBtn");

// Anfangszustand in todos & leeren Array speichern
let todos = [];

// Event-Listener hinzufügen
/// FUNKTIONEN IM INNERHALB LISTENER FEHLEN NOCH
addTodoBtn.addEventListener("click");
filterAll.addEventListener("click");
filterOpen.addEventListener("click");
filterDone.addEventListener("click");
removeDoneBtn.addEventListener("click");

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

// todos aus dem localStorage laden & als Array speichern (wenn vorhanden)
// Funktion für rendern der todos
// funktion für removeDoneBtn (alle erledigten todos löschen)
// Funktion für hinzufügen der user todo Eingabe
