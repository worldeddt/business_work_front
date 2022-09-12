!<template>
  <v-container>
  <v-text-field label="제목" hide-details="auto"></v-text-field>
  <v-textarea 
  label="설명" 
  hide-details="auto"
  auto-grow
  ></v-textarea>
  <v-btn @click="registerProject">
    확인
  </v-btn>
  <v-btn>
    취소
  </v-btn>
  </v-container>
</template>

<script>
export default {
    name: 'ProjectRegister',
    methods : {
      registerProject() {
        console.log('프로젝트 등록');

        const promise = new Promise(function (resolve) {
          this.$store.dispatch("additionalProject", {
            title : "n 번째 프로젝트",
            description : "응원해"
          });
          resolve("success");
        });

        promise.then(function(_result) {
          console.log(_result)
        });        
        
      }
    },
    mounted () {
    }
}
</script>

<style>

</style>