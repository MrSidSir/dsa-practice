// Union-Find Algorithm for Cycle Detection in Undirected Graph

// Find function - finds the root parent of a node
function find(parent, i) {
    if (parent[i] == -1) return i;  // If node is its own parent, return it
    return find(parent, parent[i]); // Recursively find the root parent
}

// Union function - connects two different sets
function union(parent, x, y) {
    let xset = find(parent, x);  // Find root of x
    let yset = find(parent, y);  // Find root of y
    
    if (xset != yset) {
        parent[xset] = yset;  // Make one root parent of another
    }
}

// Main function to detect cycle in undirected graph
function isCyclic(edges, V) {  // Fixed: V should be capital
    let parent = Array(V).fill(-1);  // Initialize all nodes as separate sets
    
    // Process each edge
    for (let [u, v] of edges) {
        let x = find(parent, u);  // Find root of node u
        let y = find(parent, v);  // Find root of node v
        
        // If both nodes have same root parent, they're already connected
        // Adding this edge would create a cycle
        if (x == y) return true;
        
        // If not connected, union them
        union(parent, x, y);
    }
    
    return false;  // No cycle found
}

// Test cases
console.log("=== Union-Find Cycle Detection ===");

// Test 1: Graph with cycle
let edges1 = [[0,1], [1,2], [2,0]];
console.log("Graph 1 (0-1-2-0):", isCyclic(edges1, 3));  // true

// Test 2: Graph without cycle (tree)
let edges2 = [[0,1], [1,2], [2,3]];
console.log("Graph 2 (0-1-2-3):", isCyclic(edges2, 4));  // false

// Test 3: More complex graph with cycle
let edges3 = [[0,1], [1,2], [2,3], [3,4], [4,1]];
console.log("Graph 3 (complex):", isCyclic(edges3, 5));  // true

// Test 4: Single edge (no cycle)
let edges4 = [[0,1]];
console.log("Graph 4 (single edge):", isCyclic(edges4, 2));  // false

// === Union-Find Cycle Detection ===
// Graph 1 (0-1-2-0): true
// Graph 2 (0-1-2-3): false
// Graph 3 (complex): true
// Graph 4 (single edge): false

/*
🔧 Algorithm Explanation:
1. Initialize each node as its own parent (separate set)
2. For each edge (u,v):
   - Find root parent of u and v
   - If they have same root → already connected → cycle detected
   - If different roots → union them (connect the sets)

📊 Time Complexity: O(E × α(V)) where α is inverse Ackermann function
💾 Space Complexity: O(V) for parent array

🌟 Real-World Applications:

1. NETWORK TOPOLOGY:
   - Detecting loops in computer networks
   - Preventing broadcast storms in switches
   - Network redundancy planning

2. SOCIAL NETWORKS:
   - Finding circular friendships
   - Detecting fake account rings
   - Community detection algorithms

3. TRANSPORTATION:
   - Railway/road network planning
   - Detecting circular routes
   - Traffic flow optimization

4. FINANCIAL SYSTEMS:
   - Detecting circular transactions (money laundering)
   - Credit risk assessment
   - Trade settlement cycles

5. GAME DEVELOPMENT:
   - Pathfinding optimizations
   - Map connectivity validation
   - Resource dependency checking

6. BIOLOGY/GENETICS:
   - Protein interaction networks
   - Gene regulatory circuits
   - Evolutionary tree construction

✅ Why Union-Find is Perfect Here:
- Fast cycle detection without DFS/BFS
- Efficient for sparse graphs
- Can handle dynamic edge additions
- Memory efficient for large graphs
*/