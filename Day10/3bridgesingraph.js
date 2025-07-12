// 🌉 Bridges in Graph - Tarjan's Algorithm
/* 
🔧 Problem: Find bridges (critical edges) in undirected graph
📝 Key Point: Bridge removal increases connected components
⚡ Algorithm: Tarjan's Bridge-Finding Algorithm
*/

function findBridges(graph, n) {
    let disc = new Array(n).fill(-1);      // Discovery time
    let low = new Array(n).fill(-1);       // Low-link value
    let visited = new Array(n).fill(false); // Fixed: was "filse"
    let parent = new Array(n).fill(-1);     // Parent in DFS tree
    let time = 0;                          // Global time counter
    let result = [];                       // Store bridges
    
    function dfs(u) {
        visited[u] = true;
        disc[u] = low[u] = ++time;
        
        for (let v of graph[u]) {
            if (!visited[v]) {
                // Tree edge: v is unvisited
                parent[v] = u;
                dfs(v);
                
                // Check if edge (u,v) is a bridge
                if (low[v] > disc[u]) {
                    result.push([u, v]); // Bridge found!
                }
                
                // Update low-link value
                low[u] = Math.min(low[u], low[v]);
                
            } else if (v != parent[u]) {
                // Back edge: update low-link (fixed syntax)
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    }
    
    // Handle disconnected components
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i);
        }
    }
    
    return result;
}

// 🔧 Test Example
function createTestGraph() {
    // Graph representation: adjacency list
    //     0---1---2
    //     |       |
    //     3       4---5
    let graph = [
        [1, 3],     // 0 -> [1, 3]
        [0, 2],     // 1 -> [0, 2]
        [1, 4],     // 2 -> [1, 4]
        [0],        // 3 -> [0]
        [2, 5],     // 4 -> [2, 5]
        [4]         // 5 -> [4]
    ];
    return graph;
}

let testGraph = createTestGraph();
console.log("Bridges found:", findBridges(testGraph, 6));
// Expected: [[0,3], [1,2], [4,5]] - these are critical edges

// 🔧 Another Test - Simple Bridge
function simpleTest() {
    // Simple graph: 0---1---2
    let graph = [
        [1],        // 0 -> [1]
        [0, 2],     // 1 -> [0, 2]
        [1]         // 2 -> [1]
    ];
    return graph;
}

// console.log("Simple test:", findBridges(simpleTest(), 3));
// Bridges found: [ [ 4, 5 ], [ 2, 4 ], [ 1, 2 ], [ 0, 1 ], [ 0, 3 ] ]
// Simple test: [ [ 1, 2 ], [ 0, 1 ] ]

// Expected: [[0,1], [1,2]] - both edges are bridges

/* 
💡 Algorithm Explanation:
======================

🔍 Key Concepts:
- disc[u]: Discovery time when node u is first visited
- low[u]: Lowest discovery time reachable from u via back edges
- Bridge condition: low[v] > disc[u] for edge (u,v)

🎯 How it works:
1. DFS traversal assigns discovery times
2. For each edge (u,v), check if it's a bridge:
   - If low[v] > disc[u], then (u,v) is a bridge
   - This means v cannot reach any ancestor of u without using edge (u,v)

⚡ Time Complexity: O(V + E)
💾 Space Complexity: O(V)

🌍 Real-World Applications:
=========================

1. 🌐 Network Infrastructure:
   - Internet backbone analysis
   - Identifying critical network links
   - Preventing network partitioning

2. 🚗 Transportation Systems:
   - Critical road/bridge identification
   - Traffic flow optimization
   - Emergency route planning

3. 🏗️ Social Networks:
   - Finding key connections between communities
   - Influence propagation analysis
   - Community detection

4. 🔌 Power Grid Analysis:
   - Critical transmission lines
   - Power system reliability
   - Cascading failure prevention

5. 🧬 Biological Networks:
   - Protein interaction networks
   - Gene regulatory networks
   - Disease spread modeling

6. 💼 Supply Chain Management:
   - Critical supplier relationships
   - Bottleneck identification
   - Risk assessment

7. 🔗 Circuit Design:
   - Critical connections in circuits
   - Fault tolerance analysis
   - Redundancy planning

📊 Performance Characteristics:
- Single DFS traversal
- Linear time complexity
- Efficient for large graphs
- Works on disconnected graphs
*/