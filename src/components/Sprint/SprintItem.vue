
<script setup>
import { ref } from 'vue';
import Card from '../Common/Card.vue';
import { sprintStore } from '@/stores/sprintStore';

const props = defineProps({
  sprint: Object
});

const isEditing = ref(false);
const editedName = ref(props.sprint.name);

const saveEdit = () => {
  if (!editedName.value.trim()) {
    alert('Please enter a to-do item!');
    return;
  }

  props.sprint.name = editedName.value.trim();
  sprintStore.updateSprint(props.sprint);
  isEditing.value = false;
}

const removeSprint = (sprintId) => {
  sprintStore.deleteSprint(sprintId)
}

const newState = props.sprint.state === 'open' ? "closed" : "open";
const updateSprintState = () => {
  sprintStore.updateSprint({
    id: props.sprint.id,
    name: props.sprint.name,
    startDate: props.sprint.startDate,
    endDate: props.sprint.endDate,
    state: newState
  });
}
</script>

<template>
  <Card>
    <template #title>
        <span v-if="!isEditing">{{ editedName }}</span>
        <form v-else @submit.prevent="saveEdit">
            <input type="text" v-model="editedName" @keyup.escape="cancelEdit">
            <button type="submit">Save</button>
            <button type="button" @click="isEditing = !isEditing">Cancel</button>
        </form>
    </template>
    <template #default>
        <span>From {{ sprint.startDate }} to {{ sprint.endDate }}</span>
    </template>
    <template #actions>
        <button @click="isEditing = !isEditing">Edit</button>
        <button @click="removeSprint(props.sprint.id)">Delete</button>
        <button @click="updateSprintState(newState)">
            {{ props.sprint.state === 'open' ? "Close" : "Re-open" }}
        </button>
    </template>
  </Card>
</template>

<style scoped>
.high { color: red; }
.medium { color: orange; }
.low { color: green; }
.completed { text-decoration: line-through; opacity: 0.6; }
button { margin-left: 10px; padding: 2px 5px; font-size: 12px; }
input { padding: 2px; margin-right: 5px; }
</style>