// 🔧 Kahn's Algorithm for Topological Sort (BFS-based)
// 📝 Problem: Find linear ordering of vertices in DAG (Directed Acyclic Graph)

/* 
🚀 ALGORITHM WORKFLOW:
1. Calculate indegree for all vertices (incoming edges count)
2. Add all vertices with indegree=0 to queue 
3. While queue is not empty:
   - Remove vertex from queue and add to result
   - For each neighbor of removed vertex:
     * Decrease its indegree by 1
     * If indegree becomes 0, add to queue
4. If result contains all vertices → valid topological order
   If not → cycle exists (not a DAG)

⏰ Time Complexity: O(V + E)
💾 Space Complexity: O(V)
*/

function kahnTopologicalSort(graph, n) {
    // Step 1: Calculate indegree for all vertices
    let indegree = Array(n).fill(0);
    for (let u = 0; u < n; u++) {
        for (let v of graph[u]) {
            indegree[v]++;
        }
    }
    
    // Step 2: Add all vertices with indegree=0 to queue
    let queue = [];
    for (let i = 0; i < n; i++) {
        if (indegree[i] == 0) {
            queue.push(i);
        }
    }
    
    // Step 3: Process queue and build topological order
    let topo = [];
    while (queue.length) {
        let u = queue.shift();
        topo.push(u);
        
        // Reduce indegree of neighbors
        for (let v of graph[u]) {
            indegree[v]--;
            if (indegree[v] == 0) {
                queue.push(v);
            }
        }
    }
    
    // Step 4: Check if all vertices are processed
    return topo.length == n ? topo : "Cycle exists";
}

// 🧪 Test Examples
console.log("=== KAHN'S ALGORITHM EXAMPLES ===\n");

// Example 1: Simple DAG
let graph1 = [[1, 2], [2], [3], []];
console.log("Graph 1:", graph1);
console.log("Topological Order:", kahnTopologicalSort(graph1, 4));
console.log("Path: 0 → 1 → 2 → 3\n");

// Example 2: More complex DAG
let graph2 = [[1, 2], [3], [3], []];
console.log("Graph 2:", graph2);
console.log("Topological Order:", kahnTopologicalSort(graph2, 4));
console.log("Multiple valid orders possible\n");

// Example 3: Cycle detection
let graph3 = [[1], [2], [0]]; // 0→1→2→0 (cycle)
console.log("Graph 3 (with cycle):", graph3);
console.log("Result:", kahnTopologicalSort(graph3, 3));

console.log("\n🌟 REAL-WORLD APPLICATIONS:\n");

/* 
🏗️ 1. BUILD SYSTEMS & DEPENDENCY MANAGEMENT:
   - Maven, Gradle, npm build order
   - Compile order for source files
   - Docker image dependency chains
   
📚 2. ACADEMIC COURSE SCHEDULING:
   - Prerequisite course ordering
   - Semester planning
   - Curriculum design
   
🔧 3. TASK SCHEDULING & PROJECT MANAGEMENT:
   - Project task dependencies
   - Manufacturing process steps
   - CI/CD pipeline stages
   
🎯 4. COMPILER DESIGN:
   - Symbol table resolution
   - Code generation order
   - Import/include file processing
   
📊 5. DATA PROCESSING PIPELINES:
   - ETL job scheduling
   - Data transformation steps
   - Stream processing order
   
🧬 6. BIOINFORMATICS:
   - Gene expression analysis
   - Protein interaction networks
   - Metabolic pathway analysis
   
🎮 7. GAME DEVELOPMENT:
   - Quest prerequisite chains
   - Skill tree unlocking
   - Resource dependency management
   
🌐 8. NETWORK PROTOCOLS:
   - Packet processing order
   - Protocol stack implementation
   - Service startup sequence
*/

// 🔧 Real-world example: Course Prerequisites
function scheduleCourses(prerequisites, numCourses) {
    // Build adjacency list
    let graph = Array(numCourses).fill().map(() => []);
    
    for (let [course, prereq] of prerequisites) {
        graph[prereq].push(course); // prereq → course
    }
    
    let result = kahnTopologicalSort(graph, numCourses);
    
    if (result === "Cycle exists") {
        return "Impossible to complete all courses - circular dependency!";
    }
    
    return result;
}

// Example: Course scheduling
console.log("\n📚 COURSE SCHEDULING EXAMPLE:");
let courses = [
    [1, 0], // Course 1 needs Course 0
    [2, 1], // Course 2 needs Course 1  
    [3, 1], // Course 3 needs Course 1
    [3, 2]  // Course 3 needs Course 2
];

console.log("Prerequisites:", courses);
console.log("Course order:", scheduleCourses(courses, 4));
console.log("Meaning: Take course 0 first, then 1, then 2, finally 3");

// 🔧 Build system example
function buildOrder(dependencies) {
    let modules = new Set();
    for (let [module, dep] of dependencies) {
        modules.add(module);
        modules.add(dep);
    }
    
    let moduleList = Array.from(modules);
    let moduleIndex = {};
    moduleList.forEach((module, i) => moduleIndex[module] = i);
    
    let graph = Array(moduleList.length).fill().map(() => []);
    
    for (let [module, dep] of dependencies) {
        graph[moduleIndex[dep]].push(moduleIndex[module]);
    }
    
    let result = kahnTopologicalSort(graph, moduleList.length);
    
    if (result === "Cycle exists") {
        return "Circular dependency detected!";
    }
    
    return result.map(i => moduleList[i]);
}

console.log("\n🏗️ BUILD SYSTEM EXAMPLE:");
let buildDeps = [
    ["App", "Database"],
    ["App", "Authentication"], 
    ["Database", "Config"],
    ["Authentication", "Config"]
];

console.log("Build dependencies:", buildDeps);
console.log("Build order:", buildOrder(buildDeps));

// === KAHN'S ALGORITHM EXAMPLES ===

// Graph 1: [ [ 1, 2 ], [ 2 ], [ 3 ], [] ]
// Topological Order: [ 0, 1, 2, 3 ]
// Path: 0 → 1 → 2 → 3

// Graph 2: [ [ 1, 2 ], [ 3 ], [ 3 ], [] ]
// Topological Order: [ 0, 1, 2, 3 ]
// Multiple valid orders possible

// Graph 3 (with cycle): [ [ 1 ], [ 2 ], [ 0 ] ]
// Result: Cycle exists

// 🌟 REAL-WORLD APPLICATIONS:


// 📚 COURSE SCHEDULING EXAMPLE:
// Prerequisites: [ [ 1, 0 ], [ 2, 1 ], [ 3, 1 ], [ 3, 2 ] ]
// Course order: [ 0, 1, 2, 3 ]
// Meaning: Take course 0 first, then 1, then 2, finally 3

// 🏗️ BUILD SYSTEM EXAMPLE:
// Build dependencies: [
//   [ 'App', 'Database' ],
//   [ 'App', 'Authentication' ],
//   [ 'Database', 'Config' ],
//   [ 'Authentication', 'Config' ]
// ]
// Build order: [ 'Config', 'Database', 'Authentication', 'App' ]

/*
🎯 WHY KAHN'S ALGORITHM IS POWERFUL:

✅ Advantages:
- Detects cycles automatically
- Easy to implement and understand  
- Works with any DAG representation
- Natural BFS-based approach
- Can process multiple nodes in parallel

⚡ Performance Benefits:
- Linear time complexity O(V + E)
- Space efficient O(V)
- Streaming friendly (process as you go)

🔄 Variations:
- Parallel topological sort
- Lexicographically smallest ordering
- All possible topological orders
- Longest path in DAG using topo sort
*/