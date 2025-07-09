// 🔧 Key Point: Linked List Node definition
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// 🔧 Function to detect loop using Floyd’s Cycle Detection
function hasCycle(head) {
  let slow = head, fast = head;
  while(fast && fast.next){
    slow = slow.next;
    fast = fast.next.next;
    if(slow == fast) return true;
  }
  return false;
}

// 🔧 Function to remove loop from linked list
function removeLoop(head){
  let slow = head, fast = head;

  // Step 1: Detect loop using Floyd’s algorithm
  while(fast && fast.next){
    slow = slow.next;
    fast = fast.next.next;
    if(slow == fast) break;
  }

  if(slow != fast) return; // No loop exists

  // Step 2: Find start of loop
  slow = head;
  while(slow.next != fast.next) {
    slow = slow.next;
    fast = fast.next;
  }

  // Step 3: Remove loop by setting last node's next to null
  fast.next = null;
}

// 🔧 Test example to check functionality

let loopHead = new ListNode(1);
loopHead.next = new ListNode(2);
loopHead.next.next = new ListNode(3);
loopHead.next.next.next = loopHead.next; // creates a loop

console.log("Loop exists before removal:", hasCycle(loopHead)); // Output: true
removeLoop(loopHead);
console.log("Loop exists after removal:", hasCycle(loopHead)); // Output: false

// 💡 Explanation:
// 1. hasCycle() checks if a loop exists.
// 2. removeLoop() removes the loop by connecting the last node to null.
