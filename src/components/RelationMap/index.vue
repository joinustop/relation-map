<template>
  <div id="mapContainer"></div>
</template>

<script>
import Editor from "./editor";
import data from "../../assets/data";
export default {
  name: "RelationMap",
  components: {},
  data: function() {
    return {
      graph: undefined,
    };
  },
  mounted() {
    const width = document.getElementById("mapContainer").scrollWidth;
    const height = document.getElementById("mapContainer").scrollHeight || 500;
    const editor = new Editor(width, height);
    const graph = editor.create();
    graph.data(data);
    graph.render();
    graph.fitView();
    this.graph = graph;
  },
};
</script>

<style>
#mapContainer {
  width: 100%;
  height: 100%;
}
</style>
