<template>
  <div id="mapContainer"></div>
</template>

<script>
import Editor from "./editor";
import data from "../../assets/data";
import { v4 as uuidv4 } from "uuid";
import { treeUtil } from "./util";
import { clone } from "@antv/util";
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
    editor.onDeleteClick = this.handleDeleteClick;
    const graph = editor.create();
    graph.data(data);
    graph.render();
    graph.fitView();
    this.graph = graph;
    setTimeout(() => {
      this.save();
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
    handleDeleteClick: (event) => {
      const { graph, item } = event;

      const parent = item.get("parent");
      const model = item.getModel();
      const data = graph.findDataById(model.id);
      const parentModel = parent.getModel();
      let parentData = graph.findDataById(parentModel.id);

      if (treeUtil.hasChildren(data)) {
        // 有子节点的，移除节点并将子节点上移
        // 不重设id会导致节点收缩 temp
        // todo 优化移动节点功能
        const index = treeUtil.getIndex(parentData, model.id);
        const moveList = clone(data.children);
        moveList.forEach((child) => {
          treeUtil.setRecursion(child, (o) => {
            o.id = uuidv4();
          });
        });
        parentData.children.splice(index, 1, ...moveList);
        graph.changeData();
      } else {
        // 没有子节点的，直接移除
        graph.removeChild(model.id);
        parentData = graph.findDataById(parentModel.id);
        if (!treeUtil.hasChildren(parentData)) {
          setTimeout(() => {
            parent.refresh();
          }, 400);
        }
      }
    },
    save() {
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
