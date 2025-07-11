class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

/* 🔧 Problem: Find LCA of two nodes in binary tree
   📝 Key Point: Recursive DFS returns LCA when both sides return non-null
   
   🌟 Working: Uses bottom-up recursion to find where paths diverge
   - Base case: return node if it's null or matches target
   - Recursive case: search both subtrees
   - Decision: if both subtrees return non-null, current node is LCA
*/

function lowestCommonAncestor(root, p, q) {
    // 🔧 Base case: if current node is null or matches either target node
    if (!root || root == p || root == q) return root;
    
    // 🔧 Recursive search in left subtree
    let left = lowestCommonAncestor(root.left, p, q);
    
    // 🔧 Recursive search in right subtree  
    let right = lowestCommonAncestor(root.right, p, q);
    
    // 🔧 If both sides found something, current node is LCA
    if (left && right) return root;
    
    // 🔧 Return whichever side found a target (or null if neither)
    return left || right;
}

// 🔧 Test with proper tree structure
let root = new TreeNode(3);
root.left = new TreeNode(5);
root.right = new TreeNode(1);
root.left.left = new TreeNode(6);
root.left.right = new TreeNode(2);
root.right.left = new TreeNode(0);
root.right.right = new TreeNode(8);
root.left.right.left = new TreeNode(7);
root.left.right.right = new TreeNode(4);

/*
Tree Structure:
       3
      / \
     5   1
    / \ / \
   6  2 0  8
     / \
    7   4
*/

console.log("Q11 LCA Output (5 and 1):", lowestCommonAncestor(root, root.left, root.right).val);
// 🌟 Working: Finds node 3 because 5 is in left subtree, 1 is in right subtree

console.log("Q11 LCA Output (7 and 4):", lowestCommonAncestor(root, root.left.right.left, root.left.right.right).val);
// 🌟 Working: Finds node 2 because both 7 and 4 are in its subtree

console.log("Q11 LCA Output (6 and 2):", lowestCommonAncestor(root, root.left.left, root.left.right).val);
// 🌟 Working: Finds node 5 because 6 is in left subtree, 2 is in right subtree

/* 💡 Detailed Algorithm Explanation:
   
   🔧 Step-by-Step Working:
   1. Start from root, check if it's null or target node
   2. Recursively search left subtree for both nodes
   3. Recursively search right subtree for both nodes
   4. If both subtrees return non-null: current node is LCA
   5. If only one subtree returns non-null: LCA is in that subtree
   6. If both return null: neither node found in this branch
   
   🌟 Key Insight: The algorithm works bottom-up
   - Leaf nodes return null (base case)
   - Target nodes return themselves
   - Internal nodes decide based on what their children return
   
   ✅ Real-World Applications:
   - File system: Finding common directory path
   - Git: Finding merge base between branches
   - Organization: Finding common manager
   - Network: Finding routing convergence point
   - Database: Query optimization for joins
   - Biology: Finding common ancestor in phylogenetic trees
   
   ⚡ Time Complexity: O(N) - visit each node once
   ⚡ Space Complexity: O(H) - recursion stack height
*/



// 🌟 Additional test cases to verify working:
function testLCA() {
    console.log("\n🔧 Testing LCA Algorithm:");
    
    // Test case 1: LCA of leaf nodes
    let lca1 = lowestCommonAncestor(root, root.left.left, root.left.right.left);
    console.log("LCA of 6 and 7:", lca1.val); // Should be 5
    
    // Test case 2: LCA when one node is ancestor of other
    let lca2 = lowestCommonAncestor(root, root.left, root.left.right);
    console.log("LCA of 5 and 2:", lca2.val); // Should be 5
    
    // Test case 3: LCA of root with any node
    let lca3 = lowestCommonAncestor(root, root, root.right.left);
    console.log("LCA of 3 and 0:", lca3.val); // Should be 3
}

testLCA();

// Q11 LCA Output (5 and 1): 3
// Q11 LCA Output (7 and 4): 2
// Q11 LCA Output (6 and 2): 5

// 🔧 Testing LCA Algorithm:
// LCA of 6 and 7: 5
// LCA of 5 and 2: 5
// LCA of 3 and 0: 3