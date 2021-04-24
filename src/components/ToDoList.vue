<template>
  <div class="main">
    <div class="input">
      <input
          type="text"
          @keydown.enter="addTask"
          v-model="new_task"
      >
      <input type="submit" @click="addTask">
    </div>
    <div>
      <ul
          class="todos"
          v-for="item in items = this.$store.state.taskList.filter(m => m.whose === this.$store.state.user.login)"
          :key="item.id"
      >
        <li
            @click="item.completed = !item.completed"
            class="todo"
        >
          <div
              class="item_content"
              v-bind:class="{done: item.completed}"
          >
            {{item.title}}
          </div>
          <button @click="removeTask(item.id)">x</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToDoList",
  data() {
    return {
      task: {
        id: null,
        title: '',
        whose: null,
        completed: false,
      },
      new_task: null,
    }
  },
  methods: {
    addTask () {
      if (this.new_task != null && this.$store.state.user != undefined) {
        let tasks = this.$store.state.taskList;
        tasks.push({
          id: Math.random(),
          title: this.new_task,
          whose: this.$store.state.user.login,
          completed: false,
        });
        this.$store.commit('setTask', tasks);
        localStorage.setItem('taskList', JSON.stringify(tasks));
        this.new_task= null;
      }
    },
    removeTask (index) {
      let tasks = this.$store.state.taskList;
      let remaining_tasks = tasks.filter(m => m.id != index);
      if (remaining_tasks != undefined) {
        this.$store.commit('setTask', remaining_tasks);
        localStorage.setItem('taskList', JSON.stringify(remaining_tasks));
      }
    }
  },
}
</script>

<style scoped>
  .main {
    margin: 0 auto;
    width: 400px;
  }
  .done {
    text-decoration: line-through;
    opacity: 65%;
  }
  .todos {
    list-style: none;
  }
  .todo {
    margin: 20px;
    padding: 5px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
  }
  .todo:hover {
    opacity: 80%;
    cursor: pointer;
  }
  .input {
    display: flex;
    justify-content: space-between;
    padding: 5px;
  }
</style>