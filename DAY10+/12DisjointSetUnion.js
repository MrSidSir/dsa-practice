// 🔧 Disjoint Set Union (Union-Find) with Path Compression
/* 
📝 Key Concepts:
- Path Compression: Flattens tree structure during find operations
- Union by Rank: Attaches smaller tree under root of larger tree
- Amortized Time Complexity: Nearly O(1) for both operations
*/

class DSU {
    constructor(n) {
        // Initialize parent array - each element is its own parent initially
        this.parent = Array(n).fill(0).map((_, i) => i);
        // Rank array to keep track of tree depth for union by rank
        this.rank = Array(n).fill(0);
        this.components = n; // Track number of connected components
    }
    
    // Find operation with path compression
    find(x) {
        // If x is not its own parent, recursively find the root
        if (this.parent[x] !== x) {
            // Path compression: make parent[x] point directly to root
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    
    // Union operation with union by rank
    union(x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);
        
        // If already in same set, no union needed
        if (rootX === rootY) return false;
        
        // Union by rank: attach smaller tree under root of larger tree
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            // Same rank: make one root and increment its rank
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }
        
        this.components--; // Decrease component count
        return true;
    }
    
    // Check if two elements are in same set
    connected(x, y) {
        return this.find(x) === this.find(y);
    }
    
    // Get number of connected components
    getComponents() {
        return this.components;
    }
    
    // Get all elements in same component as x
    getComponent(x) {
        const root = this.find(x);
        const component = [];
        for (let i = 0; i < this.parent.length; i++) {
            if (this.find(i) === root) {
                component.push(i);
            }
        }
        return component;
    }
}

// 🔧 Comprehensive Testing
console.log("=== DSU Algorithm Demo ===\n");

// Test 1: Basic Union-Find Operations
console.log("1. Basic Operations:");
let dsu = new DSU(5);
console.log("Initial components:", dsu.getComponents()); // 5

dsu.union(0, 1);
console.log("After union(0,1) - components:", dsu.getComponents()); // 4
console.log("find(0):", dsu.find(0), "find(1):", dsu.find(1)); // Same root

dsu.union(1, 2);
console.log("After union(1,2) - components:", dsu.getComponents()); // 3
console.log("find(2):", dsu.find(2)); // Same root as 0,1

console.log("Connected(0,2):", dsu.connected(0, 2)); // true
console.log("Connected(0,3):", dsu.connected(0, 3)); // false

console.log("Component of 0:", dsu.getComponent(0)); // [0,1,2]
console.log();

// Test 2: Network Connectivity Simulation
console.log("2. Network Connectivity Example:");
let network = new DSU(6); // 6 computers
console.log("Initial networks:", network.getComponents());

// Connect computers
network.union(0, 1); // Computer 0 connects to 1
network.union(1, 2); // Computer 1 connects to 2
network.union(3, 4); // Computer 3 connects to 4

console.log("After connections - networks:", network.getComponents()); // 3 networks
console.log("Can computer 0 reach computer 2?", network.connected(0, 2)); // true
console.log("Can computer 0 reach computer 3?", network.connected(0, 3)); // false

// Bridge two networks
network.union(2, 3);
console.log("After bridging - networks:", network.getComponents()); // 2 networks
console.log("Now can computer 0 reach computer 4?", network.connected(0, 4)); // true
console.log();

// Test 3: Social Network Groups
console.log("3. Social Network Groups:");
let social = new DSU(8); // 8 people
const people = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Henry"];

// Form friend groups
social.union(0, 1); // Alice-Bob
social.union(1, 2); // Bob-Charlie
social.union(3, 4); // David-Eve
social.union(5, 6); // Frank-Grace

console.log("Friend groups formed:", social.getComponents());
console.log("Alice's friend group:", social.getComponent(0).map(i => people[i]));
console.log("Are Alice and Charlie connected?", social.connected(0, 2)); // true
console.log("Are Alice and David connected?", social.connected(0, 3)); // false

// Someone introduces groups
social.union(2, 3); // Charlie introduces Alice's group to David's group
console.log("After introduction - groups:", social.getComponents());
console.log("Now are Alice and Eve connected?", social.connected(0, 4)); // true
console.log();

// Test 4: Performance Demonstration
console.log("4. Performance with Path Compression:");
let perfTest = new DSU(1000);

// Create a long chain without path compression would be slow
for (let i = 0; i < 999; i++) {
    perfTest.union(i, i + 1);
}

console.log("All elements connected to 0:", perfTest.connected(0, 999)); // true
console.log("Components after chain:", perfTest.getComponents()); // 1

// Path compression makes subsequent finds very fast
console.log("Root of 500:", perfTest.find(500)); // Same as root of 0
console.log("Root of 999:", perfTest.find(999)); // Same as root of 0


// output:-=== DSU Algorithm Demo ===

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