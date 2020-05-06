<template>
  <div id="mapContainer"></div>
</template>

<script>
import G6 from "@antv/g6";
import data from "../../assets/data";
import { getNodeConfig, EXPAND_ICON, COLLAPSE_ICON } from "./helper";
export default {
  name: "RelationMap",
  components: {},
  mounted() {
    const width = document.getElementById("mapContainer").scrollWidth;
    const height = document.getElementById("mapContainer").scrollHeight || 500;
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
        ],
      },
      defaultNode: {
        type: "card-node",
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

    const nodeBasicMethod = {
      createNodeBox: (group, config, w, h) => {
        /* 最外面的大矩形 */
        const container = group.addShape("rect", {
          attrs: {
            x: 0,
            y: 0,
            width: w,
            height: h,
          },
          name: "box",
        });

        group.addShape("rect", {
          attrs: {
            x: 0,
            y: 0,
            width: w,
            height: h - 16,
            fill: config.bgColor,
            stroke: config.borderColor,
            radius: 2,
          },
          name: "rect-shape",
        });

        group.addShape("rect", {
          attrs: {
            x: 1,
            y: config.height - 16 - 24,
            width: 75,
            height: 24,
            fill: config.orangeColor,
            stroke: config.orangeColor,
            cursor: "pointer",
          },
          name: "lr-shape",
        });
        group.addShape("rect", {
          attrs: {
            x: 1 + 75 + 2,
            y: config.height - 16 - 24,
            width: 75,
            height: 24,
            fill: config.greenColor,
            stroke: config.greenColor,
          },
          name: "rr-shape",
        });
        /* 左边标记 */
        group.addShape("polygon", {
          attrs: {
            points: [
              [-config.xOffset, -config.yOffset],
              [-config.xOffset + config.signWidth, -config.yOffset],
              [
                -config.xOffset + config.signWidth - 4,
                -config.yOffset + config.signHeight / 2 + 2,
              ],
              [
                -config.xOffset + config.signWidth,
                -config.yOffset + config.signHeight,
              ],
              [-config.xOffset, -config.yOffset + config.signHeight],
            ],
            fill: config.bgColor,
            stroke: config.borderColor,
            shadowColor: config.borderColor,
            shadowOffsetX: 1,
            shadowOffsetY: 1,
            shadowBlur: 10,
          },
          name: "polygon-shape",
        });
        group.addShape("text", {
          attrs: {
            text: "1W",
            x:6,
            y:1,
            fontSize: 14,
            textAlign: "center",
            textBaseline: "middle",
            fill: "#333333",
          },
          name: "sign-text",
        });
        return container;
      },
      /* 生成树上的 marker */
      createNodeMarker: (group, config, x, y) => {
        group.addShape("circle", {
          attrs: {
            x,
            y,
            r: 16,
            fill: "rgba(47, 84, 235, 0.05)",
            opacity: 0,
            zIndex: -2,
          },
          name: "collapse-icon-bg",
        });
        group.addShape("marker", {
          attrs: {
            x,
            y,
            r: 7,
            symbol: config.collapsed ? EXPAND_ICON : COLLAPSE_ICON,
            stroke: config.blueColor,
            fill: "rgba(0,0,0,0)",
            lineWidth: 1,
            cursor: "pointer",
          },
          name: "collapse-icon",
          id: "collapse-icon",
        });
      },
      afterDraw: (cfg, group) => {
        /* 操作 marker 的背景色显示隐藏 */
        const icon = group.find(
          (element) => element.get("name") === "collapse-icon"
        );
        if (icon) {
          const bg = group.find(
            (element) => element.get("name") === "collapse-icon-bg"
          );
          icon.on("mouseenter", () => {
            bg.attr("opacity", 1);
            graph.get("canvas").draw();
          });
          icon.on("mouseleave", () => {
            bg.attr("opacity", 0);
            graph.get("canvas").draw();
          });
        }
      },
      setState: (name, value, item) => {
        const hasOpacityClass = [
          "ip-cp-line",
          "ip-cp-bg",
          "ip-cp-icon",
          "ip-cp-box",
          "ip-box",
          "collapse-icon-bg",
        ];
        const group = item.getContainer();
        const childrens = group.get("children");
        graph.setAutoPaint(false);
        if (name === "emptiness") {
          if (value) {
            childrens.forEach((shape) => {
              if (hasOpacityClass.indexOf(shape.get("name")) > -1) {
                return;
              }
              shape.attr("opacity", 0.4);
            });
          } else {
            childrens.forEach((shape) => {
              if (hasOpacityClass.indexOf(shape.get("name")) > -1) {
                return;
              }
              shape.attr("opacity", 1);
            });
          }
        }
        graph.setAutoPaint(true);
      },
    };

    G6.registerNode("card-node", {
      draw(cfg, group) {
        const { collapsed } = cfg;
        const config = getNodeConfig(cfg);
        // console.log(cfg, collapsed);
        config.collapsed = collapsed;
        const container = nodeBasicMethod.createNodeBox(
          group,
          config,
          config.width,
          config.height
        );

        const hasChildren = cfg.children && cfg.children.length > 0;
        if (hasChildren) {
          nodeBasicMethod.createNodeMarker(
            group,
            config,
            config.width / 2,
            config.height - 8
          );
        }
        return container;
      },
      getAnchorPoints() {
        return [
          [0.5, 0], // 左侧中间
          [0.5, 1], // 右侧中间
        ];
      },
      afterDraw: nodeBasicMethod.afterDraw,
      setState: nodeBasicMethod.setState,
    });

    graph.data(data);
    graph.render();
    graph.fitView();
    // let isAnimating = false;
    const initEvent = () => {
      // 监听节点展开与收缩事件
      graph.on("itemcollapsed", (event) => {
        const { item } = event;
        const model = item.getModel();
        const { collapsed } = model;
        if (collapsed) {
          // const group = item.get('group');
          // const icon = group.findAllByName("collapse-icon")[0];
          item.update({ collapsed });
          // console.log(999, item, model, icon);

          // icon.attr("symbol", COLLAPSE_ICON);
        } else {
          item.update({ collapsed });
        }
      });

    };
    initEvent();
  },
};
</script>

<style>
#mapContainer {
  width: 100%;
  height: 100%;
}
</style>
