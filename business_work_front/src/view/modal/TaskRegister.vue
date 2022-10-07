<template>
<v-card>
<v-container id="taskModal" style="overflow:auto; height:300px;">
  <v-form
    ref="form"
    v-model="form"
  >
<v-text-field 
  v-model="taskTitle"
  filled
  color="deep-purple"
  label="제목" 
  :rules="[rules.requiredTitle]"
  hide-details="auto">
  {{taskTitle}}
  </v-text-field>
  <v-textarea 
  v-model="taskDesc"
  label="설명" 
  hide-details="auto"
  auto-grow
  height="auto"
  >
  {{taskDesc}}
  </v-textarea>
  </v-form>
  <v-card-actions class="text-right mt-4">
    <v-btn
        :disabled="!form"
        :loading="isLoading"
        color="deep-purple accent-4"
        depressed
     @click="registerTask">
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
    name: 'TaskRegister',
    data: () => ({
      taskTitle : "",
      taskDesc : "",
      dialog: false,
      form: false,
      isLoading: false,
      rules : {
        requiredTitle : value => !!value || '제목을 입력해주세요',
      }
    }),
    methods : {
      registerTask() {
        const store = this.$store;
        const title = this.taskTitle;
        const desc = this.taskDesc;

        console.log(this.$store.state.currentSelectedSection);

        const promise = store.dispatch("additionalTask", {
          title : title,
          description : desc,
          sectionId : this.$store.state.currentSelectedSection
        });

        promise.then(function(_result) {
          console.log(_result)
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