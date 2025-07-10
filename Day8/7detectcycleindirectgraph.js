// ✅ [Q7] Detect cycle in directed graph (DFS back edge)
// ✅ [Q6] Topological Sort (DAG)

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

/* 
🔧 Problem: Detect cycle in directed graph
📝 Algorithm: DFS with Recursion Stack (White-Gray-Black coloring)
⚡ Time Complexity: O(V + E) where V = vertices, E = edges
🚀 Space Complexity: O(V) for visited set and recursion stack

🎯 WORKING PRINCIPLE:
- White nodes: Unvisited
- Gray nodes: Currently in recursion stack (being processed)
- Black nodes: Completely processed

🔍 CYCLE DETECTION LOGIC:
- If we encounter a GRAY node during DFS → Back edge found → Cycle exists
- If we encounter a BLACK node → Forward/Cross edge → No cycle
- If we encounter a WHITE node → Tree edge → Continue DFS

🌍 REAL-WORLD APPLICATIONS:
1. 📦 Package Dependency Resolution (npm, pip, maven)
2. 🏗️ Build System Dependencies (Makefile, Gradle)
3. 🎓 Course Prerequisites in Universities
4. 📋 Task Scheduling with Dependencies
5. 🔄 Circular Reference Detection in Memory Management
6. 🌐 Deadlock Detection in Operating Systems
7. 📊 Spreadsheet Formula Dependencies
*/

function hasCycle(graph) {
    let visited = new Set();    // 🖤 BLACK nodes: Completely processed
    let recStack = new Set();   // 🔘 GRAY nodes: Currently in recursion stack
    
    // 🔍 DFS function to detect back edge (cycle)
    function dfs(node) {
        // 🎯 STEP 1: Mark current node as visited and add to recursion stack
        visited.add(node);      // Mark as BLACK (visited)
        recStack.add(node);     // Mark as GRAY (in current path)
        
        // 🎯 STEP 2: Explore all neighbors
        for (let neighbor of graph[node]) {
            // Case 1: WHITE node (unvisited) - Continue DFS
            if (!visited.has(neighbor)) {
                if (dfs(neighbor)) return true;  // 🚨 Cycle found in subtree
            }
            // Case 2: GRAY node (in recursion stack) - BACK EDGE FOUND!
            else if (recStack.has(neighbor)) {
                return true;  // 🚨 CYCLE DETECTED!
            }
            // Case 3: BLACK node (visited but not in stack) - Safe, continue
        }
        
        // 🎯 STEP 3: Remove from recursion stack (backtrack)
        recStack.delete(node);  // Mark as BLACK only (no longer in current path)
        return false;           // No cycle found from this node
    }
    
    // 🎯 STEP 4: Check all components (handle disconnected graph)
    for (let node in graph) {
        if (!visited.has(node)) {  // 🔍 Unvisited component
            if (dfs(node)) return true;
        }
    }
    
    return false;  // ✅ No cycle found in entire graph
}

// 🧪 TEST CASES
console.log("=== CYCLE DETECTION TESTS ===");

// Test Case 1: Graph WITH cycle (A → B → C → A)
let cyclicGraph = {
    A: ["B"],
    B: ["C"],
    C: ["A"]  // 🔄 Back edge creating cycle
};
console.log("Test 1 - Cyclic Graph:", hasCycle(cyclicGraph));  // true

// Test Case 2: Graph WITHOUT cycle (DAG)
let acyclicGraph = {
    A: ["B", "C"],
    B: ["D"],
    C: ["D"],
    D: []
};
console.log("Test 2 - Acyclic Graph:", hasCycle(acyclicGraph));  // false

// Test Case 3: Self-loop
let selfLoopGraph = {
    A: ["A"],  // 🔄 Self-loop
    B: []
};
console.log("Test 3 - Self Loop:", hasCycle(selfLoopGraph));  // true

// Test Case 4: Complex graph with multiple paths
let complexGraph = {
    A: ["B", "C"],
    B: ["D"],
    C: ["D"],
    D: ["E"],
    E: ["F"],
    F: ["D"]  // 🔄 Cycle: D → E → F → D
};
console.log("Test 4 - Complex Cycle:", hasCycle(complexGraph));  // true

/* 
🌟 ALGORITHM VISUALIZATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For graph: A → B → C → A

DFS Traversal:
1. Start A: visited={A}, recStack={A}
2. Go to B: visited={A,B}, recStack={A,B}
3. Go to C: visited={A,B,C}, recStack={A,B,C}
4. Try to go to A: A is in recStack → BACK EDGE → CYCLE!

🎯 Key Insight: recStack tracks current path, not just visited nodes!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

/* 
🌍 DETAILED REAL-WORLD APPLICATIONS:

1. 📦 PACKAGE MANAGERS:
   - npm detects circular dependencies in package.json
   - Example: A depends on B, B depends on C, C depends on A
   
2. 🏗️ BUILD SYSTEMS:
   - Makefile target dependencies
   - Gradle build scripts
   - Webpack module bundling
   
3. 🎓 ACADEMIC SYSTEMS:
   - Course prerequisites: Math101 → Math201 → Math301
   - Prevents: Math301 requiring Math101 which requires Math301
   
4. 📋 PROJECT MANAGEMENT:
   - Task dependencies in project planning
   - Gantt charts validation
   - Resource allocation optimization
   
5. 🔄 MEMORY MANAGEMENT:
   - Circular reference detection in garbage collection
   - Prevents memory leaks in languages like JavaScript, Python
   
6. 🌐 OPERATING SYSTEMS:
   - Deadlock detection in process scheduling
   - Resource allocation graphs
   - Thread synchronization
   
7. 📊 SPREADSHEET SOFTWARE:
   - Formula dependency checking
   - Prevents: A1=B1+1, B1=A1+1 (circular reference)
   
8. 🌐 WEB CRAWLING:
   - Prevents infinite loops in link following
   - Sitemap generation
   - SEO analysis tools
   
9. 🔗 SOCIAL NETWORKS:
   - Friend recommendation algorithms
   - Influence propagation analysis
   - Community detection
   
10. 🎮 GAME DEVELOPMENT:
    - Quest dependency systems
    - Skill tree validation
    - Achievement unlock chains
*/

// 🔧 BONUS: Function to find actual cycle path
function findCyclePath(graph) {
    let visited = new Set();
    let recStack = new Set();
    let path = [];
    
    function dfs(node) {
        visited.add(node);
        recStack.add(node);
        path.push(node);
        
        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                if (dfs(neighbor)) return true;
            } else if (recStack.has(neighbor)) {
                // Found cycle, extract cycle path
                let cycleStart = path.indexOf(neighbor);
                let cyclePath = path.slice(cycleStart);
                cyclePath.push(neighbor);  // Close the cycle
                console.log("🔄 Cycle found:", cyclePath.join(" → "));
                return true;
            }
        }
        
        path.pop();
        recStack.delete(node);
        return false;
    }
    
    for (let node in graph) {
        if (!visited.has(node)) {
            if (dfs(node)) return true;
        }
    }
    return false;
}

console.log("\n=== CYCLE PATH DETECTION ===");
findCyclePath(cyclicGraph);  // 🔄 Cycle found: A → B → C → A

// === CYCLE DETECTION TESTS ===
// Test 1 - Cyclic Graph: true
// Test 2 - Acyclic Graph: false
// Test 3 - Self Loop: true
// Test 4 - Complex Cycle: true

// === CYCLE PATH DETECTION ===
// 🔄 Cycle found: A → B → C → A