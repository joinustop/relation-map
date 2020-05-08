<template>
  <div id="mapContainer"></div>
</template>

<script>
import G6 from "@antv/g6";
import {
  registerCustomBehavior,
  ADD_CLICK,
  EDIT_CLICK,
  DELETE_CLICK,
  EDIT_MODE,
} from "./behavior";
import { registerCustomNode, EXPAND_NODE } from "./node";
import { registerListener } from "./listener";
import data from "../../assets/data";
export default {
  name: "RelationMap",
  components: {},
  mounted() {
    const width = document.getElementById("mapContainer").scrollWidth;
    const height = document.getElementById("mapContainer").scrollHeight || 500;

    registerCustomNode(G6);
    registerCustomBehavior(G6);

    const graph = new G6.TreeGraph({
      container: "mapContainer",
      width,
      height,
      modes: {
        default: [
          {
            type: "collapse-expand",
            shouldBegin(evt) {
              const target = evt.target;
              return target.get("name") === "collapse-icon";
            },
          },
          "drag-canvas",
          "zoom-canvas",
          ADD_CLICK,
          EDIT_CLICK,
          DELETE_CLICK,
          EDIT_MODE,
        ],
      },
      defaultNode: {
        type: EXPAND_NODE,
        anchorPoints: [
          [0.5, 0], // 左侧中间
          [0.5, 1], // 右侧中间
        ],
      },
      defaultEdge: {
        type: "cubic-vertical",
        style: {
          stroke: "#C0C4CC",
        },
      },
      layout: {
        type: "compactBox",
        direction: "TB", // H / V / LR / RL / TB / BT
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 84;
        },
        getWidth: function getWidth() {
          return 154;
        },
        getVGap: function getVGap() {
          return 80;
        },
        getHGap: function getHGap() {
          return 10;
        },
      },
    });

    registerListener(graph);

    graph.data(data);
    graph.render();
    graph.fitView();
  },
};
</script>

<style>
#mapContainer {
  width: 100%;
  height: 100%;
}
</style>
