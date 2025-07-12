// 🔧 Articulation Points Algorithm
/* 
📝 Problem: Find articulation points (cut vertices) in undirected graph
💡 Key Concept: A vertex is an articulation point if removing it increases connected components
⚡ Algorithm: Uses DFS with discovery time and low time tracking
*/

function articulationPoints(graph, n) {
    let disc = new Array(n).fill(-1);     // Discovery time of each vertex
    let low = new Array(n).fill(-1);      // Low time (earliest reachable vertex)
    let visited = new Array(n).fill(false);
    let parent = new Array(n).fill(-1);
    let ap = new Array(n).fill(false);    // Articulation points array
    let time = 0;                         // Global time counter

    function dfs(u) {
        visited[u] = true;
        disc[u] = low[u] = ++time;        // Set discovery and low time
        let children = 0;                 // Count children in DFS tree

        for (let v of graph[u]) {
            if (!visited[v]) {
                children++;
                parent[v] = u;
                dfs(v);
                
                // Update low time of u based on child v
                low[u] = Math.min(low[u], low[v]);

                // Root node: articulation point if it has more than 1 child
                if (parent[u] == -1 && children > 1)
                    ap[u] = true;

                // Non-root node: articulation point if low[v] >= disc[u]
                if (parent[u] != -1 && low[v] >= disc[u])
                    ap[u] = true;
                    
            } else if (v != parent[u]) {
                // Back edge found, update low time
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    }

    // Run DFS from all unvisited vertices
    for (let i = 0; i < n; i++) {
        if (!visited[i]) dfs(i);
    }

    // Return indices of articulation points
    return ap.map((isAP, index) => isAP ? index : -1).filter(x => x != -1);
}

// 🔧 Test Case
let graph = [
    [1, 2],      // 0: connected to 1, 2
    [0, 2],      // 1: connected to 0, 2
    [0, 1, 3, 5], // 2: connected to 0, 1, 3, 5 (potential articulation point)
    [2, 4],      // 3: connected to 2, 4
    [3],         // 4: connected to 3
    [2, 6, 7],   // 5: connected to 2, 6, 7 (potential articulation point)
    [5],         // 6: connected to 5
    [5]          // 7: connected to 5
];

console.log("Graph Structure:");
console.log("0 -- 1");
console.log("|    |");
console.log("2 -- 3 -- 4");
console.log("|");
console.log("5 -- 6");
console.log("|");
console.log("7");

console.log("\nArticulation Points:", articulationPoints(graph, 8));
// Expected Output: [2, 5] (removing 2 or 5 increases connected components)

// 📊 Algorithm Explanation:
console.log("\n🔍 How it works:");
console.log("1. DFS traversal assigns discovery time to each vertex");
console.log("2. Low time tracks earliest reachable vertex via back edges");
console.log("3. Root is articulation point if it has >1 children in DFS tree");
console.log("4. Non-root is articulation point if low[child] >= disc[current]");

// 🌍 Real-world Applications:
console.log("\n🌍 Real-world Uses:");
console.log("• Network Reliability: Find critical routers/servers");
console.log("• Transportation: Identify critical junctions in road networks");
console.log("• Social Networks: Find key influencers whose removal fragments network");
console.log("• Circuit Design: Identify critical components in electrical circuits");
console.log("• Supply Chain: Find bottleneck suppliers/distributors");

// 📈 Time Complexity Analysis:
console.log("\n📈 Complexity:");
console.log("• Time: O(V + E) - Single DFS traversal");
console.log("• Space: O(V) - Arrays for tracking vertex states");

// 🔧 Advanced Example: Network Topology
function networkReliabilityAnalysis() {
    console.log("\n🔧 Network Reliability Example:");
    
    // Network topology: Routers and connections
    let networkGraph = [
        [1, 2],        // Router 0: Gateway
        [0, 2, 3],     // Router 1: Core switch
        [0, 1, 4],     // Router 2: Distribution
        [1, 5],        // Router 3: Branch office
        [2, 6],        // Router 4: Data center
        [3],           // Router 5: Remote office
        [4]            // Router 6: Backup server
    ];
    
    let criticalRouters = articulationPoints(networkGraph, 7);
    console.log("Critical Routers (failure points):", criticalRouters);
    console.log("Network becomes fragmented if these routers fail!");
    
    return criticalRouters;
}

networkReliabilityAnalysis();


// Graph Structure:
// 0 -- 1
// |    |
// 2 -- 3 -- 4
// |
// 5 -- 6
// |
// 7

// Articulation Points: [ 2, 3, 5 ]

// 🔍 How it works:
// 1. DFS traversal assigns discovery time to each vertex
// 2. Low time tracks earliest reachable vertex via back edges
// 3. Root is articulation point if it has >1 children in DFS tree        
// 4. Non-root is articulation point if low[child] >= disc[current]       

// 🌍 Real-world Uses:
// • Network Reliability: Find critical routers/servers
// • Transportation: Identify critical junctions in road networks
// • Social Networks: Find key influencers whose removal fragments network
// • Circuit Design: Identify critical components in electrical circuits  
// • Supply Chain: Find bottleneck suppliers/distributors

// 📈 Complexity:
// • Time: O(V + E) - Single DFS traversal
// • Space: O(V) - Arrays for tracking vertex states

// 🔧 Network Reliability Example:
// Critical Routers (failure points): [ 1, 2, 3, 4 ]
// Network becomes fragmented if these routers fail!