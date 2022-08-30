<template>
<div class="overflow-x-auto">
<div class="m-1 mainSection">
<!-- sections -->
  <div v-for="section in this.$store.state.allData.sectionList" :key="section.index" class="m-2 section" 
  style="min-height:100%;position:relative;">
  <v-card class="pb-15" @drop="drop($event)" @dragover="allowDrop($event)">

  <v-card-title v-text="section.title"></v-card-title>
<div class="overflow-y-auto" style="height:1000px;">
  <div>
<v-col v-for="task in section.taskList" :key="task.title">
    <!-- tasks -->
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
  </div>
  </div>
  </v-card>

  </div>
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
    drop(ev) {
      ev.preventDefault();
      let data = ev.dataTransfer.getData("text");

      if (ev.target) {
        ev.target.appendChild(document.getElementById(data));
        this.moveToTask(data.id, ev.target.id)  
      }
    },
    allowDrop(ev) {
      ev.preventDefault();
    },
    moveToTask(taskId, sectionId) {
      const store = this.$store;

      let param = {
        "index" : taskId,
        "sectionId" : sectionId
      }
      
      const promise = new Promise(function (resolve) {
      store.dispatch("moveToTask", param);
        resolve("success");
      });

      promise.then(function(_result) {
      console.log(_result);
    });
  },
  created() {
    const store = this.$store;
    const route = this.$route;
    console.log(route.params);
    const promise = new Promise(function (resolve) {
    store.dispatch("delayAllDataFetch", route.params);
      resolve("success");
    });

    promise.then(function(_result) {
      console.log(_result);
    });
    }
  }
}

</script>