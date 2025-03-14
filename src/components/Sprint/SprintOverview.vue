<script setup>
import { ref } from 'vue';
import SprintList from './SprintList.vue';
import AddNewSprint from './AddNewSprint.vue';
import Tab from '../Common/Tab.vue';

const activeTab = ref('list');
const tabs = [
  { id: 'list', value: 'Sprint list'},
  { id: 'new', value: 'New sprint'}
];
const tabComponents = {
  list: SprintList,
  new: AddNewSprint
};

</script>

<template>
  <Tab
    :tabs="tabs"
    :tab-components="tabComponents"
    :active-tab="activeTab"
  />
</template>
