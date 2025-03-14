import { ref } from "vue";

export const sprintStore = {
  sprints: ref([]),

  addNewSprint(sprint) {
    console.log('add new sprint ...');
    this.sprints.value.push(sprint);
    this.saveLocalStorage();
  },

  deleteSprint(sprintId) {
    const updatedSprints = this.sprints.value.filter((item) => item.id !== sprintId);
    this.reset();
    this.sprints.value = updatedSprints;
    this.saveLocalStorage();
    console.log(`Successfully deleted sprint ${sprintId}`);
  },

  updateSprint(sprint) {
    const sprintIndex = this.sprints.value.findIndex((item) => item.id === sprint.id);
    this.sprints.value[sprintIndex] = {...sprint}
    this.saveLocalStorage();
    console.log(`Successfully updated sprint ${sprint.id}`, JSON.stringify(sprint));
  },

  fetchSprints() {
    const storedSprints = localStorage.getItem('sprints');
    this.sprints.value = storedSprints ? JSON.parse(storedSprints) : [];

    return this.sprints.value;
  },

  getSprintsByState(state = null) {
    console.log('getSprintsByState ..', this.sprints.value);
    return this.sprints.value.filter((sprint) => {
      console.log('getSprintsByState', sprint.state, state)
      return sprint.state === state
    });
  },

  saveLocalStorage() {
    if (this.sprints.value.length > 0) {
      console.log('save sprints to localStorage');
      localStorage.setItem('sprints', JSON.stringify(this.sprints.value));
    }
  },

  reset() {
    this.sprints.value = [];
    localStorage.setItem('sprints', '');
  }
}