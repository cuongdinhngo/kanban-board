<template>
  <div class="tabs-container">
    <div class="tabs">
      <button v-for="tab in tabs" :key="tab.id"
        :class="{active: activeTab === tab.id}"
        @click="activeTab = tab.id"
      >
        {{ tab.value }}
      </button>
    </div>

    <div class="tab-content">
      <component
        :is="tabComponents[activeTab]"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  tabs: Array,
  tabComponents: Object,
  activeTab: String
});

const activeTab = ref(props.activeTab);

</script>

<style scoped>
.tabs-container {
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
}

.tabs {
  display: flex;
  justify-content: right;
  border-bottom: 1px solid #868686;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #ccc;
  cursor: pointer;
  border-radius: 10px 0px 0px 0px;
}

button.active {
  background-color: #007bff;
  color: white;
}

.tab-content {
  margin-top: 20px;
  padding: 10px;
}
</style>