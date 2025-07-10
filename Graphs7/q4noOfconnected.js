let graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"]
};

/*
🔧 Problem: Count connected components in graph
📝 Key Point: DFS for each unvisited node
*/
function countComponents(graph) {
    let visited = new  Set();
    let count = 0;

    function dfs(node) {
        visited.add(node);
        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }
    }
    for (let node in graph) {
        if (!visited.has(node)) {
            dfs(node);
            count++;
        }
    }
    return count;
}

// 🔧 Test
console.log("q4 connected components output:", countComponents(graph));
/*
💡 Explanation:
Each DFS call from unvisited node = 1 new component.
✅ Real use: Cluster counting in networks, social media groupings.
*/
// q4 connected components output: 1