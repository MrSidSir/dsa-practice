// 🔧 KRUSKAL'S MINIMUM SPANNING TREE ALGORITHM
// Problem: Find MST using Kruskal's algorithm with Disjoint Set Union (DSU)

// 📚 DISJOINT SET UNION (DSU) Implementation
class DSU {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.rank = new Array(n).fill(0);
    }
    
    // Find with path compression
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    
    // Union by rank - returns true if union successful (no cycle)
    union(x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);
        
        if (rootX === rootY) return false; // Cycle detected
        
        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
        return true;
    }
}

// 🔧 KRUSKAL'S ALGORITHM
function kruskal(n, edges) {
    // Step 1: Sort edges by weight (ascending)
    edges.sort((a, b) => a[2] - b[2]);
    
    // Step 2: Initialize DSU and MST
    let dsu = new DSU(n);
    let mst = [];
    let totalWeight = 0;
    
    // Step 3: Process edges in sorted order
    for (let [u, v, weight] of edges) {
        // If union successful (no cycle), add edge to MST
        if (dsu.union(u, v)) {
            mst.push([u, v, weight]);
            totalWeight += weight;
            
            // Stop when we have n-1 edges (complete MST)
            if (mst.length === n - 1) break;
        }
    }
    
    return { mst, totalWeight };
}

// 🔧 WORKFLOW DEMONSTRATION
function demonstrateWorkflow() {
    console.log("=== KRUSKAL'S MST ALGORITHM WORKFLOW ===\n");
    
    let edges = [[0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]];
    let n = 4;
    
    console.log("📊 INPUT GRAPH:");
    console.log("Vertices: 0, 1, 2, 3");
    console.log("Edges: [u, v, weight]");
    edges.forEach(([u, v, w]) => {
        console.log(`  ${u} ↔ ${v}: ${w}`);
    });
    
    console.log("\n🔄 STEP-BY-STEP EXECUTION:");
    
    // Step 1: Sort edges
    let sortedEdges = [...edges].sort((a, b) => a[2] - b[2]);
    console.log("1. Sort edges by weight:");
    sortedEdges.forEach(([u, v, w]) => {
        console.log(`   ${u} ↔ ${v}: ${w}`);
    });
    
    // Step 2: Process each edge
    console.log("\n2. Process edges (check for cycles using DSU):");
    let dsu = new DSU(n);
    let mst = [];
    let step = 1;
    
    for (let [u, v, weight] of sortedEdges) {
        let rootU = dsu.find(u);
        let rootV = dsu.find(v);
        
        if (rootU !== rootV) {
            dsu.union(u, v);
            mst.push([u, v, weight]);
            console.log(`   Step ${step}: Add edge ${u} ↔ ${v} (weight: ${weight}) ✅`);
        } else {
            console.log(`   Step ${step}: Skip edge ${u} ↔ ${v} (weight: ${weight}) - Creates cycle ❌`);
        }
        step++;
    }
    
    console.log("\n✅ FINAL MST:");
    let totalWeight = 0;
    mst.forEach(([u, v, w]) => {
        console.log(`   ${u} ↔ ${v}: ${w}`);
        totalWeight += w;
    });
    console.log(`\n📈 Total MST Weight: ${totalWeight}`);
    
    return { mst, totalWeight };
}

// 🔧 Test the algorithm
console.log("=== TESTING KRUSKAL'S ALGORITHM ===");
let edges = [[0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]];
let result = kruskal(4, edges);
console.log("MST:", result.mst);
console.log("Total Weight:", result.totalWeight);

console.log("\n");
demonstrateWorkflow();

// 🌍 REAL-WORLD APPLICATIONS
console.log("\n=== REAL-WORLD APPLICATIONS ===");

// 1. Network Design Example
function networkDesign() {
    console.log("\n🔗 1. NETWORK DESIGN (Internet/Telecom):");
    
    // Cities and connection costs
    let cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'];
    let connections = [
        [0, 1, 1200], // Delhi-Mumbai: ₹1200 cr
        [0, 2, 800],  // Delhi-Bangalore: ₹800 cr
        [0, 3, 1000], // Delhi-Chennai: ₹1000 cr
        [0, 4, 900],  // Delhi-Kolkata: ₹900 cr
        [1, 2, 600],  // Mumbai-Bangalore: ₹600 cr
        [1, 3, 700],  // Mumbai-Chennai: ₹700 cr
        [2, 3, 300],  // Bangalore-Chennai: ₹300 cr
        [3, 4, 500]   // Chennai-Kolkata: ₹500 cr
    ];
    
    let networkMST = kruskal(5, connections);
    console.log("Minimum cost to connect all cities:");
    networkMST.mst.forEach(([u, v, cost]) => {
        console.log(`  ${cities[u]} ↔ ${cities[v]}: ₹${cost} crores`);
    });
    console.log(`Total Cost: ₹${networkMST.totalWeight} crores`);
}

// 2. Circuit Design Example
function circuitDesign() {
    console.log("\n⚡ 2. CIRCUIT DESIGN (PCB Layout):");
    
    let components = ['CPU', 'RAM', 'GPU', 'Storage', 'PSU'];
    let wireConnections = [
        [0, 1, 2],  // CPU-RAM: 2mm wire
        [0, 2, 5],  // CPU-GPU: 5mm wire
        [0, 4, 8],  // CPU-PSU: 8mm wire
        [1, 2, 3],  // RAM-GPU: 3mm wire
        [1, 3, 4],  // RAM-Storage: 4mm wire
        [2, 3, 6],  // GPU-Storage: 6mm wire
        [3, 4, 7]   // Storage-PSU: 7mm wire
    ];
    
    let circuitMST = kruskal(5, wireConnections);
    console.log("Minimum wire length for PCB:");
    circuitMST.mst.forEach(([u, v, length]) => {
        console.log(`  ${components[u]} ↔ ${components[v]}: ${length}mm`);
    });
    console.log(`Total Wire Length: ${circuitMST.totalWeight}mm`);
}

// 3. Transportation Network
function transportation() {
    console.log("\n🚗 3. TRANSPORTATION NETWORK (Road Construction):");
    
    let locations = ['Hospital', 'School', 'Market', 'Park', 'Station'];
    let roadCosts = [
        [0, 1, 50],  // Hospital-School: ₹50L
        [0, 2, 30],  // Hospital-Market: ₹30L
        [0, 3, 40],  // Hospital-Park: ₹40L
        [1, 2, 20],  // School-Market: ₹20L
        [1, 4, 60],  // School-Station: ₹60L
        [2, 3, 15],  // Market-Park: ₹15L
        [2, 4, 35],  // Market-Station: ₹35L
        [3, 4, 25]   // Park-Station: ₹25L
    ];
    
    let roadMST = kruskal(5, roadCosts);
    console.log("Minimum cost road network:");
    roadMST.mst.forEach(([u, v, cost]) => {
        console.log(`  ${locations[u]} ↔ ${locations[v]}: ₹${cost} lakhs`);
    });
    console.log(`Total Construction Cost: ₹${roadMST.totalWeight} lakhs`);
}

// Run real-world examples
networkDesign();
circuitDesign();
transportation();

// 📊 ALGORITHM COMPLEXITY
console.log("\n=== ALGORITHM COMPLEXITY ===");
console.log("Time Complexity: O(E log E) - dominated by sorting");
console.log("Space Complexity: O(V) - for DSU data structure");
console.log("Where E = number of edges, V = number of vertices");

// 🎯 KEY ADVANTAGES
console.log("\n=== KEY ADVANTAGES ===");
console.log("✅ Greedy approach - always picks globally optimal choice");
console.log("✅ Works for sparse graphs (few edges)");
console.log("✅ Simple to implement and understand");
console.log("✅ Guaranteed to find MST if graph is connected");
console.log("✅ Uses efficient DSU for cycle detection");

// === DSU Algorithm Demo ===

// 1. Basic Operations:
// Initial components: 5
// After union(0,1) - components: 4
// find(0): 0 find(1): 0
// After union(1,2) - components: 3
// find(2): 0
// Connected(0,2): true
// Connected(0,3): false
// Component of 0: [ 0, 1, 2 ]

// 2. Network Connectivity Example:
// Initial networks: 6
// After connections - networks: 3
// Can computer 0 reach computer 2? true
// Can computer 0 reach computer 3? false
// After bridging - networks: 2
// Now can computer 0 reach computer 4? true

// 3. Social Network Groups:
// Friend groups formed: 4
// Alice's friend group: [ 'Alice', 'Bob', 'Charlie' ]
// Are Alice and Charlie connected? true
// Are Alice and David connected? false
// After introduction - groups: 3
// Now are Alice and Eve connected? true

// 4. Performance with Path Compression:
// All elements connected to 0: true
// Components after chain: 1
// Root of 500: 0
// Root of 999: 0
// Root of 999: 0
// PS C:\Users\irsha\OneDrive\Desktop\dsa> node Day10+/13KruskalMST.js
// === TESTING KRUSKAL'S ALGORITHM ===
// MST: [ [ 2, 3, 4 ], [ 0, 3, 5 ], [ 0, 1, 10 ] ]
// Total Weight: 19


// === KRUSKAL'S MST ALGORITHM WORKFLOW ===

// 📊 INPUT GRAPH:
// Vertices: 0, 1, 2, 3
// Edges: [u, v, weight]
//   0 ↔ 1: 10
//   0 ↔ 2: 6
//   0 ↔ 3: 5
//   1 ↔ 3: 15
//   2 ↔ 3: 4

// 🔄 STEP-BY-STEP EXECUTION:
// 1. Sort edges by weight:
//    2 ↔ 3: 4
//    0 ↔ 3: 5
//    0 ↔ 2: 6
//    0 ↔ 1: 10
//    1 ↔ 3: 15

// 2. Process edges (check for cycles using DSU):
//    Step 1: Add edge 2 ↔ 3 (weight: 4) ✅
//    Step 2: Add edge 0 ↔ 3 (weight: 5) ✅
//    Step 3: Skip edge 0 ↔ 2 (weight: 6) - Creates cycle ❌
//    Step 4: Add edge 0 ↔ 1 (weight: 10) ✅
//    Step 5: Skip edge 1 ↔ 3 (weight: 15) - Creates cycle ❌

// ✅ FINAL MST:
//    2 ↔ 3: 4
//    0 ↔ 3: 5
//    0 ↔ 1: 10

// 📈 Total MST Weight: 19

// === REAL-WORLD APPLICATIONS ===

// 🔗 1. NETWORK DESIGN (Internet/Telecom):
// Minimum cost to connect all cities:
//   Bangalore ↔ Chennai: ₹300 crores
//   Chennai ↔ Kolkata: ₹500 crores
//   Mumbai ↔ Bangalore: ₹600 crores
//   Delhi ↔ Bangalore: ₹800 crores
// Total Cost: ₹2200 crores

// ⚡ 2. CIRCUIT DESIGN (PCB Layout):
// Minimum wire length for PCB:
//   CPU ↔ RAM: 2mm
//   RAM ↔ GPU: 3mm
//   RAM ↔ Storage: 4mm
//   Storage ↔ PSU: 7mm
// Total Wire Length: 16mm

// 🚗 3. TRANSPORTATION NETWORK (Road Construction):
// Minimum cost road network:
//   Market ↔ Park: ₹15 lakhs
//   School ↔ Market: ₹20 lakhs
//   Park ↔ Station: ₹25 lakhs
//   Hospital ↔ Market: ₹30 lakhs
// Total Construction Cost: ₹90 lakhs

// === ALGORITHM COMPLEXITY ===
// Time Complexity: O(E log E) - dominated by sorting
// Space Complexity: O(V) - for DSU data structure
// Where E = number of edges, V = number of vertices

// === KEY ADVANTAGES ===
// ✅ Greedy approach - always picks globally optimal choice
// ✅ Works for sparse graphs (few edges)
// ✅ Simple to implement and understand
// ✅ Guaranteed to find MST if graph is connected
// ✅ Uses efficient DSU for cycle detection