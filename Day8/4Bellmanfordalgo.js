// TreeNode class
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

/* 🔧 Problem: Shortest path with negative weights (no negative cycle) 
   📝 Key Point: Relax edges V-1 times */

function bellmanFord(edges, V, start) {
    // Step 1: Initialize distances
    let dist = Array(V).fill(Infinity);
    dist[start] = 0;
    
    console.log(`=== BELLMAN-FORD ALGORITHM TRACE ===`);
    console.log(`Starting from node ${start}`);
    console.log(`Initial distances:`, dist);
    
    // Step 2: Relax edges V-1 times (V=4, so 3 iterations)
    for (let i = 0; i < V - 1; i++) {
        console.log(`\n--- Iteration ${i + 1} ---`);
        let updated = false;
        
        for (let [u, v, w] of edges) {
            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                console.log(`Relaxing edge ${u} → ${v} (weight ${w})`);
                console.log(`  Old distance to ${v}: ${dist[v] === Infinity ? '∞' : dist[v]}`);
                console.log(`  New distance to ${v}: ${dist[u]} + ${w} = ${dist[u] + w}`);
                dist[v] = dist[u] + w;
                updated = true;
            }
        }
        
        console.log(`After iteration ${i + 1}:`, dist);
        
        // Early termination if no updates
        if (!updated) {
            console.log(`No more updates possible. Terminating early.`);
            break;
        }
    }
    
    // Step 3: Check for negative cycles
    console.log(`\n--- Checking for Negative Cycles ---`);
    for (let [u, v, w] of edges) {
        if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
            console.log("❌ Negative Cycle Detected!");
            return null;
        }
    }
    
    console.log("✅ No negative cycles found");
    return dist;
}

// Test with the given data
let edges = [
    [0, 1, 4],   // 0 → 1 (weight 4)
    [0, 2, 5],   // 0 → 2 (weight 5)
    [1, 2, -3],  // 1 → 2 (weight -3)
    [2, 3, 4],   // 2 → 3 (weight 4)
    [3, 1, -10]  // 3 → 1 (weight -10)
];

console.log("Graph representation:");
console.log("0 → 1 (4), 0 → 2 (5)");
console.log("1 → 2 (-3)");
console.log("2 → 3 (4)");
console.log("3 → 1 (-10)");
console.log("\nEdges array:", edges);

let result = bellmanFord(edges, 4, 0);
console.log("\n=== FINAL RESULT ===");
console.log("Q4 Bellman-Ford Output:", result);

// Manual verification of paths
console.log("\n=== PATH VERIFICATION ===");
if (result) {
    console.log(`Distance from 0 to 0: ${result[0]}`);
    console.log(`Distance from 0 to 1: ${result[1]} (path: 0→2→3→1 = 5+4+(-10) = -1)`);
    console.log(`Distance from 0 to 2: ${result[2]} (path: 0→1→2 = 4+(-3) = 1)`);
    console.log(`Distance from 0 to 3: ${result[3]} (path: 0→1→2→3 = 4+(-3)+4 = 5)`);
}

/* 💡 ALGORITHM EXPLANATION:
1. Initialize: Set distance to start = 0, all others = ∞
2. Relax V-1 times: For each edge (u,v,w), if dist[u] + w < dist[v], update dist[v]
3. Check negative cycles: If any edge can still be relaxed, negative cycle exists

Why V-1 iterations?
- In worst case, shortest path can have at most V-1 edges
- Each iteration guarantees at least one more node gets optimal distance
- After V-1 iterations, if graph has no negative cycles, all distances are optimal

✅ Real uses: 
- Currency arbitrage detection
- Routing protocols (RIP)
- Network optimization with negative weights
*/

// Test with negative cycle
console.log("\n=== TESTING WITH NEGATIVE CYCLE ===");
let negCycleEdges = [
    [0, 1, 1],
    [1, 2, -3],
    [2, 1, -1]  // Creates negative cycle: 1→2→1 = -3 + (-1) = -4
];

console.log("Testing negative cycle detection:");
bellmanFord(negCycleEdges, 3, 0);


// Graph representation:
// 0 → 1 (4), 0 → 2 (5)
// 1 → 2 (-3)
// 2 → 3 (4)
// 3 → 1 (-10)

// Edges array: [ [ 0, 1, 4 ], [ 0, 2, 5 ], [ 1, 2, -3 ], [ 2, 3, 4 ], [ 3, 1, -10 ] ]
// === BELLMAN-FORD ALGORITHM TRACE ===
// Starting from node 0
// Initial distances: [ 0, Infinity, Infinity, Infinity ]

// --- Iteration 1 ---
// Relaxing edge 0 → 1 (weight 4)
//   Old distance to 1: ∞
//   New distance to 1: 0 + 4 = 4
// Relaxing edge 0 → 2 (weight 5)
//   Old distance to 2: ∞
//   New distance to 2: 0 + 5 = 5
// Relaxing edge 1 → 2 (weight -3)
//   Old distance to 2: 5
//   New distance to 2: 4 + -3 = 1
// Relaxing edge 2 → 3 (weight 4)
//   Old distance to 3: ∞
//   New distance to 3: 1 + 4 = 5
// Relaxing edge 3 → 1 (weight -10)
//   Old distance to 1: 4
//   New distance to 1: 5 + -10 = -5
// After iteration 1: [ 0, -5, 1, 5 ]

// --- Iteration 2 ---
// Relaxing edge 1 → 2 (weight -3)
//   Old distance to 2: 1
//   New distance to 2: -5 + -3 = -8
// Relaxing edge 2 → 3 (weight 4)
//   Old distance to 3: 5
//   New distance to 3: -8 + 4 = -4
// Relaxing edge 3 → 1 (weight -10)
//   Old distance to 1: -5
//   New distance to 1: -4 + -10 = -14
// After iteration 2: [ 0, -14, -8, -4 ]

// --- Iteration 3 ---
// Relaxing edge 1 → 2 (weight -3)
//   Old distance to 2: -8
//   New distance to 2: -14 + -3 = -17
// Relaxing edge 2 → 3 (weight 4)
//   Old distance to 3: -4
//   New distance to 3: -17 + 4 = -13
// Relaxing edge 3 → 1 (weight -10)
//   Old distance to 1: -14
//   New distance to 1: -13 + -10 = -23
// After iteration 3: [ 0, -23, -17, -13 ]

// --- Checking for Negative Cycles ---
// ❌ Negative Cycle Detected!

// === FINAL RESULT ===
// Q4 Bellman-Ford Output: null

// === PATH VERIFICATION ===

// === TESTING WITH NEGATIVE CYCLE ===
// Testing negative cycle detection:
// === BELLMAN-FORD ALGORITHM TRACE ===
// Starting from node 0
// Initial distances: [ 0, Infinity, Infinity ]

// --- Iteration 1 ---
// Relaxing edge 0 → 1 (weight 1)
//   Old distance to 1: ∞
//   New distance to 1: 0 + 1 = 1
// Relaxing edge 1 → 2 (weight -3)
//   Old distance to 2: ∞
//   New distance to 2: 1 + -3 = -2
// Relaxing edge 2 → 1 (weight -1)
//   Old distance to 1: 1
//   New distance to 1: -2 + -1 = -3
// After iteration 1: [ 0, -3, -2 ]

// --- Iteration 2 ---
// Relaxing edge 1 → 2 (weight -3)
//   Old distance to 2: -2
//   New distance to 2: -3 + -3 = -6
// Relaxing edge 2 → 1 (weight -1)
//   Old distance to 1: -3
//   New distance to 1: -6 + -1 = -7
// After iteration 2: [ 0, -7, -6 ]

// --- Checking for Negative Cycles ---
// ❌ Negative Cycle Detected!