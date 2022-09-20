<template>
<v-card>
<v-container id="projectModal" style="overflow:auto; height:300px;">
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
  {{projectTitle}}
  </v-text-field>
  <v-textarea 
  v-model="projectDesc"
  label="설명" 
  hide-details="auto"
  auto-grow
  height="auto"
  >
  {{projectDesc}}
  </v-textarea>
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
      initProject(_index) {
        console.log(_index);
        this.$store.getters.getProjectList
      },
      registerProject() {
        const store = this.$store;
        const title = this.projectTitle;
        const desc = this.projectDesc;

        const register = store.dispatch("additionalProject", {
          title : title,
          description : desc
        });


      },
      closeModal() {
        this.$emit('close');
      }
    },
    mounted () {
    }
}
</script>

<style>

</style>