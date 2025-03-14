<script setup>
import { ref } from 'vue';
import Tab from '../Common/Tab.vue';
import TodoItemList from './TodoList.vue';
import AddNewTodo from './AddNewTodo.vue';

const activeTab = ref('list');
const tabs = [
  { id: 'list', value: 'Todo list'},
  { id: 'new', value: 'New to-do'}
];
const tabComponents = {
  list: TodoItemList,
  new: AddNewTodo
};

</script>

<template>
  <Tab
    :tabs="tabs"
    :tab-components="tabComponents"
    :active-tab="activeTab"
  />
</template>
