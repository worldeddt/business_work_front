<template>
<div class="overflow-x-auto">
<div class="m-1 mainSection">
<!-- sections -->
<div v-for="section in this.$store.state.allData.sectionList" :key="section.index" class="m-2 section" 
  style="min-height:100%;position:relative;">
  <v-card class="pb-15" @drop="drop($event, section.index)" @dragover="allowDrop($event)">
  <v-card-title v-text="section.title"></v-card-title>
  <div class="overflow-y-auto" style="height:1000px;">
    <v-col v-for="task in section.taskList" :key="task.title" :id="task.index" draggable="true" @dragstart="drag($event)">
      <v-card>
        <div class="text-right"><v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn></div>
        <v-card-title v-text="task.title"></v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </v-card-actions>
    </v-card>
  </v-col>
  <v-spacer class="additional-task">
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

      if (!taskId || !sectionId) {
        alert('테스크 정보를 찾을 수 없습니다.');
        return;
      } else {
        this.moveToTask(taskId, sectionId) 

        const parentElmt = ev.target.querySelector('.additional-task').parentNode;
        const newNode = document.getElementById(taskId);
        const additionalTaskButton = ev.target.querySelector('.additional-task');
        
        parentElmt.insertBefore(newNode, additionalTaskButton);
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
            store.dispatch("moveToTask", {
                "index" : taskId,
                "title" : task.title,
                "description" : task.description,
                sectionId,
                "status" : task.taskStatusType
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