<template>
  <div class="main">
    <div class="input">
      <input type="text"
             @keydown.enter="addTask"
             v-model="new_task"
      >
      <input type="submit" @click="addTask">
    </div>
    <div v-if="this.$store.state.user != null">
      <ul v-for="item in this.$store.state.taskList.filter(m => m.whose === this.$store.state.user.login)" :key="item.title">
        <li>{{item.title}}</li>
      </ul>
    </div>
    <div v-else>
      <ul v-for="item in tasks_without_user" :key="item.title">
        <li>{{item.title}}</li>
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
        title: '',
        completed : false,
        whose: null,
      },
      tasks_without_user: [],
      new_task: null,
    }
  },
  methods: {
    addTask () {
      if (this.new_task != null && this.$store.state.user != null) {
        let tasks = this.$store.state.taskList;
        tasks.push({
          title: this.new_task,
          whose: this.$store.state.user.login,
        });
        this.$store.commit('setTask', tasks);
        localStorage.setItem('taskList', JSON.stringify(tasks));
        this.new_task= null;
      }
      else {
        if (this.new_task != null) {
          this.tasks_without_user.push({
            id: this.tasks_without_user.length,
            title: this.new_task,
            completed: false,
          })
          this.new_task = null
        }
      }
    },
    removeTask(array, index) {
      for (let i = 0; i < array.length; i++){
        if (array[i].id == index) {
          array.splice(i, 1);
        }
      }
      localStorage.setItem('items', JSON.stringify(this.items))
    },
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
  .list_item {
    list-style: none;
  }
  .item {
    margin: 20px;
    padding: 5px;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
  }
  .item:hover {
    opacity: 80%;
    cursor: pointer;
  }
  .input {
    display: flex;
    justify-content: space-between;
    padding: 5px;
  }
</style>