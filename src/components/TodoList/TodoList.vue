<template>
  <div class="filter">
    <select v-model="sprintSearch">
      <option value="">Filter by sprint</option>
      <option v-for="sprint in sprintList" :key="sprint.id" :value="sprint.id">
        {{ sprint.name }} ({{ sprint.state }})
      </option>
    </select>
    <button @click="deleteAll">Delete all</button>
  </div>
  <TodoItem
    v-for="todo in filteredTodoList"
    :key="todo.id"
    :todo="todo"
  />
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import TodoItem from './TodoItem.vue';
import { todoStore } from '@/stores/todoStore';
import { sprintStore } from '@/stores/sprintStore';

const todoList = ref([]);
const sprintList = ref([]);
const sprintSearch = ref('')

onMounted(() => {
  todoList.value = todoStore.fetchTodos();
  sprintList.value = sprintStore.fetchSprints();
})

const filteredTodoList = computed(() => todoList.value.filter((item) => item.sprintId === sprintSearch.value));
</script>