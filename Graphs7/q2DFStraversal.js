/*
🔧 Problem: Traverse graph using DFS
📝 Key Point: Recursion + visited set
*/

let graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"]
};

function dfs(graph, node, visited = new Set()) {
    if (!visited.has(node)) {
        console.log(node);
        visited.add(node);
        for ( let neighbor of graph[node]) {
            dfs(graph, neighbor, visited);
        }
    }
}
// 🔧 Test
console.log("Q2 DFS Traversal Output:",);
dfs(graph, "A") ;
 /*
💡 Explanation:
Visit deeply along each branch before backtracking.
✅ Real use: Path finding, cycle detection, topological sort.
*/

// Q2 DFS Traversal Output:
// A
// B
// D
// E
// F
// C