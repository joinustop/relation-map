<template>
  <div id="app">
    <RelationMap></RelationMap>
  </div>
</template>

<script>
import RelationMap from "./components/RelationMap";
export default {
  name: "App",
  components: { RelationMap },
  mounted() {},
};
</script>

<style>
body{
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  overflow: hidden
}
</style>
