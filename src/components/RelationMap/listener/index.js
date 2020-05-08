import itemcollapsed from "./itemcollapsed";
import onAddClick from "./onAddClick";
import onEditClick from "./onEditClick";
import onDeleteClick from "./onDeleteClick";

export function registerListener(graph) {
  graph.on(itemcollapsed.event, itemcollapsed.listener);
  graph.on(onAddClick.event, onAddClick.listener);
  graph.on(onEditClick.event, onEditClick.listener);
  graph.on(onDeleteClick.event, onDeleteClick.listener);
}
