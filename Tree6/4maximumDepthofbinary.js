// 🔧 Definition for binary tree node
class TreeNode {
  constructor(val) {
    this.val = val;      // node value
    this.left = null;    // left child
    this.right = null;   // right child
  }
}
function maxDepth(root) {
    if (!root) return 0;
    let left = maxDepth(root.left);  // compute left depth
    let right = maxDepth(root.right); // compute right depth
    return 1 + Math.max(left, right); // add current node
}

//  test
let root1 = new TreeNode(1);
root1.right = new TreeNode(2);
root1.right.left = new TreeNode(3);
 
console.log("\n🔴 Q4 Maximum Depth Output:", maxDepth(root1));

// 🔴 Q4 Maximum Depth Output: 3