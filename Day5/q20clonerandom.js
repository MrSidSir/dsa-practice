// 🔧 Definition for Node with random pointer
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.random = null;
  }
}

/*
🔧 Problem: Clone a linked list with random pointer
📝 Key Point: Insert cloned nodes between original nodes, adjust random pointers, then separate.
*/

function copyRandomList(head) {
  if(!head) return null;

  // Step 1: Insert cloned node after original node
  let curr = head;
  while(curr){
    let clonedNode = new Node(curr.val);
    clonedNode.next = curr.next;
    curr.next = clonedNode;
    curr = clonedNode.next;
  }

  // Step 2: Copy random pointers for cloned nodes
  curr = head;
  while(curr){
    if(curr.random){
      curr.next.random = curr.random.next;
    }
    curr = curr.next.next;
  }

  // Step 3: Separate cloned list from original list
  curr = head;
  let pseudoHead = new Node(0);
  let copyCurr = pseudoHead;

  while(curr){
    copyCurr.next = curr.next;
    curr.next = curr.next.next;

    curr = curr.next;
    copyCurr = copyCurr.next;
  }

  return pseudoHead.next;
}

// 🔧 Test

// Create original linked list: 7 -> 13 -> 11 -> 10 -> 1
let node1 = new Node(7);
let node2 = new Node(13);
let node3 = new Node(11);
let node4 = new Node(10);
let node5 = new Node(1);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

node1.random = null;
node2.random = node1;
node3.random = node5;
node4.random = node3;
node5.random = node1;

let clonedHead = copyRandomList(node1);

// Function to print list with random pointers
function printList(head){
  let curr = head;
  while(curr){
    let randVal = curr.random ? curr.random.val : "null";
    console.log("Node:", curr.val, "Random:", randVal);
    curr = curr.next;
  }
}

printList(clonedHead);

/* 💡 **Explanation:**
1. Insert cloned node after each original node to link random easily.
2. Adjust random pointer of clone = original.random.next.
3. Separate cloned nodes into new list maintaining order.

✅ This is an O(n) time and O(1) space solution used in top FAANG interviews.
*/
