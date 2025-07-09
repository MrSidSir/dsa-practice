// 🔧 Definition for binary tree node
class TreeNode{
    constructor(val) {
        this.val = val; // node value
        this.left = null; // left child
        this.right = null; // right child
    }
}
function hasPathSum(root, sum) {
    if (!root) return false;
    if (!root.left && !root.right) return sum === root.val;
    return hasPathSum(root.left, sum - root.val) ||hasPathSum(root.right, sum - root.val);
}


// 🔧 Test
let root1 = new TreeNode(1);
root1.right = new TreeNode(2);
root1.right.left = new TreeNode(3);
console.log("\n q9 path sum output (target=4):", hasPathSum(root1, 4));

// q9 path sum output (target=4): false
