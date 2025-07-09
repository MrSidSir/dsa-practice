// ListNode class
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function middleNode(head) {
    let slow = head, fast =head;
    while(fast && fast.next){
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}

// Test
 let head2 = new ListNode(1);
 head2.next = new ListNode(2);
 head2.next.next = new ListNode(3);
 head2.next.next.next = new ListNode(4);
 head2.next.next.next.next = new ListNode(5);

 console.log(middleNode(head2).val); // Output: 3

//   Explanation:
// Slow moves 1 step, fast moves 2 steps. When fast reaches end, slow is at mid.