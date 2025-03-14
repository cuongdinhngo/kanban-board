import { ref } from "vue";

const defaultColumns = [
  {id: 'backlog', label: 'Backlog'},
  {id: 'ready', label: 'Ready'},
  {id: 'wip', label: 'WIP'},
  {id: 'qa', label: 'QA'},
  {id: 'done', label: 'Done'},
];

export const configStore = {
  kanbanColumns: ref([]),

  fetchKanbanCols() {
    const columns = localStorage.getItem('kanbanColumns');
    this.kanbanColumns.value = columns ? JSON.parse(columns) : defaultColumns;

    return this.kanbanColumns.value;
  },

  saveLocalStorage() {
    if (this.kanbanColumns.value.length > 0) {
      console.log('save sprints to localStorage');
      localStorage.setItem('kanbanColumns', JSON.stringify(this.kanbanColumns.value));
    }
  },

  reset() {
    this.kanbanColumns.value = [];
    localStorage.setItem('kanbanColumns', '');
  }
}