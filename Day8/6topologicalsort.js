// ✅ [Q6] Topological Sort (DAG)
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

/*
🔧 Problem: Order vertices in DAG where for each edge u->v, u appears before v.
📝 Key Point: DFS + stack
*/
function topologicalSort(graph) {
    // Step 1: Initialize data structures
    let visited = new Set();  // Keep track of visited nodes to avoid cycles
    let stack = [];           // Stack to store nodes in reverse topological order
    
    // Step 2: Define DFS helper function
    function dfs(node) {
        // Mark current node as visited
        visited.add(node);
        
        // Step 3: Recursively visit all unvisited neighbors
        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);  // Recursive call for unvisited neighbor
            }
        }
        
        // Step 4: Push node to stack AFTER visiting all its dependencies
        // This ensures dependencies are processed before the current node
        stack.push(node);
    }
    
    // Step 5: Start DFS from all unvisited nodes
    // This handles disconnected components in the graph
    for (let node in graph) {
        if (!visited.has(node)) {
            dfs(node);  // Start DFS from this unvisited node
        }
    }
    
    // Step 6: Reverse the stack to get correct topological order
    // Stack contains nodes in reverse topological order, so we reverse it
    return stack.reverse();
}

// 🔧 Test
let dag = {
    A: ["C"],           // A depends on C (A → C)
    B: ["C", "D"],      // B depends on C and D (B → C, B → D)
    C: ["E"],           // C depends on E (C → E)
    D: ["F"],           // D depends on F (D → F)
    E: ["H", "F"],      // E depends on H and F (E → H, E → F)
    F: ["G"],           // F depends on G (F → G)
    G: [],              // G has no dependencies
    H: []               // H has no dependencies
};

console.log("q6 topological sort output:", topologicalSort(dag));

/*
💡 Explanation:
1. DFS explores each node and its dependencies completely
2. Nodes are added to stack only after all their dependencies are processed
3. Stack naturally gives us reverse topological order
4. Reversing the stack gives us the correct topological ordering
5. Nodes with no incoming edges (dependencies) appear first in final result

✅ Real use: Task scheduling with dependencies (build systems, course prerequisites).

🌟 Working: 
- Orders tasks respecting dependency constraints
- Ensures prerequisite tasks are completed before dependent tasks
- Handles multiple disconnected components in the graph
*/