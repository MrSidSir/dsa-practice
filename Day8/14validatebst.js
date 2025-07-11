class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null; // Fixed: removed duplicate this.left = null
    }
}

/* 🔧 Problem: Check if binary tree is BST 
   📝 Key Point: Range validation recursion */

function isValidBST(root, min = null, max = null) {
    // Base case: empty tree is valid BST
    if (!root) return true;
    
    // Check if current node violates BST property
    if ((min !== null && root.val <= min) || // Fixed: minn -> min
        (max !== null && root.val >= max)) {
        return false;
    }
    
    // Recursively validate left and right subtrees with updated bounds
    return isValidBST(root.left, min, root.val) && // Fixed: minn -> min
           isValidBST(root.right, root.val, max);
}

// 🔧 Test Cases
console.log("=== BST Validation Tests ===");

// Test 1: Valid BST
let bst1 = new TreeNode(2);
bst1.left = new TreeNode(1);
bst1.right = new TreeNode(3);
console.log("Test 1 - Valid BST [1,2,3]:", isValidBST(bst1)); // true

// Test 2: Invalid BST (left child > parent)
let bst2 = new TreeNode(5);
bst2.left = new TreeNode(1);
bst2.right = new TreeNode(4);
bst2.right.left = new TreeNode(3);
bst2.right.right = new TreeNode(6);
console.log("Test 2 - Invalid BST:", isValidBST(bst2)); // false

// Test 3: Edge case - single node
let bst3 = new TreeNode(1);
console.log("Test 3 - Single node:", isValidBST(bst3)); // true

// Test 4: Edge case - empty tree
console.log("Test 4 - Empty tree:", isValidBST(null)); // true

// Test 5: Complex valid BST
let bst5 = new TreeNode(10);
bst5.left = new TreeNode(5);
bst5.right = new TreeNode(15);
bst5.left.left = new TreeNode(2);
bst5.left.right = new TreeNode(7);
bst5.right.right = new TreeNode(20);
console.log("Test 5 - Complex valid BST:", isValidBST(bst5)); // true

/* 
🔍 ALGORITHM EXPLANATION:

🎯 **Main Concept**: 
Range-based validation using recursive bounds checking

🏗️ **Algorithm Components & Their Roles**:

1️⃣ **Base Case Handler**:
   - if (!root) return true
   - Role: Handles empty nodes, ensures recursion terminates
   - Working: Empty subtrees are always valid BSTs

2️⃣ **Range Validator**:
   - if ((min !== null && root.val <= min) || (max !== null && root.val >= max))
   - Role: Checks if current node violates BST property
   - Working: Ensures node value stays within allowed range [min, max]

3️⃣ **Recursive Boundary Updater**:
   - Left subtree: isValidBST(root.left, min, root.val)
   - Right subtree: isValidBST(root.right, root.val, max)
   - Role: Passes updated constraints to children
   - Working: Left children get upper bound, right children get lower bound

📊 **How It Works**:
- Start with infinite range (-∞, +∞)
- For each node, check if it violates current constraints
- Left child inherits min bound, gets current node as max bound
- Right child inherits max bound, gets current node as min bound
- Recursively validate all subtrees with their respective bounds

⚡ **Time Complexity**: O(n) - visits each node once
💾 **Space Complexity**: O(h) - recursion stack depth (h = height)

🔧 **Bugs Fixed**:
1. TreeNode constructor: removed duplicate this.left = null
2. Function parameter: minn -> min (typo)
3. Recursive calls: minn -> min (typo)
*/
// === BST Validation Tests ===
// Test 1 - Valid BST [1,2,3]: true
// Test 2 - Invalid BST: false
// Test 3 - Single node: true
// Test 4 - Empty tree: true
// Test 5 - Complex valid BST: true