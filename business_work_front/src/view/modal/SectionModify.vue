<template>
<v-card>
<v-container id="sectionModal" style="overflow:auto; height:300px;">
  <v-form
    ref="form"
    v-model="form"
  >
<v-text-field 
    id="sectionTitle"
  v-model="sectionTitle"
  filled
  color="deep-purple"
  label="제목" 
  :rules="[rules.requiredTitle]"
  hide-details="auto">
  {{sectionTitle}}
  </v-text-field>
  <v-textarea 
  id="sectionDesc"
  v-model="sectionDesc"
  label="설명" 
  hide-details="auto"
  auto-grow
  height="auto"
  >
  {{sectionDesc}}
  </v-textarea>
  </v-form>
  <v-card-actions class="text-right mt-4">
    <v-btn
        :disabled="!form"
        :loading="isLoading"
        color="deep-purple accent-4"
        depressed
     @click="modifySection">
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
    name: 'SectionRegister',
    data: () => ({
      sectionTitle : "",
      sectionDesc : "",
      dialog: false,
      form: false,
      isLoading: false,
      rules : {
        requiredTitle : value => !!value || '제목을 입력해주세요',
      }
    }),
    methods : {
      modifySection() {
        const store = this.$store;
        const title = this.sectionTitle;
        const desc = this.sectionDesc;

        console.log(title);

        const promise = store.dispatch("modifySection", {
          index : store.getters.getCurrentSelectedSection.index,
          title : title,
          description : desc,
          projectId : store.getters.getCurrentProjectIndex
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
      this.sectionTitle = "";
      this.sectionDesc = "";

      document.getElementById("sectionTitle").value = "";
      document.getElementById("sectionDesc").value = "";

      if (!this.$store.getters.getCurrentSelectedSection) return;
    
      if (this.$store.getters.getCurrentSelectedSection.title) this.sectionTitle = this.$store.getters.getCurrentSelectedSection.title;

      if (this.$store.getters.getCurrentSelectedSection.description) this.sectionDesc = this.$store.getters.getCurrentSelectedSection.description;
    }
}
</script>

<style>

</style>