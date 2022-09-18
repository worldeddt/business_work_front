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
          const response = store.dispatch("additionalProject", {
            title : title,
            description : desc
          });

          resolve(response);
        });

        promise.then(function(_response) {
          if (!_response || !_response.data) {
          alert("결과를 확인할 수 없습니다.");
          return;
          }

          if (_response.data.result !== 1) {
            alert(`오류가 발생하였습니다. : ${_response.data.message}`)
            return;
          }

          //todo alert 처리 필요 
          
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