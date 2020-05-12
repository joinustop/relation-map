export default {
  getEvents() {
    return {
      "node:mouseenter": "onNodeMouseEnter",
      "node:mouseout": "onNodeMouseOut", // node中的不同shape移动也会触发
      "node:mouseleave": "onNodeMouseleave",
    };
  },
  onNodeMouseEnter(evt) {
    if (!this.shouldBegin(evt)) {
      return;
    }
    const { target, item } = evt;
    const { graph } = this;
    // 排除从控制分组进入node
    if (target.getParent().get("id") == "group-control") {
      return;
    }
    graph.setItemState(item, "edit", true);
  },
  onNodeMouseOut(evt) {
    // 控制分组移入其它分组的情况
    if (!this.shouldBegin(evt)) {
      return;
    }
    const { target, item } = evt;
    const { graph } = this;
    if (!item.hasState("edit")) {
      if (target.getParent().get("id") === "group-control") {
        graph.setItemState(item, "edit", true);
      }
    }
  },
  onNodeMouseleave(evt) {
    const { item } = evt;
    const { graph } = this;
    graph.setItemState(item, "edit", false);
  },
  shouldBegin(evt) {
    const item = evt.item;
    const type = item.getType();
    const model = item.getModel();
    return type === "node" && model.depth > 0;
  },
};
