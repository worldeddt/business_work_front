<template>
<v-card>
<v-container style="overflow:auto; height:300px;">
  <v-form
    ref="form"
    v-model="form"
  >
<v-text-field 
  v-model="projectTitle"
  filled
  color="deep-purple"
  label="제목" 
  :rules="[rules.requiredTitle]"
  hide-details="auto">
  </v-text-field>
  <v-textarea 
  v-model="projectDesc"
  label="설명" 
  hide-details="auto"
  auto-grow
  height="auto"
  ></v-textarea>
  </v-form>
  <v-card-actions class="text-right mt-4">
    <v-btn
        :disabled="!form"
        :loading="isLoading"
        color="deep-purple accent-4"
        depressed
     @click="registerProject">
    저장
  </v-btn>
  </v-card-actions>
  
  </v-container>
  </v-card> 
</template>

<script>
export default {
    name: 'ProjectRegister',
    data: () => ({
      projectTitle : "",
      projectDesc : "",
      dialog: false,
      form: false,
      isLoading: false,
      rules : {
        requiredTitle : value => !!value || '제목을 입력해주세요',
      }
    }),
    methods : {
      registerProject() {
        const promise = new Promise(function (resolve) {
          this.$store.dispatch("additionalProject", {
            title : this.projectTitle,
            description : this.projectDesc
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