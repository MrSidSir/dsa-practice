class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

/* 🔧 Problem: Convert tree to string and back
📝 Key Point: BFS encoding with null markers */

function serialize(root) {
    if (!root) return "";
    
    let res = [];
    let queue = [root];
    
    while (queue.length) {
        let node = queue.shift();
        if (node) {
            res.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        } else {
            res.push("null");
        }
    }
    
    return res.join(",");
}

function deserialize(data) {
    if (!data) return null;
    
    let values = data.split(",");
    let root = new TreeNode(parseInt(values[0]));
    let queue = [root];
    let i = 1;
    
    while (queue.length && i < values.length) {
        let node = queue.shift();
        
        // Process left child
        if (values[i] !== "null") {
            node.left = new TreeNode(parseInt(values[i]));
            queue.push(node.left);
        }
        i++;
        
        // Process right child
        if (i < values.length && values[i] !== "null") {
            node.right = new TreeNode(parseInt(values[i]));
            queue.push(node.right);
        }
        i++;
    }
    
    return root;
}

// 🔧 Test Cases
console.log("=== Testing Tree Serialization/Deserialization ===");

// Test 1: Simple tree
let r = new TreeNode(1);
r.left = new TreeNode(2);
r.right = new TreeNode(3);

let serialized = serialize(r);
console.log("Serialized tree:", serialized);

let deserialized = deserialize(serialized);
console.log("Deserialized root value:", deserialized.val);
console.log("Left child:", deserialized.left.val);
console.log("Right child:", deserialized.right.val);

// Test 2: More complex tree
let complexTree = new TreeNode(1);
complexTree.left = new TreeNode(2);
complexTree.right = new TreeNode(3);
complexTree.right.left = new TreeNode(4);
complexTree.right.right = new TreeNode(5);

let complexSerialized = serialize(complexTree);
console.log("\nComplex tree serialized:", complexSerialized);

let complexDeserialized = deserialize(complexSerialized);
console.log("Complex tree deserialized root:", complexDeserialized.val);

// Test 3: Empty tree
let emptySerialized = serialize(null);
console.log("\nEmpty tree serialized:", emptySerialized);
let emptyDeserialized = deserialize(emptySerialized);
console.log("Empty tree deserialized:", emptyDeserialized);

/* 💡 Explanation: 
BFS stores tree structure with nulls for empty nodes.
Format: "1,2,3,null,null,4,5"
✅ Real use: Store/load trees in DB, APIs, file systems.

🌟 Working: converts tree structure to/from string for storage.

🔥 REAL WORLD APPLICATIONS:
1. Database Storage - Store tree structures in SQL/NoSQL databases
2. API Communication - Send tree data between client/server
3. File Systems - Save/load tree structures to files
4. Caching - Store computed trees in Redis/Memcached
5. Message Queues - Send tree data through Kafka/RabbitMQ
6. Configuration Management - Store hierarchical configs
7. Backup/Restore - Create backups of tree-based data structures
*/

// === Testing Tree Serialization/Deserialization ===
// Serialized tree: 1,2,3,null,null,null,null
// Deserialized root value: 1
// Left child: 2
// Right child: 3

// Complex tree serialized: 1,2,3,null,null,4,5,null,null,null,null       
// Complex tree deserialized root: 1

// Empty tree serialized:
// Empty tree deserialized: null