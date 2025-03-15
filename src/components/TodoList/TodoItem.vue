<template>
  <Card>
    <template #title>
        <span v-if="!isEditing">{{ editedText }}</span>
        <form v-else @submit.prevent="saveEdit">
            <input type="text" v-model="editedText" @keyup.escape="cancelEdit">
            <button type="submit">Save</button>
            <button type="button" @click="isEditing = !isEditing">Cancel</button>
        </form>
    </template>
    <template #default>
        <div class="info">
          <div class="item">
            <span :style="fontStyle">Priority: </span>
            <span :class="[todo.priority, {'completed': done}]">{{ todo.priority }}</span>
          </div>
          <div class="item">
            <span :style="fontStyle">State: </span>
            <span>{{ todo.state }}</span>
          </div>
        </div>
    </template>
    <template #actions>
        <button @click="isEditing = !isEditing">Edit</button>
        <button @click="removeTodo">Delete</button>
    </template>
  </Card>
</template>


<script setup>
import { ref } from 'vue';
import Card from '../Common/Card.vue';
import { todoStore } from '@/stores/todoStore';

const props = defineProps({
  todo: Object
});

const fontStyle = {
  'font-weight': 'bold'
}

const isEditing = ref(false);
const editedText = ref(props.todo.text);

const saveEdit = () => {
  if (!editedText.value.trim()) {
    alert('Please enter a to-do item!');
    return;
  }
  props.todo.text = editedText.value.trim()
  todoStore.updateTodo(props.todo);

  isEditing.value = false;
}

const removeTodo = () => {
  todoStore.deleteTodo(props.todo.id)
}
</script>

<style scoped>
.high { color: red; }
.medium { color: orange; }
.low { color: green; }
.completed { text-decoration: line-through; opacity: 0.6; }
button { margin-left: 10px; padding: 2px 5px; font-size: 12px; }
input { padding: 2px; margin-right: 5px; }
.info {
  display:inline-flex;
  column-gap: 30px;
}
</style>