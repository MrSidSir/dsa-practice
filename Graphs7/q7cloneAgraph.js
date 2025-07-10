let graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"]
};

/*
🔧 Problem: Clone graph using DFS
📝 Key Point: Use Map to store cloned nodes
*/

function cloneGraph(node, visited = new Map()) {
    if (!node) return null;
    if (visited.has(node)) return visited.get(node);

    let clone = { val: node.val, neighbors: [] };
    visited.set(node, clone);
     for (let neighbor of node.neighbors) {
        clone.neighbors.push(cloneGraph(neighbors, visited));
     }
     return clone;
}


/*
💡 Explanation:
Create new node, recursively clone neighbors.
✅ Real use: Deep copying graph data structures, AI knowledge graph duplication.
*/