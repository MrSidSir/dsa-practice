// 🔧 Definition for binary tree node
class TreeNode {
  constructor(val) {
    this.val = val;      // node value
    this.left = null;    // left child
    this.right = null;   // right child
  }
}
function isSymmetric(root) {
if (!root) return true;
 
function isMirror(left, right) {
    if (!left && !right) return true; // both null
    if (!left || !right || left.val !== right.val) return false; // mismatch
    return isMirror(left.left, right.right) && isMirror(left.right, right.left);
}
return isMirror(root.left,root.right);
}
// test
let root1 = new TreeNode(1);
root1.right = new TreeNode(2);
root1.right.left = new TreeNode(3);
console.log("\n q6 symmetric tree output:", isSymmetric(root1)); 

// false