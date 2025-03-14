<template>
  <div class="filter">
    <select v-model="sprintSearch">
      <option value="">Select sprint</option>
      <option v-for="sprint in sprintList" :key="sprint.id" :value="sprint.id">
        {{ sprint.name }} ({{ sprint.state }})
      </option>
    </select>
  </div>
  <div class="kanban">
    <Column
      v-for="column in kanbanColumns"
      :key="column.id"
      :todos-list="todosList"
      :column="column"
      @drop="drop"
      @drag-start="dragStart"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { todoStore } from '@/stores/todoStore';
import { sprintStore } from '@/stores/sprintStore';
import Column from './Column.vue';
import { configStore } from '@/stores/configStore';

const sprintList = ref([]);
const sprintSearch = ref('');
const kanbanColumns = ref([]);

onMounted(() => {
  const sprints = sprintStore.fetchSprints();
  sprintList.value = sprints.filter(sprint => sprint.state === 'open');
  kanbanColumns.value = configStore.fetchKanbanCols();
});

const todosList = computed(() => todoStore.getTodosBySprint(sprintSearch.value));

const dragStart = (event, item) => {
  event.dataTransfer.setData('text/plain', item.id);
};

const drop = (event, listType) => {
  event.preventDefault();
  const itemId = parseInt(event.dataTransfer.getData('text/plain'));
  const itemIndex = todosList.value.findIndex((todo) => todo.id === itemId);
  const item = todosList.value[itemIndex]
  if (item) {
    item.state = listType;
    todosList.value[itemIndex] = {...item}
    todoStore.refreshTodos(todosList.value);
  }
};
</script>

<style scoped>
.kanban {
  display: flex;
  gap: 20px;
  padding: 20px;
}
.list {
  width: 200px;
  min-height: 200px;
  border: 2px dashed #ccc;
  padding: 10px;
  background-color: #f9f9f9;
}
.item {
  padding: 10px;
  margin: 5px 0;
  background-color: #e0e0e0;
  cursor: move;
}
.item:hover {
  background-color: #d0d0d0;
}
</style>