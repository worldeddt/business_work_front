<template>
<v-card>
<v-container id="taskModal" style="overflow:auto; height:300px;">
  <v-form
    ref="form"
    v-model="form"
  >
<v-text-field 
  v-model="taskTitle"
  id="taskTitle"
  filled
  color="deep-purple"
  label="제목" 
  :rules="[rules.requiredTitle]"
  hide-details="auto">
  {{taskTitle}}
  </v-text-field>
  <v-textarea 
  v-model="taskDesc"
  id="taskDesc"
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
     @click="modifyTask">
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
      modifyTask() {
        const store = this.$store;

        const promise = store.dispatch("modifyTask", {
          index : store.getters.getCurrentSelectedTask.index,
          title : this.taskTitle,
          description : this.taskDesc,
          sectionId : store.state.currentSelectedSection
        });

        promise.then();       
      },
      closeModal() {
        this.$emit('close');
      }
    },
    mounted () {
      /**
       description
      index
      lastModifyDate
      registerDate
      section
      taskStatusType
      title
       */

      this.taskTitle = "";
      this.taskDesc = "";

      document.getElementById("taskTitle").value = "";
      document.getElementById("taskDesc").value = "";

      if (!this.$store.getters.getCurrentSelectedTask) return;
    
      if (this.$store.getters.getCurrentSelectedTask.title) this.taskTitle = this.$store.getters.getCurrentSelectedTask.title;

      if (this.$store.getters.getCurrentSelectedTask.description) this.taskDesc = this.$store.getters.getCurrentSelectedTask.description;
    }
}
</script>

<style>

</style>