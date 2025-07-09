// 🔧 Definition for binary tree node
class TreeNode {
  constructor(val) {
    this.val = val;      // node value
    this.left = null;    // left child
    this.right = null;   // right child
  }
}
// 🔧 Problem: Preorder Traversal
function preorderTraversal(root) {
  if (!root) return;
  console.log("Preorder Node:", root.val); // visit current node
  preorderTraversal(root.left); // visit left
  preorderTraversal(root.right); // visit right
}

// 🔧 Test
let root1 = new TreeNode(1);
root1.right = new TreeNode(2);
root1.right.left = new TreeNode(3); 

console.log("\n🔴 Q2 Preorder Traversal Output:");
preorderTraversal(root1);

// 🔴 Q2 Preorder Traversal Output:
// Preorder Node: 1
// Preorder Node: 2
// Preorder Node: 3

