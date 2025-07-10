// 🔧 [Q9] Count Connected Components in Undirected Graph

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

/* 
🎯 Problem: Count number of connected components in undirected graph
📝 Key Concept: DFS traversal to mark visited nodes and count separate groups

💡 Real-World Applications:
1. Social Networks - Find friend groups/communities
2. Network Analysis - Identify isolated subnetworks
3. Image Processing - Count separate objects in image
4. Geography - Count isolated islands
5. Computer Networks - Find disconnected network segments
*/

function countComponents(n, edges) {
    // 📊 Step 1: Build adjacency list representation of graph
    let adj = {};
    
    // Initialize empty adjacency list for each node
    for (let i = 0; i < n; i++) {
        adj[i] = []; // har node ke liye empty array banao
    }
    
    // Add edges to adjacency list (undirected graph)
    for (let [u, v] of edges) {
        adj[u].push(v); // u se v ka connection
        adj[v].push(u); // v se u ka connection (undirected hai)
    }
    
    // 🔍 Step 2: Track visited nodes and component count
    let visited = new Set(); // visited nodes track karne ke liye
    let count = 0; // connected components ki count
    
    // 🚀 Step 3: DFS function to traverse connected nodes
    function dfs(node) {
        visited.add(node); // current node ko visited mark karo
        
        // Sabhi neighbors ko visit karo
        for (let neighbor of adj[node]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor); // recursive call for unvisited neighbors
            }
        }
    }
    
    // 🔄 Step 4: Main loop to find all components
    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) {
            // Agar node unvisited hai, toh naya component mila
            dfs(i); // Complete component ko traverse karo
            count++; // Component count increase karo
        }
    }
    
    return count; // Total connected components return karo
}

// 🧪 Test Cases with different scenarios
console.log("=== Connected Components Test Cases ===");

// Test Case 1: Basic example
console.log("Test 1 - Basic:", countComponents(5, [[0,1], [1,2], [3,4]]));
// Expected Output: 2
// Explanation: {0,1,2} aur {3,4} - 2 separate components, node 4 isolated

// Test Case 2: All nodes connected
console.log("Test 2 - All Connected:", countComponents(4, [[0,1], [1,2], [2,3]]));
// Expected Output: 1
// Explanation: Sabhi nodes ek hi component mein connected hai

// Test Case 3: No edges (all isolated)
console.log("Test 3 - No Edges:", countComponents(3, []));
// Expected Output: 3
// Explanation: Har node apna alag component hai

// Test Case 4: Complex graph
console.log("Test 4 - Complex:", countComponents(6, [[0,1], [2,3], [4,5]]));
// Expected Output: 3
// Explanation: Teen separate pairs: {0,1}, {2,3}, {4,5}

// Test Case 5: Single node
console.log("Test 5 - Single Node:", countComponents(1, []));
// Expected Output: 1
// Explanation: Ek hi node hai, toh ek component

/* 
🌟 Real-World Implementation Examples:

1. 📱 Social Media Friend Groups:
   - Nodes = Users, Edges = Friendships
   - Components = Separate friend circles
   
2. 🌐 Network Infrastructure:
   - Nodes = Computers, Edges = Network connections
   - Components = Isolated network segments
   
3. 🗺️ Geographic Islands:
   - Nodes = Land pieces, Edges = Bridges/connections
   - Components = Separate island groups
   
4. 🧬 Protein Interaction Networks:
   - Nodes = Proteins, Edges = Interactions
   - Components = Functional protein complexes
*/

// 🎯 Advanced Usage Example: Social Network Analysis
function analyzeSocialNetwork(users, friendships) {
    const components = countComponents(users.length, friendships);
    
    console.log(`\n📊 Social Network Analysis:`);
    console.log(`Total Users: ${users.length}`);
    console.log(`Friendships: ${friendships.length}`);
    console.log(`Separate Friend Groups: ${components}`);
    
    if (components === 1) {
        console.log("✅ All users are connected in one big network!");
    } else {
        console.log(`⚠️  Network has ${components} isolated groups`);
    }
}

// Example social network
const users = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
const friendships = [[0,1], [1,2], [3,4]]; // Alice-Bob-Charlie, David-Eve
analyzeSocialNetwork(users, friendships);

// === Connected Components Test Cases ===
// Test 1 - Basic: 2
// Test 2 - All Connected: 1
// Test 3 - No Edges: 3
// Test 4 - Complex: 3
// Test 5 - Single Node: 1

// 📊 Social Network Analysis:
// Total Users: 5
// Friendships: 3
// Separate Friend Groups: 2
// ⚠️  Network has 2 isolated groups

/* 
⚡ Time Complexity: O(V + E) where V = vertices, E = edges
💾 Space Complexity: O(V) for adjacency list and visited set

🔧 Algorithm Steps:
1. Build adjacency list from edges
2. Initialize visited set and counter
3. For each unvisited node, run DFS
4. DFS marks all connected nodes as visited
5. Increment counter for each DFS call
6. Return total count
*/