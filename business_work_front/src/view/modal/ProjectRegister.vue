<template>
<v-card>
<v-container id="projectModal" style="overflow:auto; height:300px;"
  @before-open="beforeOpen"
>
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
  <v-btn
      :loading="isLoading"
      color="deep-purple accent-4"
      depressed
     @click="closeModal">
    취소
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
        const store = this.$store;
        const title = this.projectTitle;
        const desc = this.projectDesc;
        const promise = new Promise(function (resolve) {
          store.dispatch("additionalProject", {
            title : title,
            description : desc
          });
          resolve("success");
        });

        promise.then(function(_result) {
          console.log(_result)
        });        
        
      },
      beforeOpen(event) {
        console.log(event);
        console.log('Opening...')
      },
      closeModal() {
        document.getElementById('projectModal').modal('hide')


        const modal = this.$modal;
        modal.hide("ProjectRegister");

        console.log(modal);
      }
    },
    mounted () {
    }
}
</script>

<style>

</style>