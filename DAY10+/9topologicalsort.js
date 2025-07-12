// [Graph Q9] Topological Sort (DFS)
/*
🔧 Problem: Linear ordering using DFS
📝 Key Point: Post-order reverse gives topo sort
*/

function dfsTopologicalSort(graph, n) {
    let visited = Array(n).fill(false);
    let stack = [];

    function dfs(u){
    visited[u]=true;
    for (let v of graph[u])
        if (!visited[v]) dfs(v);
    stack.push(u)
}
for (let i=0;i<n;i++)
    if (!visited[i]) dfs(i);

return stack.reverse();
}
// 🔧 Test
let graph9 = [[1,2],[2],[3],[]];
console.log("DFS Toposort:", dfsTopologicalSort(graph9,4));

// output:- DFS Toposort: [ 0, 1, 2, 3 ]
/*   
💡 Explanation:
Post-order reversal yields topological ordering.

✅ Real Use: Compilation order resolution, pipeline scheduling.
*/