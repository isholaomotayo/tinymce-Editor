<template>
  <div id="app">
    <editor :init="init"></editor>
    <HelloWorld msg="Welcome to Tiny MCE sandbox App"/>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import init from "./config/tinymce";
export default {
  name: "app",
  data: function() {
    return {
      init
    };
  },
  components: {
    HelloWorld
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
