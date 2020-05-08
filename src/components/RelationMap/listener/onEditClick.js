export default {
  event: "on-edit-click",
  listener: (event) => {
    const { graph, item } = event;

    const model = item.getModel();
    graph.addChild({ id: "lee" }, model.id);
  },
};
