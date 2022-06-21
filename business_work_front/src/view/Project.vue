<template>

<div>
    <v-row
      justify="center"
      align="center"
    >
    </v-row>
    <v-container
      id="scroll-target"
      style="width: 1000px; border:1px solid black;"
      class="overflow-x-auto"
    >
      <v-row
        v-scroll:#scroll-target="onScroll"
        align="center"
        justify="center"
        style="height: 1000px;"
      >
        <v-col v-for="section in sections" :key="section.index">
          <v-card class="overflow-x-auto" width="350" height="1100" :col="12">
            {{section.title}}
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>

<!-- 
<div 
id="scroll-target"
      style="max-height: 1200px"
      class="overflow-y-auto"
>
  <div class="mt-4 mx-2">
    <v-row
    v-scroll:#scroll-target="onScroll"
    >
      <v-col v-for="section in sections" :key="section.index">
        <v-card class="overflow-x-auto" width="350" height="1200" :col="12">
        {{section.title}}
        </v-card>
      </v-col>
    </v-row>  
  </div>
</div> -->



  <!-- <v-card
    class="overflow-x-auto"
    max-width="window.innerWidth"
    max-height="window.innerHeight"
  >
    <v-row>
<v-col v-for="section in sections" :key="section.index">
  <v-card 
    max-width="350" 
    max-height="500"
    class="overflow-x-auto"
  >
    <v-col :cols="12"> 
          <v-col v-for="card in tasks" :key="card.title" >
            <v-card>
              <v-checkbox v-model="todoCheck"></v-checkbox>
              <v-card-title v-text="card.title"></v-card-title>
            
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
    </v-col>
    </v-card>
</v-col></v-row>

</v-card> -->

</template>

<script>

export default {
  name : 'project',
  data: () => ({
    todoCheck : false,
    tasks: [
      { title: 'back office', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 6 },
      { title: 'erp product', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
      { title: 'main application', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
    ],
    sections: [
      {index:'1', title: 'todo'},
      {index:'2', title: 'in sprint'},
      {index:'3', title: 'PR'}
    ]
  }),
}

</script>

<style>

</style>