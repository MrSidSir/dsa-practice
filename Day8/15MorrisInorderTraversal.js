// [Q15] Morris Inorder Traversal (No stack/recursion)
class TreeNode {
    constructor(val) {  // Fixed typo: construtor -> constructor
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

/*
🔧 Problem: Inorder traversal with O(1) space
📝 Key Point: Threaded binary tree traversal

🧠 Algorithm Working:
1. Uses empty right pointers to create temporary "threads"
2. Thread = temporary link back to ancestor node
3. Two phases: Threading creation & Processing with cleanup

🔄 Core Components:
- Current pointer (curr): Tracks processing node
- Predecessor finding: Rightmost node in left subtree
- Threading mechanism: Create & remove temporary links
- Two visit points: Thread creation & actual processing
*/

function morrisTraversal(root) {
    let curr = root;
    
    while (curr) {
        // Case 1: No left child - process and move right
        if (!curr.left) {
            console.log(curr.val); // 📍 Visit node (no left subtree)
            curr = curr.right;
        } 
        // Case 2: Has left child - find predecessor and handle threading
        else {
            // Find inorder predecessor (rightmost node in left subtree)
            let pre = curr.left;
            while (pre.right && pre.right != curr) {
                pre = pre.right;
            }
            
            // Sub-case A: No thread exists - create thread and go left
            if (!pre.right) {
                pre.right = curr;  // 🔗 Create thread (breadcrumb)
                curr = curr.left;  // Move to left subtree
            } 
            // Sub-case B: Thread exists - remove thread and process
            else {
                pre.right = null;  // 🧹 Remove thread (cleanup)
                console.log(curr.val); // 📍 Visit node (after left subtree processed)
                curr = curr.right; // Move to right subtree
            }
        }
    }
}

/*
🔍 Step-by-Step Example for tree:
     1
      \
       2
      /
     3

Execution Flow:
1. curr=1, has left=null → print 1, move right to 2
2. curr=2, has left=3 → find predecessor=3
3. 3.right=null → create thread 3.right=2, move left to 3
4. curr=3, has left=null → print 3, move right to 2 (via thread)
5. curr=2, has left=3 → find predecessor=3
6. 3.right=2 (thread exists) → remove thread, print 2, move right to null
7. curr=null → end

Output: 1, 3, 2 (inorder sequence)
*/

// 🔧 Test Cases
console.log("=== Morris Traversal Test Cases ===");

// Test 1: Original example
let morrisTree = new TreeNode(1);
morrisTree.right = new TreeNode(2);
morrisTree.right.left = new TreeNode(3);
console.log("Q15 Morris Traversal (1-2-3):");
morrisTraversal(morrisTree);

// Test 2: Balanced tree
console.log("\nBalanced Tree (4-2-5-1-3):");
let balancedTree = new TreeNode(1);
balancedTree.left = new TreeNode(2);
balancedTree.right = new TreeNode(3);
balancedTree.left.left = new TreeNode(4);
balancedTree.left.right = new TreeNode(5);
morrisTraversal(balancedTree);

// Test 3: Left skewed tree
console.log("\nLeft Skewed Tree (3-2-1):");
let leftSkewed = new TreeNode(1);
leftSkewed.left = new TreeNode(2);
leftSkewed.left.left = new TreeNode(3);
morrisTraversal(leftSkewed);

// Test 4: Right skewed tree
console.log("\nRight Skewed Tree (1-2-3):");
let rightSkewed = new TreeNode(1);
rightSkewed.right = new TreeNode(2);
rightSkewed.right.right = new TreeNode(3);
morrisTraversal(rightSkewed);

/*
💡 Explanation:
Morris Traversal uses empty right pointers to thread tree without stack/recursion.
- Creates temporary links (threads) to navigate back to ancestors
- Each node visited at most twice: threading phase & processing phase
- Original tree structure is restored after traversal

✅ Real-world Applications:
1. 🔋 Embedded Systems: IoT devices, microcontrollers with limited RAM
2. 💾 Database Systems: B-tree traversal in memory-constrained environments
3. 📱 Mobile Apps: Battery-efficient tree processing
4. 🌐 Big Data: Stream processing with memory constraints
5. 🎮 Gaming: AI decision trees with minimal memory footprint
6. 🚗 Automotive: Real-time systems where stack overflow is dangerous
7. 🏥 Medical Devices: Memory-critical applications
8. 📊 Financial Systems: High-frequency trading with memory optimization

⚡ Performance:
- Time Complexity: O(n) - each node visited at most twice
- Space Complexity: O(1) - only few pointer variables
- Memory Efficient: No recursion stack or auxiliary data structures
- Stack Overflow Safe: No function call stack usage

🔧 Key Advantages:
- Guaranteed O(1) space usage
- Predictable memory consumption
- Cache-friendly linear traversal
- No stack overflow risk
- Suitable for very large trees

⚠️ Considerations:
- Temporarily modifies tree structure
- More complex than recursive approaches
- Not inherently thread-safe during execution
- Requires careful null pointer handling
*/

// 🌟 Working: Inorder traversal without extra memory using threading technique
console.log("\n🌟 Morris Traversal: O(1) space inorder traversal using threading!");


// output:-=== Morris Traversal Test Cases ===
// Q15 Morris Traversal (1-2-3):
// 1
// 3
// 2

// Balanced Tree (4-2-5-1-3):
// 4
// 2
// 5
// 1
// 3

// Left Skewed Tree (3-2-1):
// 3
// 2
// 1

// Right Skewed Tree (1-2-3):
// 1
// 2
// 3

// 🌟 Morris Traversal: O(1) space inorder traversal using threading!