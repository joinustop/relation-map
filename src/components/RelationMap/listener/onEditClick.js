export default {
  event: "on-edit-click",
  listener: (event) => {
    const { graph, item } = event;
    const model = item.getModel();
    const data = graph.findDataById(model.id);
    data.name = "update";
    graph.changeData();
  },
};
