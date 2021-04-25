<template>
  <div class="main">
    <v-container>

      <v-text-field
          v-model="new_task"
          label="Добавление задачи"
          solo
          @keydown.enter="addTask"
      >
        <template v-slot:append>
          <v-fade-transition>
            <v-icon
                v-if="new_task"
                @click="addTask"
            >
              mdi-plus
            </v-icon>
          </v-fade-transition>
        </template>
      </v-text-field>

      <h2 class="display-1 success--text pl-4">
        Задачи:&nbsp;
        <v-fade-transition leave-absolute>
        <span :key="`tasks-${Todos.length}`">
          {{ Todos.length }}
        </span>
        </v-fade-transition>
      </h2>

      <v-divider class="mt-4"></v-divider>

      <v-row
          class="my-1"
          align="center"
      >
        <strong class="mx-4 info--text text--darken-2">
          Осталось: {{ this.Todos.filter(todo => todo.completed == false).length }}
        </strong>

        <v-divider vertical></v-divider>

        <strong class="mx-4 success--text text--darken-2">
          Завершены: {{ this.Todos.filter(todo => todo.completed == true).length }}
        </strong>

        <v-spacer></v-spacer>

        <v-progress-circular
            :value="progress"
            class="mr-2"
        ></v-progress-circular>
      </v-row>

      <v-divider class="mb-4"></v-divider>

      <v-card v-if="this.Todos.length > 0">
        <template v-for="(item, i) in this.Todos">
          <v-divider
              v-if="i !== 0"
              :key="`${i}-divider`"
          ></v-divider>
            <v-list-item
                :key="`${i}-${item.title}`"
            >
              <v-list-item-action>
                <v-checkbox
                    @click="completeTask(item)"
                    :color="item.completed && 'grey' || 'primary'"
                >
                  <template v-slot:label>
                    <div
                        :class="item.completed && 'grey--text' || 'primary--text'"
                        class="ml-4"
                        v-text="item.title"
                    ></div>
                  </template>
                </v-checkbox>
              </v-list-item-action>

              <v-spacer></v-spacer>

              <v-scroll-x-transition>
                <v-icon
                    v-if="item.completed"
                    color="success"
                >
                  mdi-check
                </v-icon>
              </v-scroll-x-transition>

              <v-list-item-action>
                <v-btn
                    icon
                    @click="removeTask(item.id)"
                >
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-list-item-action>

            </v-list-item>
          </template>
      </v-card>

      <div
          v-else
          class="background_img"
      >
        <svg style="width:72px;height:72px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
        </svg>
      </div>

    </v-container>

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
      group: null,
    }
  },
  computed: {
    Todos () {
      return this.$store.state.taskList.filter(todo => todo.whose === this.$store.state.user.login)
    },
    progress () {
      return this.Todos.filter(todo => todo.completed == true).length / this.Todos.length * 100
    },
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
      let remaining_tasks = this.$store.state.taskList.filter(m => m.id != index);
      if (remaining_tasks != undefined) {
        this.$store.commit('setTask', remaining_tasks);
        localStorage.setItem('taskList', JSON.stringify(remaining_tasks));
      }
    },
    completeTask (item) {
      item.completed = !item.completed
      this.$store.commit('setTask', this.$store.state.taskList);
      localStorage.setItem('taskList', JSON.stringify(this.$store.state.taskList));
    }
  },
}
</script>

<style scoped>
  .main {
    margin: 0 auto;
    width: 720px;
  }
  .background_img {
    margin: 0 auto;
    display: table;
    opacity: 60%;
  }
</style>