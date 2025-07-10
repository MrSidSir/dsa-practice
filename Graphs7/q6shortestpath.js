/*
🔧 Problem: Clone graph using DFS
📝 Key Point: Use Map to store cloned nodes
*/

// 🔧 Node class definition
class GraphNode {
  constructor(val) {
    this.val = val;
    this.neighbors = [];
  }
}

function cloneGraph(node, visited = new Map()) {
  if (!node) return null;
  if (visited.has(node)) return visited.get(node);

  // 🌟 working: creating a cloned node
  let clone = { val: node.val, neighbors: [] };
  visited.set(node, clone);

  // 🌟 working: recursively cloning neighbors
  for (let neighbor of node.neighbors) {
    clone.neighbors.push(cloneGraph(neighbor, visited));
  }

  return clone;
}

// 🔧 Test graph creation
let node1 = new GraphNode(1);
let node2 = new GraphNode(2);
let node3 = new GraphNode(3);
let node4 = new GraphNode(4);

node1.neighbors.push(node2, node4);
node2.neighbors.push(node1, node3);
node3.neighbors.push(node2, node4);
node4.neighbors.push(node1, node3);

console.log("🔴 Q2 Clone Graph DFS Output:");

let clonedGraph = cloneGraph(node1);

function printGraph(node, visited = new Set()) {
  if (!node || visited.has(node)) return;
  visited.add(node);
  console.log("Node:", node.val, "Neighbors:", node.neighbors.map(n => n.val));
  for (let neighbor of node.neighbors) {
    printGraph(neighbor, visited);
  }
}

printGraph(clonedGraph);

/*
💡 Explanation:
Create new node, recursively clone neighbors.
✅ Real use: Deep copying graph data structures, AI knowledge graph duplication.
*/
