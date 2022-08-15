<template>
  <main-page></main-page>
</template>

<style>
@media only screen and (min-width: 1000px) {
  .mainSection {
   min-width:1200px;
   display: flex;
  }

  .section {
    width: 304px;
    min-width: 304px;
  }
}

@media only cellPhone and ( max-width: 1000px) {
  .mainSection {
    width: 100%;
  }

  .section {
    flex: 0 0 25%;
    max-width: 25%;
  }
}
</style>


<script>
import Main from '@/view/Main.vue'

export default {
  components: {
    "main-page" : Main
  }
};
</script>
