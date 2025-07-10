// 🔧 Adjacency List Representation
let graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"]
};

/*
🔧 Problem: Detect cycle using DFS
📝 Key Point: Pass parent to avoid false positive
*/
function hasCycle(graph) {
    let visited = new Set();

    function dfs(node, parent) {
        visited.add(node);
        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                if (dfs(neighbor, node)) return true;
            
            } else if (neighbor !==parent) {
                return true;
            }
        }
        return false;
    }
    for (let node in graph) {
        if (!visited.has(node)) {
            if (dfs(node, null)) return true;
        }
    }
    return false;
}

// 🔧 Test
console.log("Q3 CYCLE DETECTION OUTPUT:", hasCycle(graph));
/*
💡 Explanation:
If visiting an already visited node not equal to parent, cycle exists.
✅ Real use: Network loop detection, dependency graphs.
*/ 
// Q3 CYCLE DETECTION OUTPUT: true