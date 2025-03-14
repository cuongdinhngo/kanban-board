<template>
  <div class="app-container">
    <header>
      <h1>VueJS 101</h1>
      <nav>
        <router-link to="/sprint" class="nav-link" active-class="active">Sprint</router-link>
        <router-link to="/todo" class="nav-link" active-class="active">To-Do List</router-link>
        <router-link to="/kanban" class="nav-link" active-class="active">Kanban</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>

</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
header {
  text-align: center;
  margin-bottom: 30px;
}
nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}
.nav-link {
  text-decoration: none;
  font-size: 1.2rem;
  color: #42b983;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.nav-link:hover {
  background-color: #f0f0f0;
}
.active {
  color: #ffffff;
  background-color: #42b983;
}
</style>