/*
🔧 Problem: Topological sort using DFS
📝 Key Point: Reverse postorder of DFS
*/
let graph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"]
};
function topologicalSort(graph) {
    let visited = new Set();
    let stack = [];

    function dfs(node) {
        visited.add(node);
        for (let neighbor of graph[node] || []) {
            if (!visited.has(neighbor)) dfs(neighbor);
        }
        stack.push(node);
    }
    for (let node in graph) {
        if  (!visited.has(node)) dfs(node);
    }
return stack.reverse();
}

// test

let dag = {
    "5" : ["0", "2"],
    "4" : ["0", "1"],
    "2" : ["3"],
    "3" : ["1"],
    "0" : [],
    "1" : []
};

console.log("q5 topological sort output:", topologicalSort(dag));

/*
💡 Explanation:
Ordering of tasks respecting dependencies.
✅ Real use: Build systems, task scheduling, compiler instruction ordering.
*/

// q5 topological sort output: [ '5', '4', '2', '3', '1', '0' ]