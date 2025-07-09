//  Key Point: Reverse pointers iteratively.
// ListNode class
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
function reverseList(head) {
  let prev = null, curr = head;
  while(curr){
    let nextTemp = curr.next; // store next node
    curr.next = prev; // reverse pointer
    prev = curr; // move prev forward
    curr = nextTemp; // move curr forward
  }
  return prev;
}

// Test
let head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);

let reversed = reverseList(head);
while(reversed){
  console.log(reversed.val); // Output: 3 2 1
  reversed = reversed.next;
}


// 💡 Explanation:
// We iterate and reverse each node’s next pointer to previous node until list ends.