// 🔧 Definition for binary tree node
class TreeNode {
  constructor(val) {
    this.val = val;      // node value
    this.left = null;    // left child
    this.right = null;   // right child
  }
}

function postorderTraversal(root) {
    if (!root) return;
    postorderTraversal(root.left); // visit left
    postorderTraversal(root.right); // visit right
    console.log("Postorder Node:", root.val); // visit current node

}

// 🔧 Test
let root1 = new TreeNode(1);
root1.right = new TreeNode(2);
root1.right.left = new TreeNode(3);
console.log("\n Q3 Postorder Traversal Output:");
postorderTraversal(root1);

//  Q3 Postorder Traversal Output:
// Postorder Node: 3
// Postorder Node: 2
// Postorder Node: 1