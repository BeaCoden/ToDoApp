# To-Do App with State Mangement

Implement a basic Todo App with the state management pattern.

An example implementation can be found [here](https://bootcamp-todo-app.stackblitz.io/).

## Features

There features are sorted by priority.

### Displaying Todos

You will start with displaying the todos of your application state in a list.

- [ ] Add a default todo to your application state (so that the list you are about to display is not empty)
- [ ] Use a list to display all todos of your app state

### Adding new Todos

You will now add a feature to add new todos to your list.

- [ ] Add an input field and a button that is used to add new Todos
- [ ] Any trailing spaces should be trimmed from the todo input 
- [ ] A todos entity has two properties: the description and an ID
- [ ] The description is a text that indicates what the todo is
- [ ] The ID property will uniquely identify each todo
- [ ] The ID property should be generated by yourself (i.e. with a counter variable or generate an id using the current time)

### Local Storage

Everytime you reload your app the state and the todos are gone - too bad - lets change that.

- [ ] Use the local storage to save the current state of the app whenever it changes
- [ ] Whenever the todo app is reloaded the last known state should be loaded from the local storage


### Done status of Todos

You will now implement a feature that will indicate if a todo is still open or already done.

- [ ] Add a done property to the todo entity
- [ ] The done property is a boolean that indicated if a todo is done or not
- [ ] Use a checkbox for the done property wihtin the  list
- [ ] When the checkbox of a todo is changed update the state of the corresponding todo

### Duplicate Check

Let's get rid of duplicates - you will now implement a feature that will disallow duplicate todos in your list.

- [ ] Do not allow duplicate todo descriptions (i.e. two todos with the description "Learn JavaScript")
- [ ] The duplicate check case-insensitive


### Filtering Todos

Because filtering is a nice feature you will now implement one.

- [ ] Add a filter which allows to display either "all todos", "open todos" or "done todos"
- [ ] Use radio buttons to dipslay the filters


### Remove done Todos

You will now add a feature that will remove done todos from your list.

- [ ] Add a "Remove Done Todos" button which will remove all done todos from the list
