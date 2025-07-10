// Binary Tree Cloning using BFS (Breadth-First Search)

class TreeNode {
    constructor(val) {
        this.val = val;        // Node ki value store karta hai
        this.left = null;      // Left child ka reference
        this.right = null;     // Right child ka reference
    }
}

function cloneTreeBFS(root) {
    // Base case: Agar tree empty hai to null return karo
    if (!root) return null;
    
    // Map original nodes ko cloned nodes se link karta hai
    let map = new Map();
    
    // Queue BFS ke liye - level by level traverse karne ke liye
    let queue = [root];
    
    // Root node ka clone banao
    let newRoot = new TreeNode(root.val);
    
    // Original root ko cloned root se map karo
    map.set(root, newRoot);

    // BFS loop - jab tak queue empty nahi hoti
    while (queue.length > 0) {  // Bug fix: queue.length (not lenght)
        // Current node nikalo queue se
        let node = queue.shift();
        
        // Current node ka cloned version map se nikalo
        let cloned = map.get(node);
        
        // Left child process karo
        if (node.left) {
            // Left child ka clone banao
            cloned.left = new TreeNode(node.left.val);  // Bug fix: cloned.left (not cloneTreeBFS.left)
            
            // Original left child ko cloned left child se map karo
            map.set(node.left, cloned.left);
            
            // Left child ko queue mein add karo next processing ke liye
            queue.push(node.left);
        }
        
        // Right child process karo
        if (node.right) {
            // Right child ka clone banao
            cloned.right = new TreeNode(node.right.val);
            
            // Original right child ko cloned right child se map karo
            map.set(node.right, cloned.right);
            
            // Right child ko queue mein add karo next processing ke liye
            queue.push(node.right);
        }
    }
    
    // Cloned tree ka root return karo
    return newRoot;
}

// Test function - tree structure print karne ke liye
function printTree(root, prefix = "", isLeft = true) {
    if (!root) return;
    
    console.log(prefix + (isLeft ? "├── " : "└── ") + root.val);
    
    if (root.left || root.right) {
        if (root.left) {
            printTree(root.left, prefix + (isLeft ? "│   " : "    "), true);
        } else {
            console.log(prefix + (isLeft ? "│   " : "    ") + "├── null");
        }
        
        if (root.right) {
            printTree(root.right, prefix + (isLeft ? "│   " : "    "), false);
        } else {
            console.log(prefix + (isLeft ? "│   " : "    ") + "└── null");
        }
    }
}

// Test case
console.log("=== Binary Tree Cloning using BFS ===\n");

// Original tree banao
let originalTree = new TreeNode(1);
originalTree.left = new TreeNode(2);
originalTree.right = new TreeNode(3);
originalTree.left.left = new TreeNode(4);
originalTree.left.right = new TreeNode(5);
originalTree.right.left = new TreeNode(6);
originalTree.right.right = new TreeNode(7);

console.log("Original Tree:");
printTree(originalTree);

// Tree clone karo
let clonedTree = cloneTreeBFS(originalTree);

console.log("\nCloned Tree:");
printTree(clonedTree);

// Verification - dono trees same structure hai lekin different objects
console.log("\n=== Verification ===");
console.log("Original root value:", originalTree.val);
console.log("Cloned root value:", clonedTree.val);
console.log("Are they same object?", originalTree === clonedTree); // false hona chahiye
console.log("Are values same?", originalTree.val === clonedTree.val); // true hona chahiye

// Memory address verification
console.log("\n=== Memory Address Verification ===");
console.log("Original tree left child:", originalTree.left);
console.log("Cloned tree left child:", clonedTree.left);
console.log("Are left children same object?", originalTree.left === clonedTree.left); // false

// // output:-=== Binary Tree Cloning using BFS ===

// Original Tree:
// ├── 1
// │   ├── 2
// │   │   ├── 4
// │   │   └── 5
// │   └── 3
// │       ├── 6
// │       └── 7

// Cloned Tree:
// ├── 1
// │   ├── 2
// │   │   ├── 4
// │   │   └── 5
// │   └── 3
// │       ├── 6
// │       └── 7

// === Verification ===
// Original root value: 1
// Cloned root value: 1
// Are they same object? false
// Are values same? true

// === Memory Address Verification ===
// Original tree left child: TreeNode {
//   val: 2,
//   left: TreeNode { val: 4, left: null, right: null },
//   right: TreeNode { val: 5, left: null, right: null }
// }
// Cloned tree left child: TreeNode {
//   val: 2,
//   left: TreeNode { val: 4, left: null, right: null },
//   right: TreeNode { val: 5, left: null, right: null }
// }
// Are left children same object? false

/*
🔧 ALGORITHM EXPLANATION:
1. Base Case: Empty tree ke liye null return karte hain
2. Map: Original nodes ko cloned nodes se link karta hai
3. Queue: BFS traversal ke liye level-order processing
4. Clone Root: Root node ka clone banate hain
5. BFS Loop: 
   - Current node nikalo
   - Uska cloned version map se nikalo
   - Left/Right children ka clone banao
   - Children ko map mein add karo
   - Children ko queue mein add karo

📊 TIME COMPLEXITY: O(n) - har node ko ek baar visit karte hain
📊 SPACE COMPLEXITY: O(n) - map aur queue ke liye

🌟 REAL WORLD USES:
1. Database Backup: Tree structures ko backup karna
2. Version Control: Git-like systems mein tree structures clone karna
3. Game Development: Game state trees ko copy karna
4. File Systems: Directory structures ko copy karna
5. AI/ML: Decision trees ko replicate karna
6. Web Development: DOM trees ko clone karna
7. Memory Management: Deep copy operations

💡 ADVANTAGES:
- Iterative approach (no recursion stack overflow)
- Level-by-level processing
- Memory efficient
- Easy to understand and debug

⚠️ DISADVANTAGES:
- Extra space for queue and map
- Slightly more complex than recursive approach
*/