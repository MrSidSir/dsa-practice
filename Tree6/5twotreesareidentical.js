// 🔧 Definition for binary tree node
class TreeNode {
  constructor(val) {
    this.val = val;      // node value
    this.left = null;    // left child
    this.right = null;   // right child
  }
}
function isSameTree(p,q) {
    if (!p && !q) return true;
    if (!p || !q || p.val !== q.val) return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// 🔧 Test
let p1 = new TreeNode(1);
let q1 = new TreeNode(1);
console.log("\n q5 Tree Identical output:", isSameTree(p1, q1)); // true

