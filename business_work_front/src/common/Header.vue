<template>
    <div class="header-container">
        <b-form-input v-model="text" placeholder="Search"></b-form-input>
        <a href="">
            <div role="img" style ='background-image: url("./assets/img/avatar.png")'>

            </div>
        </a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text : ''
        }
    }

}
</script>

<style>

</style>