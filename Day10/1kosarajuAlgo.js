// A. Graph Advanced (15 Problems) //
// [Q1] Strongly Connected Components (Kosaraju's Algorithm)
/* 
🔧 Problem: Find SCCs in directed graph 
📝 Key Point: Two pass DFS (reverse graph + original)

💡 ALGORITHM EXPLANATION:
Kosaraju's algorithm finds all Strongly Connected Components (SCCs) in a directed graph.
A SCC is a maximal set of vertices where every vertex is reachable from every other vertex.

The algorithm works in 3 main steps:
1. First DFS: Fill vertices in stack according to their finish times
2. Create transpose/reverse graph
3. Second DFS: Process vertices from stack on reversed graph

🌍 REAL WORLD APPLICATIONS:
- Software dependency analysis (circular dependencies)
- Social network analysis (finding tightly connected groups)
- Web page ranking and clustering
- Circuit design and analysis
- Compiler optimization
- Database query optimization
*/

function KosarajuSCC(graph, n) {
    let visited = new Array(n).fill(false);
    let stack = [];
    
    // STEP 1: First DFS - Fill stack with vertices by finish time
    // 🔧 WORK: Records the order in which vertices finish processing
    function dfs(u) {
        visited[u] = true;
        
        // Visit all adjacent vertices first
        for (let v of graph[u]) {
            if (!visited[v]) {
                dfs(v);
            }
        }
        
        // Push vertex to stack AFTER visiting all its neighbors
        // This ensures vertices with later finish times are on top
        stack.push(u);
    }
    
    // Run DFS from all unvisited vertices
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i);
        }
    }
    
    // STEP 2: Create reverse/transpose graph
    // 🔧 WORK: Reverses all edge directions to find SCCs
    let revGraph = Array.from({ length: n }, () => []);
    for (let u = 0; u < n; u++) {
        for (let v of graph[u]) {
            // Reverse edge: u->v becomes v->u
            revGraph[v].push(u);
        }
    }
    
    // STEP 3: Second DFS on reversed graph using stack order
    // 🔧 WORK: Groups vertices that can reach each other in original graph
    visited.fill(false);
    
    function revDfs(u, comp) {
        visited[u] = true;
        comp.push(u);
        
        // Visit all vertices reachable in reversed graph
        for (let v of revGraph[u]) {
            if (!visited[v]) {
                revDfs(v, comp);
            }
        }
    }
    
    let scc = [];
    
    // Process vertices in decreasing order of finish time
    while (stack.length) {
        let u = stack.pop();
        if (!visited[u]) {
            let comp = [];
            revDfs(u, comp);
            scc.push(comp); // Add this SCC to result
        }
    }
    
    return scc;
}

// 🔧 TEST CASES
console.log("=== KOSARAJU'S SCC ALGORITHM TEST ===");

// Test Case 1: Simple graph with 2 SCCs
let graph1 = [[1], [2], [0, 3], [4], []];
console.log("Graph 1 - SCCs:", KosarajuSCC(graph1, 5));
// Expected: [[4], [3], [0, 2, 1]] or similar grouping

// Test Case 2: Larger graph
let graph2 = [
    [1],        // 0 -> 1
    [2, 3],     // 1 -> 2, 3
    [4],        // 2 -> 4
    [0],        // 3 -> 0
    [5],        // 4 -> 5
    [6],        // 5 -> 6
    [4]         // 6 -> 4
];
console.log("Graph 2 - SCCs:", KosarajuSCC(graph2, 7));

// Test Case 3: Single SCC (all connected)
let graph3 = [[1], [2], [0]];
console.log("Graph 3 - SCCs:", KosarajuSCC(graph3, 3));

// output:-=== KOSARAJU'S SCC ALGORITHM TEST ===
// Graph 1 - SCCs: [ [ 0, 2, 1 ], [ 3 ], [ 4 ] ]
// Graph 2 - SCCs: [ [ 0, 3, 1 ], [ 2 ], [ 4, 6, 5 ] ]
// Graph 3 - SCCs: [ [ 0, 2, 1 ] ]

/* 
💡 DETAILED EXPLANATION:

WHY IT WORKS:
1. First DFS creates a topological ordering of SCCs
2. In the transpose graph, edges within SCCs remain within SCCs
3. Second DFS in reverse finish order ensures we process one SCC at a time

TIME COMPLEXITY: O(V + E) - Two DFS traversals
SPACE COMPLEXITY: O(V) - For stack, visited array, and recursive calls

🌍 REAL WORLD EXAMPLES:

1. SOFTWARE DEPENDENCY ANALYSIS:
   - Detect circular dependencies in modules
   - Each SCC represents a group of mutually dependent modules
   - Example: Module A depends on B, B depends on C, C depends on A

2. SOCIAL NETWORK ANALYSIS:
   - Find tightly connected groups of friends
   - Each SCC represents a clique where everyone knows everyone
   - Used in Facebook friend suggestions, LinkedIn connections

3. WEB PAGE RANKING:
   - Group web pages that link to each other
   - Each SCC represents a cluster of related pages
   - Used in Google PageRank algorithm

4. COMPILER OPTIMIZATION:
   - Identify strongly connected regions in control flow graphs
   - Optimize code within each SCC independently
   - Loop optimization and dead code elimination

5. DATABASE QUERY OPTIMIZATION:
   - Find cycles in query dependency graphs
   - Optimize execution order for complex queries
   - Parallel execution planning

✅ ALGORITHM ADVANTAGES:
- Simple to implement and understand
- Linear time complexity O(V + E)
- Works for any directed graph
- Finds all SCCs in single pass
- Memory efficient

❌ LIMITATIONS:
- Only works for directed graphs
- Requires two complete graph traversals
- Not suitable for dynamic graphs (frequent edge additions/deletions)
*/