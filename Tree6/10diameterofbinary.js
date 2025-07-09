// 🌳 [Q10] Diameter of Binary Tree
// 🔧 Definition for binary tree node
class TreeNode {
  constructor(val) {
    this.val = val;      // node value
    this.left = null;    // left child
    this.right = null;   // right child
  }
}
let diameter = 0;
function diameterofBinaryTree(root) {
    function depth (node) {
if (!node) return 0;
let left = depth(node.left);
let right = depth(node.right);
diameter = Math.max(diameter, left + right);
return  1 + Math.max(left, right);
    }
    depth(root);
    return diameter;
}
// test
let root1 = new TreeNode(1);
root1.right = new TreeNode(2);
root1.right.left = new TreeNode(3);
console.log("\nq10 diameter output:", diameterofBinaryTree(root1));

// q10 diameter output: 2