export default {
  getEvents() {
    return {
      "node:click": "onNodeClick",
    };
  },
  onNodeClick(evt) {
    if (!this.shouldBegin(evt)) {
      return;
    }
    const { graph } = this;
    const { item } = evt;
    graph.emit("on-edit-click", {
      graph,
      item,
    });
  },
  shouldBegin(evt) {
    const target = evt.target;
    var name = target.get("name");
    return name === "shape-circle-edit" || name == "shape-text-edit";
  },
};
