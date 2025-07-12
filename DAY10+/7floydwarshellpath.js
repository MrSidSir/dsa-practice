// Floyd-Warshall Path Reconstruction Algorithm
// Real-world: GPS navigation, network routing, supply chain optimization

function floydWarshallPath(graph, n) {
    // Step 1: Initialize distance matrix (copy of original graph)
    // Real-world: Store initial direct distances between cities/nodes
    let dist = Array.from({length: n}, (_,i) => graph[i].slice());
    
    // Step 2: Initialize next matrix for path reconstruction
    // Real-world: Track next hop in optimal route (like GPS waypoints)
    let next = Array.from({length: n}, () => Array(n).fill(null));

    // Step 3: Set up direct connections in next matrix
    // Real-world: Mark direct routes available (direct flights, roads)
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (graph[i][j] != Infinity) {
                next[i][j] = j; // Direct connection exists
            }
        }
    }

    // Step 4: Main Floyd-Warshall algorithm - try all intermediate nodes
    // Real-world: Check if going through intermediate cities is faster
    for (let k = 0; k < n; k++) {        // k = intermediate node (transfer point)
        for (let i = 0; i < n; i++) {    // i = source node
            for (let j = 0; j < n; j++) { // j = destination node
                
                // Step 5: Check if path via k is shorter
                // Real-world: Is route via transfer city k faster than direct?
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    // BUG FIX: Update distance correctly
                    dist[i][j] = dist[i][k] + dist[k][j]; // Not dist[i][j] + dist[k][j]
                    
                    // Step 6: Update next hop for path reconstruction
                    // Real-world: Update GPS to route via intermediate point
                    next[i][j] = next[i][k];
                }
            }
        }
    }

    // Step 7: Path reconstruction function
    // Real-world: Generate turn-by-turn directions from routing table
    function constructPath(u, v) {
        if (next[u][v] === null) return []; // No path exists
        
        let path = [u]; // Start with source
        
        // Follow the next hops until destination
        // Real-world: Follow GPS directions hop by hop
        while (u !== v) {
            u = next[u][v]; // Move to next waypoint
            path.push(u);   // Add to route
        }
        return path;
    }

    return {dist, constructPath};
}

// Test with corrected graph (5x5 matrix for 5 nodes)
let graph7 = [
    [0, 3, Infinity, 7, Infinity],     // Node 0 connections
    [8, 0, 2, Infinity, Infinity],     // Node 1 connections  
    [5, Infinity, 0, 1, Infinity],     // Node 2 connections
    [2, Infinity, Infinity, 0, 1],     // Node 3 connections
    [2, Infinity, Infinity, Infinity, 0] // Node 4 connections
];

let res7 = floydWarshallPath(graph7, 5);
console.log("Floyd-Warshall distances:", res7.dist);
console.log("Path 0->3:", res7.constructPath(0, 3));
console.log("Path 0->4:", res7.constructPath(0, 4));
console.log("Path 1->4:", res7.constructPath(1, 4));

// Floyd-Warshall distances: [
//   [ 0, 3, 5, 6, 7 ],
//   [ 5, 0, 2, 3, 4 ],
//   [ 3, 6, 0, 1, 2 ],
//   [ 2, 5, 7, 0, 1 ],
//   [ 2, 5, 7, 8, 0 ]
// ]
// Path 0->3: [ 0, 1, 2, 3 ]
// Path 0->4: [ 0, 1, 2, 3, 4 ]
// Path 1->4: [ 1, 2, 3, 4 ]


/* 
REAL-WORLD WORKFLOW APPLICATIONS:

1. GPS Navigation Systems:
   - dist[i][j] = shortest travel time between cities i and j
   - next[i][j] = next city to visit when going from i to j
   - constructPath() = turn-by-turn directions

2. Network Routing (Internet):
   - dist[i][j] = minimum latency between routers i and j
   - next[i][j] = next router to forward packets to
   - constructPath() = packet routing path

3. Supply Chain Optimization:
   - dist[i][j] = minimum cost to transport goods from warehouse i to j
   - next[i][j] = next distribution center in optimal route
   - constructPath() = complete delivery route

4. Social Network Analysis:
   - dist[i][j] = degrees of separation between person i and j
   - next[i][j] = next person in shortest connection path
   - constructPath() = how two people are connected

5. Game Development (Pathfinding):
   - dist[i][j] = shortest distance between game locations
   - next[i][j] = next waypoint for NPC movement
   - constructPath() = NPC movement path

6. Financial Trading:
   - dist[i][j] = best exchange rate from currency i to j
   - next[i][j] = next currency in optimal conversion sequence
   - constructPath() = currency arbitrage path

Time Complexity: O(n³) - checks all possible intermediate nodes
Space Complexity: O(n²) - stores distance and next matrices
*/