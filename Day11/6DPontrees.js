// [Q6] DP on Trees (Maximum Independent Set)
/*
🔧 Problem: Max sum of non-adjacent nodes in tree
📝 Key Point: DP on Trees (postorder)
*/  
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function maxSum(node) {
    if (!node) return [0, 0];
    let [l_incl, l_excl] =maxSum(node.left);
let [r_incl, r_excl] = maxSum(node.right);
    // Include current: node.val + exclude left + exclude right
    let incl = node.val + l_excl + r_excl;
      // Exclude current: max of including or excluding left + same for right
let excl = Math.max(l_incl, l_excl) + Math.max(r_incl, r_excl);

return [incl, excl];
}

let root = new TreeNode(10);
root.left = new TreeNode(1);
root.right = new TreeNode(2);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(4);

console.log(Math.max(...maxSum(root))); //output:17


/*
💡 Explanation:
At each node, decide include or exclude recursively.
✅ Real use: Resource allocation without conflict (e.g. non-overlapping events).
*/