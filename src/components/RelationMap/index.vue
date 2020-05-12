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
    editor.onNameClick = this.handleNameClick;
    editor.onAddClick = this.handleAddClick;
    editor.onEditClick = this.handleEditClick;
    const graph = editor.create();
    graph.data(data);
    graph.render();
    graph.fitView();
    this.graph = graph;
    setTimeout(()=>{
      this.save()
    }, 5000);
  },
  methods: {
    handleNameClick: (event) => {
      console.log("handleNameClick", event);
    },
    handleAddClick: (event) => {
      const { graph, item } = event;
      const model = item.getModel();
      graph.addChild({ id: "lee" }, model.id);
      item.refresh();
    },
    handleEditClick: (event) => {
      const { graph, item } = event;
      const model = item.getModel();
      const data = graph.findDataById(model.id);
      data.name = "update";
      graph.changeData();
      item.refresh();
    },
    save(){
      const data = this.graph.save();
      console.log("save", data);
    },
  },
};
</script>

<style>
#mapContainer {
  width: 100%;
  height: 100%;
}
</style>
