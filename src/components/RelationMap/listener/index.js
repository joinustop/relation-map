import itemcollapsed from "./itemcollapsed";
import onAddClick from "./onAddClick";
import onEditClick from "./onEditClick";
import onDeleteClick from "./onDeleteClick";
import onNameClick from "./onNameClick";

export function registerListener(graph, editor) {
  graph.on(itemcollapsed.event, listenerWraper(editor, itemcollapsed.listener));
  graph.on(onAddClick.event, listenerWraper(editor, onAddClick.listener));
  graph.on(onEditClick.event, listenerWraper(editor, onEditClick.listener));
  graph.on(onDeleteClick.event, listenerWraper(editor, onDeleteClick.listener));
  graph.on(onNameClick.event, listenerWraper(editor, onNameClick.listener));
}

// 传入editor实例
const listenerWraper = (editor, fn) => {
  return (event) => {
    fn(event, editor);
  };
};
