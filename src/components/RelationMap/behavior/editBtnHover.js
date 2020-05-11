export default {
  allStateName: ["hover-add-btn", "hover-edit-btn", "hover-delete-btn"],
  getEvents() {
    return {
      "node:mouseout": "onNodeMouseOut",
      "node:mouseover": "onNodeMouseOver",
    };
  },
  onNodeMouseOver(evt) {
    if (!this.shouldBegin(evt)) {
      return;
    }
    const { item } = evt;
    const { graph } = this;
    const stateName = this.getStateName(evt);
    graph.setItemState(item, stateName, true);
  },
  onNodeMouseOut(evt) {
    if (!this.shouldBegin(evt)) {
      return;
    }
    const { item, target } = evt;
    const { graph } = this;
    const name = target.get("name");
    if (
      name == "shape-text-add" ||
      name == "shape-text-edit" ||
      name == "shape-text-delete"
    ) {
      return;
    }
    this.allStateName.forEach((state) => {
      if (item.hasState(state)) {
        graph.setItemState(item, state, false);
      }
    });
  },
  getStateName(evt) {
    const target = evt.target;
    var name = target.get("name");
    let targetName = this.allStateName[2];
    if (name.indexOf("add") > 0) {
      targetName = this.allStateName[0];
    } else if (name.indexOf("edit") > 0) {
      targetName = this.allStateName[1];
    }
    return targetName;
  },
  shouldBegin(evt) {
    const target = evt.target;
    var name = target.get("name");
    return (
      name === "shape-circle-add" ||
      name == "shape-text-add" ||
      name === "shape-circle-edit" ||
      name == "shape-text-edit" ||
      name === "shape-circle-delete" ||
      name == "shape-text-delete"
    );
  },
};
