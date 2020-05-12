import {
  getTextStyle,
  getCircleStyle,
  getRectStyle,
  getMarkerStyle,
  getPolygonStyle,
  getPositionColor,
  getNameColor,
  getLevelColor,
  baseStyle,
} from "../style";
import { treeUtil, dataUtil } from "../util";

export default {
  draw(cfg, group) {
    const container = nodeBasicMethod.createNodeBox(group, cfg);

    // // 左上角标识
    // const signGroup = group.addGroup({
    //   id: "group-sign",
    // });
    // nodeBasicMethod.createNodeSign(signGroup);

    const controlGroup = group.addGroup({
      id: "group-control",
    });
    const hasChildren = treeUtil.hasChildren(cfg);
    if (hasChildren) {
      nodeBasicMethod.createNodeMarker(controlGroup, cfg);
    }

    nodeBasicMethod.createEditBox(group, cfg);
    return container;
  },
  getAnchorPoints() {
    return [
      [0.5, 0], // 左侧中间
      [0.5, 1], // 右侧中间
    ];
  },
  afterDraw(cfg, group) {
    /* 操作 marker 的背景色显示隐藏 */
    const icon = group.find(
      (element) => element.get("name") === "shape-marker-collapse"
    );
    if (icon) {
      const bg = group.find(
        (element) => element.get("name") === "shape-circle-collapse"
      );
      icon.on("mouseenter", () => {
        bg.attr("opacity", 1);
        // graph.get("canvas").draw();
      });
      icon.on("mouseleave", () => {
        bg.attr("opacity", 0);
        // graph.get("canvas").draw();
      });
    }
  },
  setState(name, value, item) {
    const group = item.getContainer();
    if (name === "edit") {
      const editGroup = group.findById("group-edit");
      if (value) {
        editGroup.show();
      } else {
        editGroup.hide();
      }
    } else if (name === "hover-name") {
      const shape = group.find((item) => {
        return item.get("name") === "shape-text-name";
      });
      if (value) {
        shape.attr({
          cursor: "pointer",
          fill: baseStyle.blueColor,
        });
      } else {
        shape.attr({
          cursor: "unset",
          fill: baseStyle.nameColor,
        });
      }
    } else if (
      name === "hover-add-btn" ||
      name === "hover-delete-btn" ||
      name === "hover-edit-btn"
    ) {
      let shapeName = "";
      switch (name) {
        case "hover-add-btn":
          shapeName = "add";
          break;
        case "hover-delete-btn":
          shapeName = "delete";
          break;
        case "hover-edit-btn":
          shapeName = "edit";
          break;
      }
      if (value) {
        nodeBasicMethod.setShapAttr(group, "shape-circle-" + shapeName, {
          fill: baseStyle.blueColor,
        });
        nodeBasicMethod.setShapAttr(group, "shape-text-" + shapeName, {
          fill: baseStyle.whiteColor,
        });
      } else {
        nodeBasicMethod.setShapAttr(group, "shape-circle-" + shapeName, {
          fill: baseStyle.whiteColor,
        });
        if (shapeName === "delete") {
          nodeBasicMethod.setShapAttr(group, "shape-text-" + shapeName, {
            fill: baseStyle.orangeColor,
          });
        } else {
          nodeBasicMethod.setShapAttr(group, "shape-text-" + shapeName, {
            fill: baseStyle.blueColor,
          });
        }
      }
    }
    // graph.setAutoPaint(true);
  },
};

const nodeBasicMethod = {
  createNodeBox: (group, cfg) => {
    const w = baseStyle.width;
    const h = baseStyle.height;
    /* 最外面的大矩形 */
    const container = nodeBasicMethod.createRect(group, {
      name: "box",
      attrs: {
        width: w,
        height: h,
      },
    });

    const mainGroup = group.addGroup({
      id: "group-main",
    });
    nodeBasicMethod.createRect(mainGroup, {
      name: "main",
      attrs: {
        width: w,
        height: h - 16,
      },
    });

    const { name, job, line, position, level } = cfg;

    const positionGroup = group.addGroup({
      id: "group-position",
    });
    nodeBasicMethod.createRect(positionGroup, {
      name: "position",
      attrs: {
        x: 1,
        y: baseStyle.height - 16 - 25,
        fill: getPositionColor(position),
        stroke: getPositionColor(position),
      },
    });

    const levelGroup = group.addGroup({
      id: "group-level",
    });
    nodeBasicMethod.createRect(levelGroup, {
      name: "level",
      attrs: {
        x: 1 + 75 + 2,
        y: baseStyle.height - 16 - 25,
        fill: getLevelColor(level),
        stroke: getLevelColor(level),
      },
    });

    // todo 计算偏移量，让name + dot + line在节点中大致居中
    nodeBasicMethod.createText(mainGroup, {
      name: "name",
      text: dataUtil.formatNullText(name),
      attrs: {
        x: w / 2,
        y: 19 + 3,
        fill: getNameColor(name),
      },
    });

    nodeBasicMethod.createText(mainGroup, {
      name: "line",
      text: dataUtil.formatNullText(line),
      attrs: {
        x: w / 2 - 8,
        y: 44.5,
      },
    });

    nodeBasicMethod.createCircle(mainGroup, {
      name: "dot",
      attrs: {
        x: w / 2,
        y: 44.5,
      },
    });

    nodeBasicMethod.createText(mainGroup, {
      name: "job",
      text: dataUtil.formatNullText(job),
      attrs: {
        x: w / 2 + 8,
        y: 44.5,
      },
    });

    nodeBasicMethod.createText(positionGroup, {
      name: "position",
      text: dataUtil.formatPosition(position),
      attrs: {
        x: w / 4,
        y: 71 + 2,
      },
    });

    nodeBasicMethod.createText(levelGroup, {
      name: "level",
      text: dataUtil.formatNullText(level),
      attrs: {
        x: (w * 3) / 4,
        y: 71 + 2,
      },
    });

    return container;
  },
  createNodeSign: (group) => {
    nodeBasicMethod.createPolygon(group, {
      name: "sign",
    });

    nodeBasicMethod.createText(group, {
      name: "sign",
      text: "1W",
      attrs: {
        x: 6,
        y: 1,
      },
    });
  },
  createEditBox: (group, cfg) => {
    const editGroup = group.addGroup({
      id: "group-edit",
      visible: false,
    });

    nodeBasicMethod.createRect(editGroup, {
      name: "shadow-mask",
    });

    if (cfg.depth !== 1) {
      nodeBasicMethod.createBoxBtn(editGroup, "add", {
        x: 16 + 15,
        y: 84 / 2,
      });
      nodeBasicMethod.createBoxBtn(editGroup, "edit", {
        x: 16 * 2 + 30 + 15,
        y: 84 / 2,
      });
      nodeBasicMethod.createBoxBtn(editGroup, "delete", {
        x: 16 * 3 + 30 * 2 + 15,
        y: 84 / 2,
        fill: baseStyle.orangeColor,
      });
    } else {
      nodeBasicMethod.createBoxBtn(editGroup, "add", {
        x: baseStyle.width / 4,
        y: 84 / 2,
      });
      nodeBasicMethod.createBoxBtn(editGroup, "edit", {
        x: (baseStyle.width * 3) / 4,
        y: 84 / 2,
      });
    }
  },
  createBoxBtn: (group, action, attrs) => {
    let name = "";
    let icon = "";
    switch (action) {
      case "add":
        name = "add";
        icon = "\ue6bb";
        break;
      case "edit":
        name = "edit";
        icon = "\ue6b9";
        break;
      case "delete":
        name = "delete";
        icon = "\ue6ba";
        break;
    }
    const currentGroup = group.addGroup({
      id: "group-sub-" + name,
      visible: true,
    });

    nodeBasicMethod.createCircle(currentGroup, {
      name,
      attrs: {
        x: attrs.x,
        y: attrs.y,
      },
    });

    nodeBasicMethod.createText(currentGroup, {
      name,
      attrs: {
        x: attrs.x,
        y: attrs.y,
        text: icon,
        fill: attrs.fill ? attrs.fill : baseStyle.blueColor,
      },
    });
  },
  /* 生成树上的 marker */
  createNodeMarker: (group, cfg) => {
    const x = baseStyle.width / 2;
    const y = baseStyle.height - 8;
    nodeBasicMethod.createCircle(group, {
      name: "collapse",
      attrs: {
        x,
        y,
      },
    });
    nodeBasicMethod.createMarker(
      group,
      {
        name: "collapse",
        attrs: {
          x,
          y,
        },
      },
      cfg
    );
  },
  /**
   * 创建Text图形
   * @param {group} object
   * @param {config} object
   */
  createText: (group, config) => {
    const { name, text, attrs } = config;
    if (!name) {
      throw "config.name is invalid";
    }
    const textStyle = getTextStyle(name);
    return group.addShape("text", {
      attrs: {
        text,
        ...textStyle,
        ...attrs,
      },
      name: "shape-text-" + name,
    });
  },
  /**
   * 创建Circle图形
   * @param {group} object
   * @param {config} object
   */
  createCircle: (group, config) => {
    const { name, attrs } = config;
    if (!name) {
      throw "config.name is invalid";
    }
    const circleStyle = getCircleStyle(name);
    return group.addShape("circle", {
      attrs: {
        ...circleStyle,
        ...attrs,
      },
      name: "shape-circle-" + name,
    });
  },
  /**
   * 创建Rect图形
   * @param {group} object
   * @param {config} object
   */
  createRect: (group, config) => {
    const { name, attrs } = config;
    if (!name) {
      throw "config.name is invalid";
    }
    const rectStyle = getRectStyle(name);
    return group.addShape("rect", {
      attrs: {
        ...rectStyle,
        ...(attrs || {}),
      },
      name: "shape-rect-" + name,
    });
  },
  /**
   * 创建Marker图形
   * @param {group} object
   * @param {config} object
   */
  createMarker: (group, config, cfg) => {
    const { name, attrs } = config;
    if (!name) {
      throw "config.name is invalid";
    }
    const markerStyle = getMarkerStyle(name, cfg);
    return group.addShape("marker", {
      attrs: {
        ...markerStyle,
        ...(attrs || {}),
      },
      name: "shape-marker-" + name,
    });
  },
  /**
   * 创建Polygon图形
   * @param {group} object
   * @param {config} object
   */
  createPolygon: (group, config) => {
    const { name, attrs } = config;
    if (!name) {
      throw "config.name is invalid";
    }
    const markerStyle = getPolygonStyle(name);
    return group.addShape("polygon", {
      attrs: {
        ...markerStyle,
        ...(attrs || {}),
      },
      name: "shape-polygon-" + name,
    });
  },
  setShapAttr: (group, name, attrs) => {
    const shape = group.find((item) => {
      return item.get("name") === name;
    });
    shape.attr(attrs);
  },
};
