<template>
  <div class="container">
    <form @submit.prevent="addNewSprint">
      <div>
        <label for="sprint-number">Name</label>
        <input v-model="sprintNumber" id="sprint-number" type="text" />
      </div>

      <div>
        <label for="start-date">Start date</label>
        <input v-model="startDate" id="start-date" type="date" />
      </div>

      <div>
        <label for="end-date">End date</label>
        <input v-model="endDate" id="end-date" type="date" />
      </div>

      <button type="submit">Add new sprint</button>
    </form>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import { sprintStore } from '@/stores/sprintStore';

const sprintNumber = ref(null);
const startDate = ref(new Date().toISOString().split('T')[0]);
const endDate = ref(null);
const message = ref('');

const addNewSprint = () => {
  if (
    sprintNumber.value.trim() &&
    startDate.value.trim() &&
    endDate.value.trim()
  ) {
    sprintStore.addNewSprint({
      id: Date.now(),
      name: sprintNumber.value.trim(),
      startDate: startDate.value,
      endDate: endDate.value,
      state: 'open'
    })
  }

  sprintNumber.value = '';
  startDate.value = new Date().toISOString().split('T')[0];
  endDate.value = ''
  message.value = 'Successfully added new sprint!'
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding: 1.5rem;
  max-width: 32rem;
}
input, select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}
button {
  width: 100%;
  padding: 0.5rem;
  background-color: #2563eb;
  color: white;
  border: solid;
  border-radius: 0.25rem;
}
button:hover {
  background-color: #1d4ed8;
}
</style>