export default {
  getEvents() {
    return {
      "node:mouseout": "onNodeMouseOut",
      "node:mouseover": "onNodeMouseOver",
      "node:click": "onNodeClick",
    };
  },
  onNodeClick(evt) {
    if (!this.shouldBegin(evt)) {
      return;
    }
    const { item } = evt;
    const { graph } = this;
    graph.emit("on-name-click", {
      graph,
      item,
    });
  },
  onNodeMouseOver(evt) {
    if (!this.shouldBegin(evt)) {
      return;
    }
    const { item } = evt;
    const { graph } = this;
    graph.setItemState(item, "hover-name", true);
  },
  onNodeMouseOut(evt) {
    if (!this.shouldBegin(evt)) {
      return;
    }
    const { item } = evt;
    const { graph } = this;
    if (item.hasState("hover-name")) {
      graph.setItemState(item, "hover-name", false);
    }
  },
  shouldBegin(evt) {
    const { item, target } = evt;
    var name = target.get("name");
    var model = item.getModel();
    return name === "shape-text-name" && model.name && !item.hasState("edit");
  },
};
