<template>
  <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <v-list-item>
          <v-list-item-action>
            <i class="fa-solid fa-list-check"></i>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title style="cursor: pointer" @click="$router.push({path:'/project'})">프로젝트_1</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {

}
</script>

<style>

</style>