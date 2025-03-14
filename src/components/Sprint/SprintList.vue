
<script setup>
import { computed, onMounted, ref } from 'vue';
import SprintItem from './SprintItem.vue';
import { sprintStore } from '@/stores/sprintStore';

const sprintList = ref([]);
const state = ref('open');

onMounted(() => {
  console.log('mouting sprints ...');
  sprintList.value = sprintStore.fetchSprints();
  console.log(`Total sprints: ${sprintList.value.length}`);
});

const filteredSprints = computed(() => {
  console.log('computing sprints ...', state.value);
  return sprintStore.sprints.value.filter((item) => item.state === state.value)
});

const deleteAll = () => {
  console.log('delete all sprints');
  sprintStore.reset();
}

</script>

<template>
  <div class="filter">
    <select v-model="state">
      <option value="open">Open</option>
      <option value="closed">Closed</option>
    </select>
    <button @click="deleteAll">Delete all</button>
  </div>
  <SprintItem
    v-if="filteredSprints.length > 0"
    v-for="sprint in filteredSprints"
    :key="sprint.id"
    :sprint="sprint"
  />
  <h4 v-else>No sprints</h4>
</template>

<style scoped>

</style>