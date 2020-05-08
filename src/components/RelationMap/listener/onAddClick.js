export default {
  event: "on-add-click",
  listener: (event) => {
    const { graph, item } = event;

    const model = item.getModel();
    graph.addChild({ id: "lee" }, model.id);
    item.refresh()
  },
};
