<template>
<div class="overflow-x-auto">
<div class="m-1 mainSection">
<!-- sections -->
  <div v-for="section in sections" :key="section.index" class="m-2 section" 
  style="min-height:100%;position:relative;">
  <v-card class="pb-15">

  <v-card-title v-text="section.title"></v-card-title>
<div class="overflow-y-auto" style="height:1000px;">
  <div>
<v-col v-for="task in tasks" :key="task.title">
    <!-- tasks -->
    <v-card>
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
    tasks: [
      { title: 'back office', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 3 },
      { title: 'erp product', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
      { title: 'main application', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
      { title: 'main application1', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
      { title: 'main application2', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
      { title: 'main application3', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
      { title: 'main application4', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
      { title: 'main application5', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
      { title: 'main application6', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
      { title: 'main application7', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
      { title: 'main application8', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
    ],
    sections: [
      {index:'1', title: 'todo'},
      {index:'2', title: 'in sprint'},
      {index:'3', title: 'PR'},
      {index:'4', title: 'PR'},
      {index:'5', title: 'PR'}
    ]
  }),
  created() {
  }
}

</script>