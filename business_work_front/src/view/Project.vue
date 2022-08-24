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
    <v-card draggable="true" @dragstart="drag($event)" >
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
    drag(e) {
      ev.dataTransfer.setData("text", ev.target.id);
    },
    drop(ev) {
      console.log(ev);
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data));
    },
    allowDrop(ev) {
      ev.preventDefault();
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