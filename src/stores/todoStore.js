import {ref} from 'vue';

export const todoStore = {
  todos: ref([]),

  addTodoItem(todoItem) {
    this.todos.value.push(todoItem);
    console.log('after added new item: ', this.todos);
    this.saveLocalStorage();
  },

  refreshTodos(todos) {
    this.todos.value = todos;
    this.saveLocalStorage();
  },
  
  updateTodo(newTodo) {
    console.log('update todo ...', newTodo);
    const index = this.todos.value.findIndex((todo) => todo.id === newTodo.id)
    if (index !== -1) {
      this.todos.value[index] = {...newTodo};
    }
    this.saveLocalStorage();
  },

  fetchTodos() {
    const storedTodos = localStorage.getItem('todos');
    this.todos.value = storedTodos ? JSON.parse(storedTodos) : []

    return this.todos.value;
  },

  getTodosByState(state = null) {
    return state ? this.todos.value.filter(todo => todo.state === state) : this.todos.value;
  },

  getTodosBySprint(sprintId) {
    if (this.todos.value.length === 0) {
      this.fetchTodos();
    }
    
    return this.todos.value.filter((todo) => todo.sprintId === sprintId);
  },

  saveLocalStorage() {
    console.log('save todos to localStorage');
    localStorage.setItem('todos', JSON.stringify(this.todos.value));
  }
}
