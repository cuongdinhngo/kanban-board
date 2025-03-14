<template>
  <div class="add-form">
    <form @submit.prevent="addTodo">
      <div>
        <label for="todo-text">Sprint</label>
        <select v-model="sprintId">
          <option value="" disabled>Please select sprint</option>
          <option v-for="sprint in availableSprints" :key="sprint.id" :value="sprint.id">{{ sprint.name }}</option>
        </select>
      </div>

      <div>
        <label for="todo-text">To-Do</label>
        <input
          v-model="todoText"
          id="todo-text"
          type="text"
          placeholder="Enter your task..."
        />
      </div>

      <div>
        <label for="priority">Priority</label>
        <select v-model="priority" id="priority">
          <option v-for="option in priorityOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

      <button type="submit">Add To-Do</button>
    </form>
    <h4 v-if="message">{{ message }}</h4>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { todoStore } from '@/stores/todoStore';
import { sprintStore } from '@/stores/sprintStore';

const availableSprints = ref([]);
const todoText = ref('');
const priority = ref('medium');
const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];
const sprintId = ref('');
const message = ref('');

const todos = computed(() => {
  return todoStore.todos.value;
});

onMounted(() => {
  availableSprints.value = sprintStore.fetchSprints().filter((item) => item.state === 'open');
});

const addTodo = () => {
  if (todoText.value.trim() === '') {
    alert('Please enter a to-do item!');
    return;
  }

  todoStore.addTodoItem({
    id: Date.now(),
    text: todoText.value.trim(),
    priority: priority.value,
    state: 'backlog',
    sprintId: sprintId.value
  });

  todoText.value = '';
  priority.value = 'medium';
  message.value = 'Successfully create new to-do'
};
</script>