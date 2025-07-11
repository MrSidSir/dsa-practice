class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

/* 🔧 Problem: Convert sorted array to balanced BST
📝 Key Point: Middle element as root recursively */

function sortedArrayToBST(nums) {
    if (nums.length == 0) return null;
    
    let mid = Math.floor(nums.length / 2);
    let node = new TreeNode(nums[mid]);
    
    // Recursively build left and right subtrees
    node.left = sortedArrayToBST(nums.slice(0, mid));
    node.right = sortedArrayToBST(nums.slice(mid + 1));
    
    return node;
}

// Helper function to print tree structure (for visualization)
function printInOrder(root) {
    if (!root) return [];
    return [
        ...printInOrder(root.left),
        root.val,
        ...printInOrder(root.right)
    ];
}

// Helper function to calculate tree height
function getHeight(root) {
    if (!root) return 0;
    return 1 + Math.max(getHeight(root.left), getHeight(root.right));
}

// Helper function to check if tree is balanced
function isBalanced(root) {
    if (!root) return true;
    
    let leftHeight = getHeight(root.left);
    let rightHeight = getHeight(root.right);
    
    return Math.abs(leftHeight - rightHeight) <= 1 && 
           isBalanced(root.left) && 
           isBalanced(root.right);
}

// 🔧 Test Cases
console.log("=== Testing Sorted Array to BST Conversion ===");

// Test 1: Original example
let arr1 = [-10, -3, 0, 5, 9];
let bst1 = sortedArrayToBST(arr1);
console.log("q13 bst root:", bst1.val);
console.log("Original array:", arr1);
console.log("InOrder traversal:", printInOrder(bst1));
console.log("Tree height:", getHeight(bst1));
console.log("Is balanced?", isBalanced(bst1));

// Test 2: Even length array
let arr2 = [1, 2, 3, 4, 5, 6];
let bst2 = sortedArrayToBST(arr2);
console.log("\nEven length array:", arr2);
console.log("BST root:", bst2.val);
console.log("InOrder traversal:", printInOrder(bst2));
console.log("Tree height:", getHeight(bst2));
console.log("Is balanced?", isBalanced(bst2));

// Test 3: Single element
let arr3 = [42];
let bst3 = sortedArrayToBST(arr3);
console.log("\nSingle element:", arr3);
console.log("BST root:", bst3.val);
console.log("Tree height:", getHeight(bst3));

// Test 4: Empty array
let arr4 = [];
let bst4 = sortedArrayToBST(arr4);
console.log("\nEmpty array:", arr4);
console.log("BST root:", bst4);

// Test 5: Large sorted array
let arr5 = Array.from({length: 15}, (_, i) => i + 1);
let bst5 = sortedArrayToBST(arr5);
console.log("\nLarge array (1-15):", arr5);
console.log("BST root:", bst5.val);
console.log("Tree height:", getHeight(bst5));
console.log("Is balanced?", isBalanced(bst5));

/* 💡 Explanation: 
Maintains balance by choosing mid as root recursively.
✅ Real use: Balanced search tree creation from sorted DB IDs.

🌟 Working: creates height-balanced BST for efficient search.

🔥 REAL WORLD APPLICATIONS:

1. DATABASE INDEXING
   - Convert sorted primary keys to BST for faster lookups
   - Create balanced indexes from sorted data exports
   - Optimize query performance on large datasets

2. SEARCH SYSTEMS
   - Build search trees from sorted dictionaries
   - Create auto-complete systems with balanced performance
   - Implement efficient range queries

3. GAME DEVELOPMENT
   - Create balanced decision trees for AI
   - Build spatial partitioning trees for collision detection
   - Generate balanced skill trees from sorted levels

4. FINANCIAL SYSTEMS
   - Build balanced trees from sorted stock prices
   - Create efficient order book structures
   - Implement balanced price comparison systems

5. CACHING SYSTEMS
   - Convert sorted cache keys to BST for O(log n) access
   - Build balanced expiration time trees
   - Create efficient memory management structures

6. FILE SYSTEMS
   - Build balanced directory structures
   - Create efficient file sorting systems
   - Implement balanced metadata trees

7. NETWORKING
   - Build balanced routing tables
   - Create efficient IP address lookup trees
   - Implement balanced load balancing structures

⚡ PERFORMANCE BENEFITS:
- Search: O(log n) instead of O(n)
- Insert: O(log n) guaranteed
- Delete: O(log n) guaranteed
- Space: O(n) optimal
- Height: O(log n) balanced

🎯 WHY BALANCED BST MATTERS:
- Prevents worst-case O(n) operations
- Guarantees consistent performance
- Enables efficient range queries
- Supports fast min/max operations
*/

// === Testing Sorted Array to BST Conversion ===
// q13 bst root: 0
// Original array: [ -10, -3, 0, 5, 9 ]
// InOrder traversal: [ -10, -3, 0, 5, 9 ]
// Tree height: 3
// Is balanced? true

// Even length array: [ 1, 2, 3, 4, 5, 6 ]
// BST root: 4
// InOrder traversal: [ 1, 2, 3, 4, 5, 6 ]
// Tree height: 3
// Is balanced? true

// Single element: [ 42 ]
// BST root: 42
// Tree height: 1

// Empty array: []
// BST root: null

// Large array (1-15): [
//    1,  2,  3,  4,  5,  6,
//    7,  8,  9, 10, 11, 12,
//   13, 14, 15
// ]
// BST root: 8
// Tree height: 4
// Is balanced? true