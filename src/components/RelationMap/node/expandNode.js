import { getNodeConfig, EXPAND_ICON, COLLAPSE_ICON } from "../helper";

export default {
  //   options: {
  //     stateStyles: {
  //       edit: {
  //         fill: "red",
  //       },
  //     },
  //   },
  draw(cfg, group) {
    console.log("draw", cfg, group);
    const { collapsed } = cfg;
    const config = getNodeConfig(cfg);
    config.collapsed = collapsed;
    const container = nodeBasicMethod.createNodeBox(
      group,
      config,
      config.width,
      config.height
    );

    const signGroup = group.addGroup({
      id: "signGroup",
    });

    nodeBasicMethod.createNodeSign(signGroup, config);

    const controlGroup = group.addGroup({
      id: "controlGroup",
    });
    const hasChildren = cfg.children && cfg.children.length > 0;
    if (hasChildren) {
      nodeBasicMethod.createNodeMarker(
        controlGroup,
        config,
        config.width / 2,
        config.height - 8
      );
    }

    nodeBasicMethod.createEditBox(group, config);
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
        (element) => element.get("name") === "collapse-icon-bg"
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
    //   "collapse-icon-bg",
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

    const mainGroup = group.addGroup({
      id: "mainGroup",
    });
    mainGroup.addShape("rect", {
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

    const lbGroup = group.addGroup({
      id: "lbGroup",
    });
    lbGroup.addShape("rect", {
      attrs: {
        x: 1,
        y: config.height - 16 - 24,
        width: 75,
        height: 24,
        fill: config.orangeColor,
        stroke: config.orangeColor,
      },
      name: "lr-shape",
    });

    const rbGroup = group.addGroup({
      id: "rbGroup",
    });
    rbGroup.addShape("rect", {
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

    return container;
  },
  createNodeSign: (group, config) => {
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
        lineWidth: 1,
        ...config.shadowStyle,
      },
      name: "polygon-shape",
    });
    group.addShape("text", {
      attrs: {
        text: "1W",
        x: 6,
        y: 1,
        fontSize: 14,
        textAlign: "center",
        textBaseline: "middle",
        fill: "#333333",
      },
      name: "sign-text",
    });
  },
  createEditBox: (group, config) => {
    const editGroup = group.addGroup({
      id: "editGroup",
      visible: false,
    });

    editGroup.addShape("rect", {
      attrs: {
        x: 0,
        y: 0,
        width: config.width,
        height: config.height - 16,
        fill: config.grayColor,
        opacity: 0.3,
        stroke: config.borderColor,
        radius: 2,
      },
      name: "shadow-mask",
    });

    nodeBasicMethod.createBoxBtn(editGroup, config, "add", {
      x: 16 + 15,
      y: 84 / 2,
    });
    nodeBasicMethod.createBoxBtn(editGroup, config, "edit", {
      x: 16 * 2 + 30 + 15,
      y: 84 / 2,
    });
    nodeBasicMethod.createBoxBtn(editGroup, config, "delete", {
      x: 16 * 3 + 30 * 2 + 15,
      y: 84 / 2,
      fill: config.orangeColor,
    });
  },
  createBoxBtn: (group, config, action, attrs) => {
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
    currentGroup.addShape("circle", {
      attrs: {
        r: config.size,
        fill: config.whiteColor,
        ...config.shadowStyle,
        cursor: "pointer",
        x: attrs.x,
        y: attrs.y,
      },
      name: name + "Box",
    });
    currentGroup.addShape("text", {
      attrs: {
        fontFamily: "iconfont", // 对应css里面的font-family: "iconfont";
        textAlign: "center",
        textBaseline: "middle",
        text: icon,
        fontSize: config.size,
        cursor: "pointer",
        x: attrs.x,
        y: attrs.y,
        fill: attrs.fill ? attrs.fill : config.blueColor,
      },
      name: name + "Icon",
    });
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
};
