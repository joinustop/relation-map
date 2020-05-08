/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
export default {
  event: "on-delete-click",
  listener: (event) => {
    const { graph, item } = event;
    // graph.remove(item);
    const parent = item.get("parent");
    const model = item.getModel();
    const data = graph.findDataById(model.id);
    const parentModel = parent.getModel();
    // console.log(111,graph.findDataById(parent.get("parent").getModel().id));
    const parentData = graph.findDataById(parentModel.id);
    console.log(888, { ...parentData, children: [{ id: "sub" }] });
    // graph.fitView();
    console.log(99, graph.save());

    // const autoPaint = graph.get("autoPaint");
    // graph.setAutoPaint(false);
    // graph.updateChild({ ...parentData, children: [{ id: "sub" }] }, "root");
    // parentData.children = [{ id: "sub", type: "expand-node" }, { id: "bbb" }];
    if (data.children && data.children.length > 0) {
      parentData.children.splice(0, 1, { id: "sub2" });
      graph.changeData();
    } else {
      graph.removeChild(model.id);
      const parentData = graph.findDataById(parentModel.id);
      if (!parentData.children || parentData.children.length == 0) {
        setTimeout(() => {
          parent.refresh();
        }, 400);
      }
    }
    // console.log(parentData.children.splice(0, 1));
    // parentData.collapsed = false;
    // console.log(parentData.children.splice(0,0,...data.children));

    // parentData.children = [{ id: "sub", type: "expand-node" }, { id: "bbb" }];
    // graph.render()
    // graph.fitView();

    // graph.updateChild(
    //   {
    //     id: "Regression",
    //     children: [{ id: "sub" }, { id: "bbb" }],
    //   },
    //   "root"
    // );

    // graph.removeChild(model.id);
    // // console.log(data);
    // graph.addChild(
    //   {
    //     id: "9999",
    //     x: data.x,
    //     y: data.y,
    //   },
    //   parent.getModel().id
    // );
    // (data.children || []).forEach((child) => {
    //   graph.addChild({ ...child, collapsed: false }, parent.getModel().id);
    // });
    // graph.layout();
    // graph.paint();
    // graph.setAutoPaint(true);
    // graph.updateChild({ id: "333" }, item.getModel().id);
    // console.log(graph.save());

    // graph.updateItem(item,{});
  },
};
