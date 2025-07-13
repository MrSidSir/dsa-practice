// ========================================
// PRIM'S MINIMUM SPANNING TREE (MST) ALGORITHM
// ========================================

class MinHeap {
    constructor() {
        this.heap = [];
    }
    
    // Get parent index
    parent(i) {
        return Math.floor((i - 1) / 2);
    }
    
    // Get left child index
    leftChild(i) {
        return 2 * i + 1;
    }
    
    // Get right child index
    rightChild(i) {
        return 2 * i + 2;
    }
    
    // Swap two elements
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    
    // Insert element
    insert(element) {
        this.heap.push(element);
        this.heapifyUp(this.heap.length - 1);
    }
    
    // Heapify up (bubble up)
    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = this.parent(index);
            if (this.heap[parentIndex].weight <= this.heap[index].weight) {
                break;
            }
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }
    
    // Extract minimum
    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }
    
    // Heapify down (bubble down)
    heapifyDown(index) {
        while (this.leftChild(index) < this.heap.length) {
            let minIndex = this.leftChild(index);
            const rightIndex = this.rightChild(index);
            
            if (rightIndex < this.heap.length && 
                this.heap[rightIndex].weight < this.heap[minIndex].weight) {
                minIndex = rightIndex;
            }
            
            if (this.heap[index].weight <= this.heap[minIndex].weight) {
                break;
            }
            
            this.swap(index, minIndex);
            index = minIndex;
        }
    }
    
    // Check if heap is empty
    isEmpty() {
        return this.heap.length === 0;
    }
}

class PrimsMST {
    constructor(vertices) {
        this.V = vertices;
        this.graph = Array(vertices).fill(null).map(() => []);
    }
    
    // Add edge to graph
    addEdge(u, v, weight) {
        this.graph[u].push({ vertex: v, weight: weight });
        this.graph[v].push({ vertex: u, weight: weight });
    }
    
    // Prim's Algorithm Implementation
    primMST() {
        // Result array to store MST
        const mst = [];
        
        // Visited array to keep track of visited vertices
        const visited = new Array(this.V).fill(false);
        
        // MinHeap to store edges {vertex, weight, parent}
        const minHeap = new MinHeap();
        
        // Start with vertex 0
        minHeap.insert({ vertex: 0, weight: 0, parent: -1 });
        
        let totalWeight = 0;
        
        while (!minHeap.isEmpty()) {
            // Extract minimum weight edge
            const current = minHeap.extractMin();
            const { vertex, weight, parent } = current;
            
            // Skip if already visited
            if (visited[vertex]) continue;
            
            // Mark as visited
            visited[vertex] = true;
            
            // Add to MST (except for first vertex)
            if (parent !== -1) {
                mst.push({ from: parent, to: vertex, weight: weight });
                totalWeight += weight;
            }
            
            // Add all adjacent vertices to heap
            for (const neighbor of this.graph[vertex]) {
                if (!visited[neighbor.vertex]) {
                    minHeap.insert({
                        vertex: neighbor.vertex,
                        weight: neighbor.weight,
                        parent: vertex
                    });
                }
            }
        }
        
        return { mst, totalWeight };
    }
    
    // Display MST
    displayMST() {
        const result = this.primMST();
        console.log("=== PRIM'S MST RESULT ===");
        console.log("Edge \t Weight");
        
        result.mst.forEach(edge => {
            console.log(`${edge.from} - ${edge.to} \t ${edge.weight}`);
        });
        
        console.log(`Total Weight: ${result.totalWeight}`);
        return result;
    }
}

// ========================================
// TRAVELLING SALESMAN PROBLEM (TSP) - DP + BITMASK
// ========================================

class TSP {
    constructor(n, graph) {
        this.n = n;
        this.graph = graph;
        this.dp = {};
        this.INF = Number.MAX_SAFE_INTEGER;
    }
    
    // Main TSP solver using DP + Bitmask
    solveTSP() {
        // Clear memoization table
        this.dp = {};
        
        // Start from city 0 with only city 0 visited (mask = 1)
        const result = this.tspHelper(1, 0);
        
        return result === this.INF ? -1 : result;
    }
    
    // Recursive helper with memoization
    tspHelper(mask, pos) {
        // Base case: all cities visited
        if (mask === (1 << this.n) - 1) {
            // Return to starting city (city 0)
            return this.graph[pos][0] || this.INF;
        }
        
        // Check if already computed
        const key = `${mask}_${pos}`;
        if (this.dp[key] !== undefined) {
            return this.dp[key];
        }
        
        let minCost = this.INF;
        
        // Try visiting all unvisited cities
        for (let city = 0; city < this.n; city++) {
            // Check if city is not visited and there's a path
            if (!(mask & (1 << city)) && this.graph[pos][city] !== 0) {
                // Visit the city
                const newMask = mask | (1 << city);
                const cost = this.graph[pos][city] + this.tspHelper(newMask, city);
                minCost = Math.min(minCost, cost);
            }
        }
        
        // Memoize and return
        this.dp[key] = minCost;
        return minCost;
    }
    
    // Get the actual path (not just minimum cost)
    getTSPPath() {
        this.dp = {};
        const path = [0]; // Start from city 0
        const visited = 1; // Only city 0 visited initially
        
        this.buildPath(visited, 0, path);
        path.push(0); // Return to start
        
        return path;
    }
    
    // Build the actual path
    buildPath(mask, pos, path) {
        if (mask === (1 << this.n) - 1) {
            return;
        }
        
        let nextCity = -1;
        let minCost = this.INF;
        
        for (let city = 0; city < this.n; city++) {
            if (!(mask & (1 << city)) && this.graph[pos][city] !== 0) {
                const newMask = mask | (1 << city);
                const cost = this.graph[pos][city] + this.tspHelper(newMask, city);
                
                if (cost < minCost) {
                    minCost = cost;
                    nextCity = city;
                }
            }
        }
        
        if (nextCity !== -1) {
            path.push(nextCity);
            this.buildPath(mask | (1 << nextCity), nextCity, path);
        }
    }
}

// ========================================
// DEMO AND TESTING
// ========================================

function demonstratePrimsMST() {
    console.log("🔷 PRIM'S MST ALGORITHM DEMO");
    console.log("=====================================");
    
    // Create graph with 5 vertices
    const mst = new PrimsMST(5);
    
    // Add edges (u, v, weight)
    mst.addEdge(0, 1, 2);
    mst.addEdge(0, 3, 6);
    mst.addEdge(1, 2, 3);
    mst.addEdge(1, 3, 8);
    mst.addEdge(1, 4, 5);
    mst.addEdge(2, 4, 7);
    mst.addEdge(3, 4, 9);
    
    const result = mst.displayMST();
    
    console.log("\n🔄 WORKFLOW:");
    console.log("1. Start with any vertex (vertex 0)");
    console.log("2. Add all edges from current vertex to MinHeap");
    console.log("3. Extract minimum weight edge that connects to unvisited vertex");
    console.log("4. Mark vertex as visited and add to MST");
    console.log("5. Repeat until all vertices are visited");
    
    console.log("\n🌍 REAL-WORLD APPLICATIONS:");
    console.log("• Network Design: Minimum cost to connect all computers");
    console.log("• Transportation: Minimum road length to connect all cities");
    console.log("• Telecommunications: Optimal cable laying");
    console.log("• Circuit Design: Minimum wire length in PCB");
    console.log("• Cluster Analysis: Creating minimum spanning forest");
    
    return result;
}

function demonstrateTSP() {
    console.log("\n🔷 TRAVELLING SALESMAN PROBLEM DEMO");
    console.log("=====================================");
    
    // Distance matrix (0 means no direct path)
    const graph = [
        [0, 10, 15, 20],
        [10, 0, 35, 25],
        [15, 35, 0, 30],
        [20, 25, 30, 0]
    ];
    
    const tsp = new TSP(4, graph);
    
    const minCost = tsp.solveTSP();
    const path = tsp.getTSPPath();
    
    console.log("Distance Matrix:");
    console.log(graph);
    console.log(`\nMinimum Cost: ${minCost}`);
    console.log(`Optimal Path: ${path.join(' → ')}`);
    
    console.log("\n🔄 WORKFLOW:");
    console.log("1. Use bitmask to represent visited cities");
    console.log("2. dp[mask][i] = minimum cost to visit cities in mask, ending at city i");
    console.log("3. For each state, try visiting all unvisited cities");
    console.log("4. Base case: all cities visited, return to start");
    console.log("5. Use memoization to avoid recalculating same states");
    
    console.log("\n🌍 REAL-WORLD APPLICATIONS:");
    console.log("• Logistics: Optimal delivery routes");
    console.log("• Manufacturing: Tool path optimization in CNC machines");
    console.log("• DNA Sequencing: Shortest superstring problem");
    console.log("• Circuit Board: Drilling hole optimization");
    console.log("• Tourism: Planning optimal sightseeing routes");
    console.log("• Vehicle Routing: Fleet management and scheduling");
    
    return { minCost, path };
}

// ========================================
// COMPLEXITY ANALYSIS
// ========================================

function complexityAnalysis() {
    console.log("\n📊 COMPLEXITY ANALYSIS");
    console.log("=====================================");
    
    console.log("🔷 PRIM'S MST:");
    console.log("• Time Complexity: O(E log V) with MinHeap");
    console.log("• Space Complexity: O(V + E)");
    console.log("• E = number of edges, V = number of vertices");
    
    console.log("\n🔷 TSP (DP + Bitmask):");
    console.log("• Time Complexity: O(n² × 2ⁿ)");
    console.log("• Space Complexity: O(n × 2ⁿ)");
    console.log("• n = number of cities");
    console.log("• Exponential due to visiting all subsets of cities");
}

// ========================================
// RUN DEMONSTRATIONS
// ========================================

console.log("🚀 ALGORITHM DEMONSTRATIONS");
console.log("===========================================\n");

demonstratePrimsMST();
demonstrateTSP();
complexityAnalysis();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PrimsMST, TSP, MinHeap };
}

// 🚀 ALGORITHM DEMONSTRATIONS
// ===========================================

// 🔷 PRIM'S MST ALGORITHM DEMO
// =====================================
// === PRIM'S MST RESULT ===
// Edge     Weight
// 0 - 1    2
// 1 - 2    3
// 1 - 4    5
// 0 - 3    6
// Total Weight: 16

// 🔄 WORKFLOW:
// 1. Start with any vertex (vertex 0)
// 2. Add all edges from current vertex to MinHeap
// 3. Extract minimum weight edge that connects to unvisited vertex
// 4. Mark vertex as visited and add to MST
// 5. Repeat until all vertices are visited

// 🌍 REAL-WORLD APPLICATIONS:
// • Network Design: Minimum cost to connect all computers
// • Transportation: Minimum road length to connect all cities
// • Telecommunications: Optimal cable laying
// • Circuit Design: Minimum wire length in PCB
// • Cluster Analysis: Creating minimum spanning forest

// 🔷 TRAVELLING SALESMAN PROBLEM DEMO
// =====================================
// Distance Matrix:
// [
//   [ 0, 10, 15, 20 ],
//   [ 10, 0, 35, 25 ],
//   [ 15, 35, 0, 30 ],
//   [ 20, 25, 30, 0 ]
// ]

// Minimum Cost: 80
// Optimal Path: 0 → 1 → 3 → 2 → 0

// 🔄 WORKFLOW:
// 1. Use bitmask to represent visited cities
// 2. dp[mask][i] = minimum cost to visit cities in mask, ending at city i
// 3. For each state, try visiting all unvisited cities
// 4. Base case: all cities visited, return to start
// 5. Use memoization to avoid recalculating same states

// 🌍 REAL-WORLD APPLICATIONS:
// • Logistics: Optimal delivery routes
// • Manufacturing: Tool path optimization in CNC machines
// • DNA Sequencing: Shortest superstring problem
// • Circuit Board: Drilling hole optimization
// • Tourism: Planning optimal sightseeing routes
// • Vehicle Routing: Fleet management and scheduling

// 📊 COMPLEXITY ANALYSIS
// =====================================
// 🔷 PRIM'S MST:
// • Time Complexity: O(E log V) with MinHeap
// • Space Complexity: O(V + E)
// • E = number of edges, V = number of vertices

// 🔷 TSP (DP + Bitmask):
// • Time Complexity: O(n² × 2ⁿ)
// • Space Complexity: O(n × 2ⁿ)
// • n = number of cities
// • Exponential due to visiting all subsets of cities