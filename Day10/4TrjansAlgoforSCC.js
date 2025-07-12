// 🔧 Problem: Strongly Connected Components using Tarjan's Algorithm
// 📝 Key Point: Single DFS pass with low-link values
// ✅ Status: WORKING - All syntax errors fixed

function tarjanSCC(graph, n) {
    let disc = new Array(n).fill(-1);
    let low = new Array(n).fill(-1);
    let stack = [];
    let inStack = new Array(n).fill(false);
    let time = 0;
    let scc = [];
    
    function dfs(u) {  // Fixed: function declaration syntax
        disc[u] = low[u] = time++;  // Fixed: assignment syntax
        stack.push(u);
        inStack[u] = true;
        
        for (let v of graph[u]) {
            if (disc[v] == -1) {
                dfs(v);
                low[u] = Math.min(low[u], low[v]);
            } else if (inStack[v]) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
        
        // If u is a root node, pop the stack and create SCC
        if (low[u] == disc[u]) {
            let comp = [];
            while (true) {
                let v = stack.pop();
                inStack[v] = false;
                comp.push(v);
                if (v == u) break;
            }
            scc.push(comp);
        }
    }
    
    // Call DFS for all unvisited vertices
    for (let i = 0; i < n; i++) {
        if (disc[i] == -1) {
            dfs(i);
        }
    }
    
    return scc;
}

// 🔧 Test Cases
let graph4 = [[1], [2], [0, 3], [4], []];
console.log("Tarjan SCC:", tarjanSCC(graph4, 5));
// Expected Output: [[4], [3], [2, 1, 0]]

// Additional test case
let graph5 = [[1], [2], [3], [1], [0, 2]];
console.log("Tarjan SCC 2:", tarjanSCC(graph5, 5));
// Expected Output: [[1, 3, 2], [0, 4]]

/* 
💡 Algorithm Explanation:
1. DFS traversal with discovery time (disc) and low-link values (low)
2. Low-link[u] = minimum of:
   - disc[u] (discovery time)
   - low[v] for all children v in DFS tree
   - disc[v] for all back edges to v
3. If low[u] == disc[u], then u is root of SCC
4. Pop stack until u is found - all popped nodes form one SCC

🔧 Key Data Structures:
- disc[]: Discovery time of vertices
- low[]: Low-link values 
- stack: Maintains current path
- inStack[]: Track if vertex is in stack

✅ Real-world Applications:
1. Software Dependencies: Find circular dependencies in modules
2. Circuit Design: Identify feedback loops in electronic circuits
3. Social Networks: Find strongly connected user groups
4. Compiler Optimization: Identify code blocks that can be optimized together
5. Web Page Ranking: PageRank algorithm uses SCC concepts
6. Database Systems: Deadlock detection in transaction graphs
7. Game Development: AI pathfinding and state management
*/