// 🔧 Definition for binary tree node
class TreeNode {
  constructor(val) {
    this.val = val;      // node value
    this.left = null;    // left child
    this.right = null;   // right child
  }
}

/*
🔧 Problem: Print inorder traversal of binary tree
📝 Key Point: Recursion (LNR)
*/
function inorderTraversal(root) {
    if (!root) return;
    inorderTraversal(root.left); // visit left subtree
    console.log("Inorder Node:", root.val); // visit current node
    inorderTraversal(root.right); // visit right subtree
}
// 🔧 Test
let root1 = new TreeNode(1);
root1.right = new TreeNode(2);
root1.right.left = new TreeNode(3);
console.log("Q1 Inorder Traversal output:");
inorderTraversal(root1);  

// Q1 Inorder Traversal output:
// Inorder Node: 1
// Inorder Node: 3
// Inorder Node: 2