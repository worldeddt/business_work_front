<template>
<div class="overflow-x-auto">
<div class="m-1 mainSection">
<!-- sections -->
<div v-for="section in this.$store.state.allData.sectionList" :key="section.index" class="m-2 section" 
  style="min-height:100%;position:relative;">
  <v-card class="pb-15" @drop="drop($event, section.index)" @dragover="allowDrop($event)">
  <v-card-title v-text="section.title"></v-card-title>
  <div class="overflow-y-auto" style="height:1000px;">
    <v-col v-for="task in section.taskList" :key="task.title">
    <v-card :id="task.index" draggable="true" @dragstart="drag($event)" >
      <v-checkbox v-model="todoCheck"></v-checkbox>
      <v-card-title v-text="task.title"></v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-bookmark</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
        </v-card-actions>
    </v-card>
  </v-col>
  <v-spacer>
      <div class="col-sm-12 text-center">
        <v-btn
        class="ma-1"
        width="100%"
        color="black"
        plain
        @click="openTaskRegister(section.index)">
          <v-icon color="dark">
            mdi-plus
          </v-icon>
        </v-btn>
      </div>
    </v-spacer> 
  </div>
  </v-card>
  </div>
  <v-spacer>
      <div class="m-2 section">
        <v-card class="pb-15">
          <div class="overflow-y-auto" style="height:1000px;">
            <div style="height:100%; align-items: center;">
              <v-btn
              class="ma-1"
              width="100%"
              height="100%"
              color="black"
              plain
              @click="addSection()">
                <v-icon color="dark">
                mdi-plus
                </v-icon>
              </v-btn>
            </div>
          </div>
        </v-card>
      </div>
    </v-spacer>
</div>
</div>
</template>

<script>
export default {
  name : 'project',
  data: () => ({
    todoCheck : false,
    tasks: [],
    sections: []
  }),
  methods : {
    drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
    },
    drop(ev, sectionId) {
      ev.preventDefault();
      let taskId = ev.dataTransfer.getData("text");

      console.log({
        'taskId' : Number(taskId),
        sectionId
      })

      if (!taskId || !sectionId) {
        alert('테스크 정보를 찾을 수 없습니다.');
        return;
      } else {
        this.moveToTask(taskId, sectionId)  
        ev.target.appendChild(document.getElementById(taskId));
      }
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    moveToTask(taskId, sectionId) {
      const store = this.$store;
      const sectionList = store.getters.getAllData.sectionList;

      for (let section of sectionList) {
        for (let task of section.taskList) {
          if (task.index === Number(taskId)) {
            (new Promise(function (resolve) {
              store.dispatch("moveToTask", {
                "index" : taskId,
                "title" : task.title,
                "description" : task.description,
                sectionId,
                "status" : task.taskStatusType
              });
              resolve("success");

            })).then(function(_result) {
              console.log(_result);
            });
          }
        }
      }
    },
    addSection() {
      this.$store.commit('openSectionRegister', this.$modal)
    },
    updateSection() {

    },
    deleteSection() {

    },
    deleteTask() {

    },
    updateTask() {

    },
    openTaskRegister(sectionId) {
      this.$store.state.currentSelectedSection = sectionId;
      this.$store.commit('openTaskRegister', this.$modal)
    }
  },
  created() {
    const store = this.$store;
    const route = this.$route;
  
    const promise = new Promise(function (resolve) {
    store.dispatch("delayAllDataFetch", route.params);
      resolve("success");
    });

    promise.then(function(_result) {
      console.log(_result);
    });
  }
}

</script>