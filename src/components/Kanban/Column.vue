<template>
  <div class="list" @dragover="allowDrop" @drop="onDrop">
    <h4>{{ column.label }}</h4>
    <div
      v-for="item in filteredTodoList"
      :key="item.id"
      class="item"
      draggable="true"
      @dragstart="dragStart($event, item)"
    >
      {{ item.text }}
    </div>
    <p v-if="filteredTodoList.length === 0">No items left</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  todosList: Object,
  column: Object
});

const emit = defineEmits(['drop', 'drag-start']);

const filteredTodoList = computed(() => props.todosList.filter((todo) => todo.state === props.column.id));

const onDrop = (event) => {
  event.preventDefault();
  emit('drop', event, props.column.id);
};

const dragStart = (event, item) => {
  emit('drag-start', event, item);
};

// Allow dropping by preventing default behavior
const allowDrop = (event) => {
  event.preventDefault();
};
</script>

<style scoped>
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