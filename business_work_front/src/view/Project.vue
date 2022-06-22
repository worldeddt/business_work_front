<template>

<div class="row m-1">
<!-- sections -->
  <div v-for="section in sections" :key="section.index" class="m-2 col-md-3">
  <v-card class="overflow-auto" style="height:1000px;">

  <v-card-title v-text="section.title"></v-card-title>

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
  </v-card>

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
      {index:'3', title: 'PR'}
    ]
  }),
  created() {
    console.log('dddd')
  }
}

</script>

<style>

</style>