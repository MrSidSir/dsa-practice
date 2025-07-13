function hasCycleKahn(graph) {
    // Step 1: Initialize in-degree tracking
    let indegree = {};
    
    // Step 2: Calculate in-degrees for all nodes
    for (let u in graph) {
        if (!indegree[u]) indegree[u] = 0;  // Initialize current node's in-degree
        for (let v of graph[u]) {
            indegree[v] = (indegree[v] || 0) + 1;  // Increment target node's in-degree
        }
    }
    
    // Step 3: Find all nodes with zero in-degree (no dependencies)
    let queue = [];
    for (let node in indegree) {
        if (indegree[node] == 0) queue.push(node);
    }
    
    // Step 4: Process nodes using BFS approach
    let count = 0;
    while (queue.length) {
        let u = queue.shift();           // Remove node from front of queue
        count++;                         // Increment processed nodes counter
        
        // Step 5: Update neighbors' in-degrees
        for (let v of graph[u] || []) {  // For each neighbor of current node
            indegree[v]--;               // Reduce neighbor's in-degree
            if (indegree[v] == 0) {      // If neighbor has no more dependencies
                queue.push(v);           // Add to queue for processing
            }
        }
    }
    
    // Step 6: Check if all nodes were processed
    return count != Object.keys(graph).length;  // True = cycle exists
}

// 🔧 Test
let graph = { "A": ["B"], "B": ["C"], "C": ["A"] };
console.log("Q10 Cycle Detection (Kahn):", hasCycleKahn(graph));

// output code:- Q10 Cycle Detection (Kahn): true

/*
💡 Explanation:
If topological sort visits fewer nodes than total, cycle exists.
✅ Real Use: Deadlock detection, task scheduling.
*/

// 🔧 Advantages of Kahn's Algorithm

// Intuitive: Easy to understand and implement
// Efficient: Linear time complexity
// Versatile: Works for both cycle detection and topological sorting
// Practical: Directly applicable to real-world dependency problems


//  Test Case Analysis
// Test Graph: {"A": ["B"], "B": ["C"], "C": ["A"]}
// Visual Representation:
// A ──→ B
// ↑     ↓
// └──── C