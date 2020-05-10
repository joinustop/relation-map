import {
  getNodeConfig,
  EXPAND_ICON,
  COLLAPSE_ICON,
  getTextStyle,
  getCircleStyle,
} from "../helper";
import { treeUtil, dataUtil } from "../util";

export default {
  //   options: {
  //     stateStyles: {
  //       edit: {
  //         fill: "red",
  //       },
  //     },
  //   },
  draw(cfg, group) {
    const styleConfig = getNodeConfig(cfg);
    const container = nodeBasicMethod.createNodeBox(group, cfg, styleConfig);

    // const signGroup = group.addGroup({
    //   id: "signGroup",
    // });

    // nodeBasicMethod.createNodeSign(signGroup, styleConfig);

    const controlGroup = group.addGroup({
      id: "controlGroup",
    });
    const hasChildren = treeUtil.hasChildren(cfg);
    if (hasChildren) {
      nodeBasicMethod.createNodeMarker(controlGroup, cfg, styleConfig);
    }

    nodeBasicMethod.createEditBox(group, styleConfig);
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
      (element) => element.get("name") === "collapse-icon"
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
    // const hasOpacityClass = [
    //   "ip-cp-line",
    //   "ip-cp-bg",
    //   "ip-cp-icon",
    //   "ip-cp-box",
    //   "ip-box",
    //   "shape-circle-collapse",
    // ];
    const group = item.getContainer();

    // const childrens = group.get("children");
    // graph.setAutoPaint(false);
    // if (name === "emptiness") {
    //   if (value) {
    //     childrens.forEach((shape) => {
    //       if (hasOpacityClass.indexOf(shape.get("name")) > -1) {
    //         return;
    //       }
    //       shape.attr("opacity", 0.4);
    //     });
    //   } else {
    //     childrens.forEach((shape) => {
    //       if (hasOpacityClass.indexOf(shape.get("name")) > -1) {
    //         return;
    //       }
    //       shape.attr("opacity", 1);
    //     });
    //   }
    if (name === "edit") {
      const editGroup = group.findById("editGroup");
      if (value) {
        editGroup.show();
      } else {
        editGroup.hide();
      }
    }
    // graph.setAutoPaint(true);
  },
};

const nodeBasicMethod = {
  createNodeBox: (group, cfg, styleConfig) => {
    const w = styleConfig.width;
    const h = styleConfig.height;
    console.log(group, styleConfig);
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

    const mainGroup = group.addGroup({
      id: "mainGroup",
    });
    mainGroup.addShape("rect", {
      attrs: {
        x: 0,
        y: 0,
        width: w,
        height: h - 16,
        fill: styleConfig.bgColor,
        stroke: styleConfig.borderColor,
        radius: 2,
      },
      name: "rect-shape",
    });

    const lbGroup = group.addGroup({
      id: "lbGroup",
    });
    lbGroup.addShape("rect", {
      attrs: {
        x: 1,
        y: styleConfig.height - 16 - 24,
        width: 75,
        height: 24,
        fill: styleConfig.orangeColor,
        stroke: styleConfig.orangeColor,
      },
      name: "lr-shape",
    });

    const rbGroup = group.addGroup({
      id: "rbGroup",
    });
    rbGroup.addShape("rect", {
      attrs: {
        x: 1 + 75 + 2,
        y: styleConfig.height - 16 - 24,
        width: 75,
        height: 24,
        fill: styleConfig.greenColor,
        stroke: styleConfig.greenColor,
      },
      name: "rr-shape",
    });

    // eslint-disable-next-line no-unused-vars
    const { name, job, line, position, level } = cfg;
    // todo 计算偏移量，让name+dot+line在节点中大致居中
    nodeBasicMethod.createText(mainGroup, {
      name: "name",
      text: name,
      attrs: {
        x: w / 2,
        y: 19,
      },
    });

    nodeBasicMethod.createText(mainGroup, {
      name: "line",
      text: line,
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
      text: job,
      attrs: {
        x: w / 2 + 8,
        y: 44.5,
      },
    });

    nodeBasicMethod.createText(lbGroup, {
      name: "position",
      text: dataUtil.formatPosition(position),
      attrs: {
        x: w / 4,
        y: 71 + 2,
      },
    });

    nodeBasicMethod.createText(rbGroup, {
      name: "level",
      text: level,
      attrs: {
        x: (w * 3) / 4,
        y: 71 + 2,
      },
    });

    return container;
  },
  createNodeSign: (group, styleConfig) => {
    group.addShape("polygon", {
      attrs: {
        points: [
          [-styleConfig.xOffset, -styleConfig.yOffset],
          [-styleConfig.xOffset + styleConfig.signWidth, -styleConfig.yOffset],
          [
            -styleConfig.xOffset + styleConfig.signWidth - 4,
            -styleConfig.yOffset + styleConfig.signHeight / 2 + 2,
          ],
          [
            -styleConfig.xOffset + styleConfig.signWidth,
            -styleConfig.yOffset + styleConfig.signHeight,
          ],
          [-styleConfig.xOffset, -styleConfig.yOffset + styleConfig.signHeight],
        ],
        fill: styleConfig.bgColor,
        stroke: styleConfig.borderColor,
        lineWidth: 1,
        ...styleConfig.shadowStyle,
      },
      name: "polygon-shape",
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
  createEditBox: (group, styleConfig) => {
    const editGroup = group.addGroup({
      id: "editGroup",
      visible: false,
    });

    editGroup.addShape("rect", {
      attrs: {
        x: 0,
        y: 0,
        width: styleConfig.width,
        height: styleConfig.height - 16,
        fill: styleConfig.grayColor,
        opacity: 0.3,
        stroke: styleConfig.borderColor,
        radius: 2,
      },
      name: "shadow-mask",
    });

    nodeBasicMethod.createBoxBtn(editGroup, styleConfig, "add", {
      x: 16 + 15,
      y: 84 / 2,
    });
    nodeBasicMethod.createBoxBtn(editGroup, styleConfig, "edit", {
      x: 16 * 2 + 30 + 15,
      y: 84 / 2,
    });
    nodeBasicMethod.createBoxBtn(editGroup, styleConfig, "delete", {
      x: 16 * 3 + 30 * 2 + 15,
      y: 84 / 2,
      fill: styleConfig.orangeColor,
    });
  },
  createBoxBtn: (group, styleConfig, action, attrs) => {
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
      id: name + "Group",
      visible: true,
    });

    nodeBasicMethod.createCircle(currentGroup, {
      name,
      attrs: {
        x: attrs.x,
        y: attrs.y,
      },
    });
    currentGroup.addShape("text", {
      attrs: {
        fontFamily: "iconfont", // 对应css里面的font-family: "iconfont";
        textAlign: "center",
        textBaseline: "middle",
        text: icon,
        fontSize: styleConfig.size,
        cursor: "pointer",
        x: attrs.x,
        y: attrs.y,
        fill: attrs.fill ? attrs.fill : styleConfig.blueColor,
      },
      name: name + "Icon",
    });
  },
  /* 生成树上的 marker */
  createNodeMarker: (group, cfg, styleConfig) => {
    const x = styleConfig.width / 2;
    const y = styleConfig.height - 8;
    nodeBasicMethod.createCircle(group, {
      name: "collapse",
      attrs: {
        x,
        y,
      },
    });
    group.addShape("marker", {
      attrs: {
        x,
        y,
        r: 7,
        symbol: cfg.collapsed ? EXPAND_ICON : COLLAPSE_ICON,
        stroke: styleConfig.blueColor,
        fill: "rgba(0,0,0,0)",
        lineWidth: 1,
        cursor: "pointer",
      },
      name: "collapse-icon",
      id: "collapse-icon",
    });
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
    group.addShape("text", {
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
    group.addShape("circle", {
      attrs: {
        ...circleStyle,
        ...attrs,
      },
      name: "shape-circle-" + name,
    });
  },
};
