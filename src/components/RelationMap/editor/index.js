import G6 from "@antv/g6";
import {
  registerCustomBehavior,
  NAME_HOVER,
  EDIT_BTN_HOVER,
  ADD_CLICK,
  EDIT_CLICK,
  DELETE_CLICK,
  EDIT_MODE,
} from "../behavior";
import { registerCustomNode, EXPAND_NODE } from "../node";
import { registerListener } from "../listener";
export default class Editor {
  constructor(width, height) {
    this.height = height;
    this.width = width;
  }
  onNameClick() {}
  onAddClick() {}
  onEditClick() {}
  onDeleteClick() {}
  create() {
    const { width, height } = this;

    registerCustomNode(G6);
    registerCustomBehavior(G6);

    const defaultMode = [
      {
        type: "collapse-expand",
        shouldBegin(evt) {
          const target = evt.target;
          return target.get("name") === "shape-marker-collapse";
        },
      },
      "drag-canvas",
      "zoom-canvas",
      NAME_HOVER,
    ];
    const graph = new G6.TreeGraph({
      container: "mapContainer",
      width,
      height,
      modes: {
        default: defaultMode,
        edit: [
          ...defaultMode,
          EDIT_BTN_HOVER,
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

    registerListener(graph, this);

    setTimeout(() => {
      graph.setMode("edit");
      alert("into edit mode")
    }, 5000);
    return graph;
  }
}
