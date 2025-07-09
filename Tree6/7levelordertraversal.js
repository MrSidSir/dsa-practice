// 🔧 Definition for binary tree node
class TreeNode {
  constructor(val) {
    this.val = val;      // node value
    this.left = null;    // left child
    this.right = null;   // right child
  }
}

function  levelOrder(root) { 
    if (!root) return [];
    let queue = [root], res = [];
   
while  (queue.length) {
    let node = queue.shift(); // dequeue front
    res.push(node.val); // visit node

    if  (node.left) queue.push(node.left); // enqueue left
    if (node.right) queue.push(node.right); // enqueue right
}
return res;
}

// 🔧 Test
let root1 = new TreeNode(1);
root1.right = new TreeNode(2);
root1.right.left = new TreeNode(3);
console.log("\n q7 level Order output:", levelOrder(root1));

//  q7 level Order output: [ 1, 2, 3 ]